import React, { useState } from "react";
import Layout from "../components/Layout";
import { useSession, getSession } from "next-auth/react";
import SearchItemForm from "../components/SearchItemForm";
import SearchItemList from "../components/SearchItemList";

const Search: React.FC = () => {
  const { data: session } = useSession();
  const [results, setResults] = useState<[]>([]);

  const submitData = async (e: React.SyntheticEvent, userInput: string) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://trackapi.nutritionix.com/v2/search/instant?query=${userInput}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-app-id": "f83dfeb3",
            "x-app-key": "ad89a164ba01f8a6d8a2d55c852f8fce",
          },
        }
      );
      const data = await res.json();
      setResults(data.branded);
      //   await Router.push("/meals");
      console.log(data.branded);
    } catch (error) {
      console.error(error);
    }
  };

  if (!session) {
    return (
      <Layout>
        <h1>Oops, you are not logged in.</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  if (results.length > 0) {
    return (
      <Layout>
        <SearchItemList results={results} />
      </Layout>
    );
  } else {
    return (
      <Layout>
        <SearchItemForm submitData={submitData} />
      </Layout>
    );
  }
};

export default Search;
