import React, { useState } from "react";
import { useRouter } from "next/router";

const DateForm = () => {
  const Router = useRouter();
  var localISOTime = new Date(Date.now()).toISOString().slice(0, 10);
  const [searchDate, setSearchDate] = useState(localISOTime);

  const onSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const encodedSearchDate = encodeURI(searchDate);
    Router.push(`/mealHistory?q=${encodedSearchDate}`);
  };
  return (
    <div className="mx-auto w-1/2 px-6 flex justify-center md:justify-end">
      <form onSubmit={onSearch}>
        <input
          type="date"
          name="date"
          value={searchDate}
          onChange={(event) => setSearchDate(event.target.value)}
          className="px-4 py-2 rounded-md"
        />
        <button
          type="submit"
          className="mx-2 bg-cyan text-white px-4 py-2 rounded-md hover:bg-cream hover:text-black focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default DateForm;
