// pages/create.tsx

import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";

const MealDraft: React.FC = () => {
  const [brand, setBrand] = useState("");
  const [title, setTitle] = useState("");
  const [nutrition, setNutrition] = useState({
    calories: null,
    serving: null,
    servingSize: null,
    fat: null,
    carbohydrates: null,
    protein: null,
    unit: "grams",
  });

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, brand, nutrition };
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
    <Layout>
      <div>
        <h1>Create Meal</h1>

        <form onSubmit={submitData}>
          <input
            autoFocus
            autoComplete="off"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <input
            autoFocus
            autoComplete="off"
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Brand"
            type="text"
            value={brand}
          />
          <input
            autoFocus
            autoComplete="off"
            onChange={(e) =>
              setNutrition({ ...nutrition, [e.target.name]: e.target.value })
            }
            placeholder="Calories"
            type="text"
            value={nutrition.calories}
            name="calories"
          />
          <input
            autoFocus
            autoComplete="off"
            onChange={(e) =>
              setNutrition({ ...nutrition, [e.target.name]: e.target.value })
            }
            placeholder="Serving"
            type="text"
            value={nutrition.serving}
            name="serving"
          />
          <input
            autoFocus
            autoComplete="off"
            onChange={(e) =>
              setNutrition({ ...nutrition, [e.target.name]: e.target.value })
            }
            placeholder="Serving size"
            type="text"
            value={nutrition.servingSize}
            name="servingSize"
          />
          <input
            autoFocus
            autoComplete="off"
            onChange={(e) =>
              setNutrition({ ...nutrition, [e.target.name]: e.target.value })
            }
            placeholder="Fat"
            type="text"
            value={nutrition.fat}
            name="fat"
          />
          <input
            autoFocus
            autoComplete="off"
            onChange={(e) =>
              setNutrition({ ...nutrition, [e.target.name]: e.target.value })
            }
            placeholder="Carbohydrates"
            type="text"
            value={nutrition.carbohydrates}
            name="carbohydrates"
          />
          <input
            autoFocus
            autoComplete="off"
            onChange={(e) =>
              setNutrition({ ...nutrition, [e.target.name]: e.target.value })
            }
            placeholder="Protein"
            type="text"
            value={nutrition.protein}
            name="protein"
          />
          <input
            autoFocus
            autoComplete="off"
            onChange={(e) =>
              setNutrition({ ...nutrition, [e.target.name]: e.target.value })
            }
            placeholder="Unit"
            type="text"
            value={nutrition.unit}
            name="unit"
          />
          <div>
            <button disabled={!title} type="submit" value="Create">
              Create
            </button>
            <button className="back" onClick={() => Router.push("/")}>
              Cancel
            </button>
          </div>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        form {
          display: flex;
          flex-direction: column;
        }
        form > div {
          margin: 10px auto;
        }
        input[type="text"] {
          width: 80%;
          padding: 0.5rem;
          margin: 5px auto;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default MealDraft;
