import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import useSwr from "swr";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

const fetchMealHistory = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("failed to fetch meal history");
  return response.json();
};

const mealHistory = () => {
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;
  const encodedSearchQuery = encodeURI(searchQuery || "");
  const { data, isLoading } = useSwr(
    `/api/meal/history?q=${encodedSearchQuery}`,
    fetchMealHistory
  );
  const Router = useRouter();
  const [searchDate, setSearchDate] = useState(encodedSearchQuery);

  const onSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();
    Router.push(`/mealHistory?q=${searchDate}`);
  };
  if (data !== undefined) {
    return (
      <Layout>
        <div>
          <form onSubmit={onSearch}>
            <input
              type="date"
              name="date"
              value={new Date(encodedSearchQuery)
                .toISOString()
                .substring(0, 10)}
              onChange={(event) => setSearchDate(event.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
        <section>
          <div className="daily-totals">
            <div>
              <h3>{data.totals.calories}</h3>
              <p>Calories</p>
            </div>
            <div>
              <h3>{data.totals.fat}</h3>
              <p>Fat</p>
            </div>
            <div>
              <h3>{data.totals.carbohydrates}</h3>
              <p>Carbohydrates</p>
            </div>
            <div>
              <h3>{data.totals.protein}</h3>
              <p>Protein</p>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
};

export default mealHistory;
