import {Link} from "react-router-dom"
import {toast} from "react-toastify"
import axios from "axios"

function Navbar() {

  const isLoggedIn = localStorage.getItem("isLoggedIn")

  const handleLogout = () => {

    axios.get(
      "http://localhost:5000/logout",
      {withCredentials: true}
    )
    .then(() => {

      toast.success("Logged out")

      localStorage.removeItem("isLoggedIn")

      setTimeout(() => {
        window.location.href = "/login"
      }, 1500)

    })
    .catch(err => console.log(err))
  }

  return (

    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 40px",
        backgroundColor: "#111827",
        boxShadow: "0px 2px 10px rgba(0,0,0,0.1)"
      }}
    >

      <h2
        style={{
          color: "white",
          fontSize: "28px"
        }}
      >
        ShopEasy
      </h2>

      <div
        style={{
          display: "flex",
          gap: "25px",
          alignItems: "center"
        }}
      >

        {!isLoggedIn ? (

          <>
            <Link
              to="/login"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "17px"
              }}
            >
              Login
            </Link>

            <Link
              to="/register"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "17px"
              }}
            >
              Register
            </Link>
          </>

        ) : (

          <>
            <Link
              to="/home"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "17px"
              }}
            >
              Home
            </Link>

            <Link
              to="/cart"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "17px"
              }}
            >
              Cart
            </Link>

            <Link
              to="/admin"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "17px"
              }}
            >
              Admin
            </Link>

            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "#dc2626",
                color: "white",
                border: "none",
                padding: "8px 14px",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Logout
            </button>
          </>

        )}

      </div>

    </nav>

  )
}

export default Navbar