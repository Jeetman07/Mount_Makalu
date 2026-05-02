const TipCard = ({ tip }) => {
  return (
    <div className="card">
      <div className="card-top">
        <h3>{tip.title}</h3>
        <span className="tip-badge">Tip</span>
      </div>
      <p>{tip.description}</p>
    </div>
  )
}

export default TipCard