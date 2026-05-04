import { useState } from "react"
import { Link } from "react-router-dom"
import { sendResetOtp, resetPassword } from "../services/api"

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    role: "farmer",
    otp: "",
    new_password: "",
  })

  const [otpSent, setOtpSent] = useState(false)
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSendOtp = async (e) => {
    e.preventDefault()
    setMessage("")

    try {
      setLoading(true)

      const data = await sendResetOtp({
        email: formData.email,
        role: formData.role,
      })

      setOtpSent(true)
      setMessage(data.message || "OTP sent successfully.")
    } catch (error) {
      setMessage(error.message || "Failed to send OTP.")
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setMessage("")

    try {
      setLoading(true)

      const data = await resetPassword(formData)

      setMessage(data.message || "Password reset successfully.")

      setFormData({
        email: "",
        role: "farmer",
        otp: "",
        new_password: "",
      })

      setOtpSent(false)
    } catch (error) {
      setMessage(error.message || "Failed to reset password.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-center">
      <form
        className="form"
        onSubmit={otpSent ? handleResetPassword : handleSendOtp}
      >
        <h2>Reset Password</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          disabled={otpSent}
          required
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          disabled={otpSent}
        >
          <option value="farmer">Farmer</option>
          <option value="expert">Expert</option>
          <option value="admin">Admin</option>
        </select>

        {otpSent && (
          <>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="new_password"
              placeholder="New Password"
              value={formData.new_password}
              onChange={handleChange}
              required
            />
          </>
        )}

        <button type="submit" disabled={loading}>
          {loading
            ? "Please wait..."
            : otpSent
            ? "Reset Password"
            : "Send OTP"}
        </button>

        {message && <p className="form-subtitle">{message}</p>}

        <p className="link-text">
          Back to <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  )
}

export default ForgotPassword