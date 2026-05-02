import { useState } from "react"
import { Link } from "react-router-dom"
import { loginUser } from "../services/api"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "farmer",
  })

  const [message, setMessage] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")

    try {
      const data = await loginUser(formData)

      localStorage.setItem("user", JSON.stringify(data.user))

      if (data.user.role === "farmer") {
        window.location.href = "/farmer"
      } else if (data.user.role === "expert") {
        window.location.href = "/expert"
      } else if (data.user.role === "admin") {
        window.location.href = "/admin"
      }
    } catch (error) {
      setMessage("Invalid email, password, or role")
    }
  }

  return (
    <div className="page-center">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="farmer">Farmer</option>
          <option value="expert">Expert</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Login</button>

        {message && <p className="form-subtitle">{message}</p>}

        <p className="link-text">
          <Link to="/forgot-password">Forgot password?</Link>
        </p>

        <p className="link-text">
          Do not have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  )
}

export default Login