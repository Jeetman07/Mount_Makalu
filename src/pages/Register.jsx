import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser, sendOtp } from "../services/api"

const Register = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    role: "farmer",
    password: "",
    otp: "",
    specialization: "",
  })

  const [otpStep, setOtpStep] = useState(false)
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSendOtp = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      setMessage("Fill name, email and password first.")
      return
    }

    try {
      setLoading(true)
      const data = await sendOtp(formData.email)
      setOtpStep(true)
      setMessage(data.message || "OTP sent. Check your email.")
    } catch (error) {
      setMessage(error.message || "Failed to send OTP.")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")

    if (!otpStep) {
      await handleSendOtp()
      return
    }

    if (!formData.otp) {
      setMessage("Enter OTP.")
      return
    }

    try {
      setLoading(true)

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        role: formData.role,
        password: formData.password,
        otp: formData.otp,
      }

      if (formData.role === "expert") {
        payload.specialization = formData.specialization
      }

      const data = await registerUser(payload)
      setMessage(data.message || "Registered successfully.")

      setTimeout(() => navigate("/login"), 1500)
    } catch (error) {
      setMessage(error.message || "Registration failed.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-center">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          disabled={otpStep}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          disabled={otpStep}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          disabled={otpStep}
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          disabled={otpStep}
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          disabled={otpStep}
        >
          <option value="farmer">Farmer</option>
          <option value="expert">Expert</option>
          <option value="admin">Admin</option>
        </select>

        {formData.role === "expert" && (
          <input
            type="text"
            name="specialization"
            placeholder="Specialization"
            value={formData.specialization}
            onChange={handleChange}
            disabled={otpStep}
          />
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          disabled={otpStep}
          required
        />

        {otpStep && (
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={formData.otp}
            onChange={handleChange}
            required
          />
        )}

        <button type="submit" disabled={loading}>
          {loading
            ? "Please wait..."
            : otpStep
            ? "Verify & Create Account"
            : "Register"}
        </button>

        {otpStep && (
          <button
            type="button"
            onClick={handleSendOtp}
            disabled={loading}
          >
            Resend OTP
          </button>
        )}

        {message && <p className="form-subtitle">{message}</p>}

        <p className="link-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  )
}

export default Register