from flask import Flask, request, jsonify, session
from models import create_tables, seed_products, connect
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)

UPLOAD_FOLDER = r"../frontend_project/frontend/public/uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
app.config["SESSION_COOKIE_SECURE"] = False

app.secret_key = "secret123"

CORS(
    app,
    supports_credentials=True,
    origins=["http://localhost:5173"]
)

create_tables()
seed_products()

@app.route("/register", methods=["POST"])
def register():

    data = request.json

    conn = connect()
    cur = conn.cursor()

    cur.execute(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        (data["username"], data["password"])
    )

    conn.commit()
    conn.close()

    return jsonify({"message": "User registered"})

@app.route("/login", methods=["POST"])
def login():

    data = request.json

    conn = connect()
    cur = conn.cursor()

    cur.execute(
        "SELECT * FROM users WHERE username=? AND password=?",
        (data["username"], data["password"])
    )

    user = cur.fetchone()

    conn.close()

    if user:

        session["user"] = user[1]

        if "cart" not in session:
            session["cart"] = []

        session.modified = True

        return jsonify({"message": "Login successful"})

    return jsonify({"error": "Invalid credentials"}), 401

@app.route("/logout")
def logout():

    session.clear()

    return jsonify({"message": "Logged out"})

@app.route("/products")
def get_products():

    conn = connect()
    cur = conn.cursor()

    cur.execute("SELECT * FROM products")

    products = cur.fetchall()

    conn.close()

    result = []

    for p in products:

        result.append({
            "id": p[0],
            "name": p[1],
            "price": p[2],
            "description": p[3],
            "category": p[4],
            "image": p[5]
        })

    return jsonify(result)

@app.route("/cart/add", methods=["POST"])
def add_to_cart():

    if "user" not in session:
        return jsonify({"error": "Not logged in"}), 401

    data = request.json

    product_id = data["product_id"]

    cart = session.get("cart", [])

    cart.append(product_id)

    session["cart"] = cart

    session.modified = True

    return jsonify({
        "message": "Added to cart",
        "cart": session["cart"]
    })

@app.route("/cart/remove", methods=["POST"])
def remove_from_cart():

    data = request.json

    product_id = data["product_id"]

    cart = session.get("cart", [])

    if product_id in cart:
        cart.remove(product_id)

    session["cart"] = cart

    session.modified = True

    return jsonify({
        "message": "Removed from cart"
    })

@app.route("/cart")
def get_cart():

    if "user" not in session:
        return jsonify([])

    cart = session.get("cart", [])

    conn = connect()

    cur = conn.cursor()

    items = []

    for pid in cart:

        cur.execute(
            "SELECT * FROM products WHERE id=?",
            (pid,)
        )

        p = cur.fetchone()

        if p:
            items.append({
                "id": p[0],
                "name": p[1],
                "price": p[2]
            })

    conn.close()

    return jsonify(items)

@app.route("/cart/clear", methods=["POST"])
def clear_cart():

    session["cart"] = []

    session.modified = True

    return jsonify({
        "message": "Cart cleared"
    })

@app.route("/add-product", methods=["POST"])
def add_product():

    name = request.form["name"]
    price = request.form["price"]
    description = request.form["description"]
    category = request.form["category"]

    image = request.files["image"]

    filename = secure_filename(image.filename)

    image_path = os.path.join(
        app.config["UPLOAD_FOLDER"],
        filename
    )

    image.save(image_path)

    image_url = f"/uploads/{filename}"

    conn = connect()
    cur = conn.cursor()

    cur.execute(
        """
        INSERT INTO products
        (name, price, description, category, image)
        VALUES (?, ?, ?, ?, ?)
        """,
        (
            name,
            price,
            description,
            category,
            image_url
        )
    )

    conn.commit()
    conn.close()

    return jsonify({
        "message": "Product added"
    })

if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=True)