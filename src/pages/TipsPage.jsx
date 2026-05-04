import { useEffect, useState } from "react"
import { fetchTips } from "../services/api"
import TipCard from "../components/TipCard"

const TipsPage = () => {
  const [tips, setTips] = useState([])

  useEffect(() => {
    fetchTips()
      .then((data) => setTips(Array.isArray(data) ? data : []))
      .catch(console.log)
  }, [])

  return (
    <div className="dashboard-container">
      <h1>💡 Crop Tips</h1>

      <div className="card-grid">
        {tips.length === 0 ? (
          <p>No tips available</p>
        ) : (
          tips.map((tip, index) => (
            <TipCard key={tip.id || index} tip={tip} />
          ))
        )}
      </div>
    </div>
  )
}

export default TipsPage