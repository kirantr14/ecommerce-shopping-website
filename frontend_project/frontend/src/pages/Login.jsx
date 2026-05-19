import {useState} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"
import "./Login.css"

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleLogin = () => {
    axios.post(
      "http://localhost:5000/login",
      {
        username,
        password
      },
      {withCredentials: true}
    )
    .then(res => {

      toast.success("Login successful")

      localStorage.setItem("isLoggedIn", "true")

      setTimeout(() => {
        window.location.href = "/home"
      }, 1500)

    })
    .catch(() => toast.error("Invalid credentials"))
  }

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h2>Login</h2>

        <input
          type="text"
          placeholder="Username"
          onChange={e => setUsername(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              handleLogin()
            }
          }}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              handleLogin()
            }
          }}
        />

        <button onClick={handleLogin}>
          Login
        </button>

      </div>

    </div>
  )
}

export default Login