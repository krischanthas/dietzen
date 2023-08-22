interface DailySummaryProps  {
    totals: {
      calories: number;
      fat: number;
      carbohydrates: number;
      protein: number;
    }
  }
  
const DailySummary: React.FC<DailySummaryProps> = ({ totals: { calories, fat, carbohydrates, protein }}) => {
  return (
    <section className="section">
          <div className="section-hdr">
            <h2>Daily Totals</h2>
          </div>

          <div className="daily-totals">
            <div>
              <h3>{calories}</h3>
              <p>Calories</p>
            </div>
            <div>
              <h3>{fat}</h3>
              <p>Fat</p>
            </div>
            <div>
              <h3>{carbohydrates}</h3>
              <p>Carbohydrates</p>
            </div>
            <div>
              <h3>{protein}</h3>
              <p>Protein</p>
            </div>
          </div>
        </section>
  )
}

export default DailySummary