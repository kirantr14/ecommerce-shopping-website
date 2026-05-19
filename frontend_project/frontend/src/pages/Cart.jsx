import {useEffect, useState} from "react"
import axios from "axios"
import {toast} from "react-toastify"
import "./Cart.css"

function Cart() {

  const [cartItems, setCartItems] = useState([])

  useEffect(() => {

    axios.get(
      "http://localhost:5000/cart",
      {withCredentials: true}
    )
    .then(res => {
      setCartItems(res.data)
    })
    .catch(err => console.log(err))

  }, [])

  const removeFromCart = (id) => {

    axios.post(
      "http://localhost:5000/cart/remove",
      {product_id: id},
      {withCredentials: true}
    )
    .then(() => {

      const updatedCart = [...cartItems]

      const index = updatedCart.findIndex(
        item => item.id === id
      )

      if (index !== -1) {
        updatedCart.splice(index, 1)
      }

      setCartItems(updatedCart)

    })
    .catch(err => console.log(err))
  }

  const groupedCart = []

    cartItems.forEach(item => {

      const existingItem = groupedCart.find(
        p => p.id === item.id
      )

      if (existingItem) {

        existingItem.quantity += 1

      } else {

        groupedCart.push({
          ...item,
          quantity: 1
        })

      }

    })

  const total = cartItems.reduce(
    (sum, item) => sum + item.price,
    0
  )

  const handleCheckout = () => {

    axios.post(
      "http://localhost:5000/cart/clear",
      {},
      {withCredentials: true}
    )
    .then(() => {

      window.location.href = "/payment"

      setCartItems([])

    })
    .catch(err => console.log(err))
  }

  const increaseQuantity = (product) => {

    setCartItems([
      ...cartItems,
      {
        id: product.id,
        name: product.name,
        price: product.price
      }
    ])

  }

  const decreaseQuantity = (id) => {

    const updatedCart = [...cartItems]

    const index = updatedCart.findIndex(
      item => item.id === id
    )

    if (index !== -1) {
      updatedCart.splice(index, 1)
    }

    setCartItems(updatedCart)
  }

  return (

    <div className="cart-container">

      <h1 className="cart-title">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (

        <p className="empty-cart">
          Cart is empty
        </p>

      ) : (

        <>
          <div className="cart-grid">

            {groupedCart.map(item => (

              <div
                key={Math.random()}
                className="cart-card"
              >

                <h3>{item.name}</h3>

                <p className="cart-price">
                  ₹{item.price}
                </p>

                <div className="quantity-controls">

                  <button
                    className="qty-btn"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    -
                  </button>

                  <p className="quantity-text">
                    Quantity: {item.quantity}
                  </p>

                  <button
                    className="qty-btn"
                    onClick={() => increaseQuantity(item)}
                  >
                    +
                  </button>

                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>

              </div>

            ))}

          </div>

          <h2 className="cart-total">
            Total: ₹{total}
          </h2>

          <button 
          className="checkout-btn" 
          onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>

        </>

      )}

    </div>

  )
}

export default Cart