import sqlite3

DB_NAME = "database.db"

def connect():
    return sqlite3.connect(DB_NAME)

def create_tables():
    conn = connect()
    cur = conn.cursor()

    cur.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        password TEXT
    )
    """)

    cur.execute("""
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        price INTEGER,
        description TEXT,
        category TEXT,
        image TEXT
    )
    """)

    conn.commit()
    conn.close()

def seed_products():
    conn = connect()
    cur = conn.cursor()

    cur.execute("SELECT COUNT(*) FROM products")
    count = cur.fetchone()[0]

    if count == 0:
        products = [
            ("Laptop", 50000, "Gaming Laptop", "Electronics", "laptop.png"),
            ("Phone", 20000, "Smartphone", "Electronics", "phone.png"),
            ("Headphones", 2000, "Wireless Headphones", "Electronics", "headphone.png"),
            ("Book", 500, "Motivational Book", "Books", "book.png"),
            ("Shirt", 1200, "Cotton Casual Shirt", "Fashion", "shirt.png"),
            ("Cereal", 350, "Healthy Breakfast Cereal", "Food", "cereal.png"),
            ("Perfume", 2500, "Long Lasting Perfume", "Beauty", "perfume.png"),
            ("Chocolate", 150, "Dark Chocolate Box", "Food", "chocolate.png"),
            ("Smart Watch", 4500, "Fitness Smart Watch", "Electronics", "smartwatch.png"),
            ("Backpack", 1800, "Travel Backpack", "Fashion", "backpack.png"),
            ("Sneakers", 3200, "Running Sneakers", "Fashion", "sneakers.png"),
            ("Coffee Mug", 400, "Ceramic Coffee Mug", "Home", "mug.png")
        ]
        cur.executemany(
            "INSERT INTO products (name, price, description, category, image) VALUES (?, ?, ?, ?, ?)",
            products
        )

    conn.commit()
    conn.close()
