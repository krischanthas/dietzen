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
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default DateForm;
