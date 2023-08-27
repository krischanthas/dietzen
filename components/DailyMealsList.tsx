import React from "react";
import Meal, { MealProps } from "../components/Meal";

interface DailyMealListProps {
  meals: MealProps[];
}
const DailyMealsList: React.FC<DailyMealListProps> = ({ meals }) => {
  if (meals.length > 0) {
    return (
      <section className="m-auto py-4 px-6 rounded-lg bg-cream w-1/2 text-center">
        <div className="text-xl text-center md:text-start">
          <h2>My Meals</h2>
        </div>
        {meals.map((meal) => (
          <div key={meal.id} className="meal">
            <Meal meal={meal} />
          </div>
        ))}
      </section>
    );
  } else {
    return (
      <div className="w-1/2 mx-auto my-6 py-4 px-6 rounded-lg bg-cream text-center">
        You have not logged any meals today.
      </div>
    );
  }
};

export default DailyMealsList;
