const UploadProblem = () => {
  return (
    <div className="page-center">
      <form className="form">
        <h2>📤 Upload Crop Problem</h2>
        <p className="form-subtitle">
          Describe your crop issue clearly so experts can help you.
        </p>

        <input type="text" placeholder="Problem Title" />
        <textarea placeholder="Describe the crop problem"></textarea>
        <input type="text" placeholder="Image URL (optional)" />

        <button type="submit">Submit Problem</button>
      </form>
    </div>
  )
}

export default UploadProblem