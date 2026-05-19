import {useState} from "react"
import {toast} from "react-toastify"
import "./Payment.css"

function Payment() {

  const [cardNumber, setCardNumber] = useState("")
  const [name, setName] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvv, setCvv] = useState("")

  const handlePayment = () => {

    if (
      !cardNumber ||
      !name ||
      !expiry ||
      !cvv
    ) {
      toast.error("Fill all fields")
      return
    }

    toast.success("Payment Successful")

    setTimeout(() => {
      window.location.href = "/home"
    }, 2000)
  }

  return (

    <div className="payment-container">

      <div className="payment-card">

        <h2>Payment</h2>

        <input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={e => setCardNumber(e.target.value)}
        />

        <input
          type="text"
          placeholder="Card Holder Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Expiry Date"
          value={expiry}
          onChange={e => setExpiry(e.target.value)}
        />

        <input
          type="password"
          placeholder="CVV"
          value={cvv}
          onChange={e => setCvv(e.target.value)}
        />

        <button onClick={handlePayment}>
          Pay Now
        </button>

      </div>

    </div>

  )
}

export default Payment