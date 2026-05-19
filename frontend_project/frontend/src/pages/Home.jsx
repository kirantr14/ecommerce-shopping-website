import {useEffect, useState} from "react"
import {toast} from "react-toastify"
import axios from "axios"

import laptop from "../assets/products/laptop.png"
import phone from "../assets/products/phone.png"
import headphones from "../assets/products/headphone.png"
import book from "../assets/products/book.png"
import shirt from "../assets/products/shirt.png"
import cereal from "../assets/products/cereal.png"
import perfume from "../assets/products/perfume.png"
import chocolate from "../assets/products/chocolate.png"
import smartwatch from "../assets/products/smartwatch.png"
import backpack from "../assets/products/backpack.png"
import sneakers from "../assets/products/sneakers.png"
import mug from "../assets/products/mug.png"

import "./Home.css"

function Home() {

  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {

    axios.get("http://localhost:5000/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err))

  }, [])

  const addToCart = (id) => {

    axios.post(
      "http://localhost:5000/cart/add",
      {product_id: id},
      {withCredentials: true}
    )
    .then(() => toast.success("Added to cart"))
    .catch(() => toast.error("Login first"))
  }

  const productImages = {
    Laptop: laptop,
    Phone: phone,
    Headphones: headphones,
    Book: book,
    Shirt: shirt,
    Cereal: cereal,
    Perfume: perfume,
    Chocolate: chocolate,
    "Smart Watch": smartwatch,
    Backpack: backpack,
    Sneakers: sneakers,
    "Coffee Mug": mug
  }

  const filteredProducts = products.filter(product => {

    const matchesSearch =
      product.name.toLowerCase().includes(
        search.toLowerCase()
      )

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (

    <div className="home-container">

      <h1 className="home-title">
        Products
      </h1>

      <input
        type="text"
        placeholder="Search products..."
        className="search-input"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <select
        className="category-select"
        value={selectedCategory}
        onChange={e => setSelectedCategory(e.target.value)}
      >

        <option value="All">
          All Categories
        </option>

        <option value="Electronics">
          Electronics
        </option>

        <option value="Fashion">
          Fashion
        </option>

        <option value="Food">
          Food
        </option>

        <option value="Books">
          Books
        </option>

        <option value="Beauty">
          Beauty
        </option>

        <option value="Home">
          Home
        </option>

      </select>

      <div className="products-grid">

        {filteredProducts.length === 0 ? (

          <h2 className="no-products">
            No products found
          </h2>

        ) : (

          filteredProducts.map(p => (

            <div
              key={p.id}
              className="product-card"
              onClick={() => setSelectedProduct(p)}
            >

              <img
                src={
                  p.image && p.image.startsWith("/uploads/")
                    ? p.image
                    : productImages[p.name]
                }
                alt={p.name}
                className="product-image"
              />

              <h3>{p.name}</h3>

              <p>{p.description}</p>

              <p className="price">
                ₹{p.price}
              </p>

              <button onClick={() => addToCart(p.id)}>
                Add to Cart
              </button>

            </div>

          ))

        )}

      </div>

      {selectedProduct && (

        <div
          className="modal-overlay"
          onClick={() => setSelectedProduct(null)}
        >

          <div
            className="product-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <img
              src={
                selectedProduct.image &&
                selectedProduct.image.startsWith("/uploads/")
                  ? selectedProduct.image
                  : productImages[selectedProduct.name]
              }
              alt={selectedProduct.name}
              className="modal-image"
            />

            <h2>{selectedProduct.name}</h2>

            <p className="modal-description">
              {selectedProduct.description}
            </p>

            <p className="modal-extra">
              High quality product with modern design and
              excellent customer satisfaction.
            </p>

            <p className="modal-extra">
              Perfect for everyday use and one of the most
              popular items in our store.
            </p>

          </div>

        </div>

      )}

    </div>

  )
}

export default Home