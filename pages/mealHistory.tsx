import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import useSwr from "swr";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  dateForm: {
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
  },
}));
const fetchMealHistory = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("failed to fetch meal history");
  return response.json();
};

const mealHistory = () => {
  const { classes } = useStyles();

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
    // const encodedSearchDate = encodeURI(searchDate);
    Router.push(`/mealHistory?q=${searchDate}`);
  };
  if (data !== undefined) {
    return (
      <Layout>
        <div className={classes.dateForm}>
          <form onSubmit={onSearch}>
            <input
              type="date"
              name="date"
              value={new Date(searchDate).toISOString().substring(0, 10)}
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
