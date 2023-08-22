import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type MealProps = {
  id: string;
  title: string;
  brand: string;
  author: {
    name: string;
    email: string;
  } | null;
  calories: string;
  serving: string;
  servingSize: string;
  fat: string;
  carbohydrates: string;
  protein: string;
  unit: string;
  createdAt: string;
  updatedAt: string;
};

const Meal: React.FC<{ meal: MealProps }> = ({ meal }) => {
  const markdown = `${meal.calories} calories, ${meal.serving} serving(s), Serving Size: ${meal.servingSize}, Fat: ${meal.fat}, Carbohydrates: ${meal.carbohydrates}, Protein: ${meal.protein}`;
  return (
    <div onClick={() => Router.push("/m/[id]", `/m/${meal.id}`)}>
      <h2>{meal.title}</h2>
      <p>{meal.brand}</p>
      <ReactMarkdown children={markdown} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 10px;
        }
      `}</style>
    </div>
  );
};

export default Meal;
