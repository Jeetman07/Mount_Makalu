import { useState } from "react";
import { addProblem } from "../services/api";

const UploadProblem = () => {
  const user = JSON.parse(localStorage.getItem("user"))

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  })

  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, files } = e.target

    if (name === "image") {
      setFormData((prev) => ({
        ...prev,
        image: files && files[0] ? files[0] : "",
      }))
      return
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      await addProblem({
        ...formData,
        farmer_id: user?.id  
      })

      setMessage("Problem submitted successfully.")

      setFormData({
        title: "",
        description: "",
        image: "",
      })

    } catch (error) {
      setMessage("Failed to submit problem.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-center">
      <form className="form" onSubmit={handleSubmit}>
        <h2>📤 Upload Crop Problem</h2>

        <input
          type="text"
          name="title"
          placeholder="Problem Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Describe the crop problem"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Problem"}
        </button>

        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  )
}

export default UploadProblem