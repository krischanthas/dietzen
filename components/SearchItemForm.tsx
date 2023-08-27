import React, { useState } from "react";
import Router from "next/router";

const SearchItemForm = ({ submitData }) => {
  const [userInput, setUserInput] = useState<string>("");

  return (
    <div className="bg-cyan w-1/2 mx-auto px-6 py-4 rounded-lg">
      <form
        className="my-6 space-y-6"
        onSubmit={(e) => submitData(e, userInput)}
      >
        <div className="my-6 flex flex-col items-center">
          <input
            autoFocus
            type="text"
            className="my-2 px-4 py-2 w-1/2 text-center focus:outline-softred rounded-md"
            placeholder="Enter food name, brand, restaurant etc.."
            onChange={(e) => setUserInput(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <button
            className="mx-2 bg-softred text-white px-6 py-4 rounded-md hover:bg-cream hover:text-black focus:outline-none focus:ring-2 "
            disabled={!userInput}
            type="submit"
          >
            Search
          </button>
          <button
            className="mx-2 bg-softred text-white px-6 py-4 rounded-md hover:bg-cream hover:text-black focus:outline-none focus:ring-2 focus:ring-red-400"
            onClick={() => Router.push("/")}
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchItemForm;
