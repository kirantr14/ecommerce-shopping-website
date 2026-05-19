import {useState} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"
import "./Login.css"

function Register() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const handleRegister = () => {
    axios.post("http://localhost:5000/register", {
      username,
      password
    })
    .then(() => {

      toast.success("Registered successfully")

      setTimeout(() => {
        navigate("/login")
      }, 1500)

    })
    .catch(() => alert("Error"))
  }

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h2>Register</h2>

        <input
          type="text"
          placeholder="Username"
          onChange={e => setUsername(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              handleRegister()
            }
          }}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              handleRegister()
            }
          }}
        />

        <button onClick={handleRegister}>
          Register
        </button>

      </div>

    </div>
  )
}

export default Register