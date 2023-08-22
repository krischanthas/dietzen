import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type SearchProps = {
  food_name: string;
  brand_name: string;
  serving_qty: number;
  serving_unit: string;
  nf_calories: number;
  nf_total_fat: number;
  nf_total_carbohydrate: number;
  nf_protein: number;
  nf_metric_uom: string;
  foods: [];
};
const SearchItem: React.FC<{ item: SearchProps }> = ({ item }) => {
  const markdown = `${item.nf_calories} calories, ${item.serving_unit} serving(s), Serving Size: ${item.serving_qty}, Fat: ${item.nf_total_fat}, Carbohydrates: ${item.nf_total_carbohydrate}, Protein: ${item.nf_protein}`;

  const submitData = async (item: SearchProps) => {
    try {
      const body = {
        title: item.food_name,
        brand: item.brand_name ?? "",
        nutrition: {
          calories: String(item.nf_calories),
          serving: String(item.serving_unit),
          servingSize: String(item.serving_qty),
          fat: String(item.nf_total_fat),
          carbohydrates: String(item.nf_total_carbohydrate),
          protein: String(item.nf_protein),
          unit: String(item.nf_metric_uom),
        },
      };
      await fetch("/api/meal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>{item.food_name}</h2>
      <small>By {item.brand_name}</small>
      <ReactMarkdown children={markdown} />
      <button onClick={() => submitData(item)}>Add Meal</button>
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
        button {
          padding: 10px 10px;
        }
      `}</style>
    </div>
  );
};

export default SearchItem;
