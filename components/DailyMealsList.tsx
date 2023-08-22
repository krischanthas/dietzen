import React from 'react'
import Meal, { MealProps } from "../components/Meal";

interface DailyMealListProps{
    meals: MealProps[]
}
const DailyMealsList: React.FC<DailyMealListProps> = ({ meals }) => {
    if(meals.length > 0) {
        return (
            <section className="section">
            <div className="section-hdr">
              <h2>My Meals</h2>
            </div>
            {meals.map((meal) => (
              <div key={meal.id} className="meal">
                <Meal meal={meal} />
              </div>
            ))}
          </section>
          )
    } else {
        return (
            <div>You have not logged any meals today.</div>
        )
    }

}

export default DailyMealsList