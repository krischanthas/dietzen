import { useState } from "react";
import Router from "next/router";

const CustomMealForm = ({}) => {
  const [brand, setBrand] = useState("");
  const [title, setTitle] = useState("");
  const [nutrition, setNutrition] = useState({
    calories: "",
    serving: "",
    servingSize: "",
    fat: "",
    carbohydrates: "",
    protein: "",
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
    <form
      onSubmit={submitData}
      className="w-1/2 mx-auto py-6 flex flex-col items-center bg-cyan rounded-lg"
    >
      <input
        autoFocus
        autoComplete="off"
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        type="text"
        value={title}
        className="w-1/2 my-2 px-4 py-2  focus:outline-softred rounded-md"
      />
      <input
        autoFocus
        autoComplete="off"
        onChange={(e) => setBrand(e.target.value)}
        placeholder="Brand"
        type="text"
        value={brand}
        className="w-1/2 my-2 px-4 py-2  focus:outline-softred rounded-md"
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
        className="w-1/2 my-2 px-4 py-2  focus:outline-softred rounded-md"
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
        className="w-1/2 my-2 px-4 py-2  focus:outline-softred rounded-md"
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
        className="w-1/2 my-2 px-4 py-2  focus:outline-softred rounded-md"
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
        className="w-1/2 my-2 px-4 py-2  focus:outline-softred rounded-md"
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
        className="w-1/2 my-2 px-4 py-2  focus:outline-softred rounded-md"
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
        className="w-1/2 my-2 px-4 py-2  focus:outline-softred rounded-md"
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
        className="w-1/2 my-2 px-4 py-2  focus:outline-softred rounded-md"
      />
      <div>
        <button
          disabled={!title}
          className="mx-2 bg-softred text-white px-6 py-4 rounded-md hover:bg-cream hover:text-black focus:outline-none focus:ring-2 "
          type="submit"
          value="Create"
        >
          Create
        </button>
        <button
          className="mx-2 bg-softred text-white px-6 py-4 rounded-md hover:bg-cream hover:text-black focus:outline-none focus:ring-2 "
          onClick={() => Router.push("/")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CustomMealForm;
