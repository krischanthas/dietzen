import React, { useState } from "react";
import Router from "next/router";
import Layout from "../components/Layout";
import { useSession, getSession } from "next-auth/react";

const Search: React.FC = () => {
  const { data: session } = useSession();
  const [results, setResults] = useState([]);
  const [userInput, setUserInput] = useState<string>(null);

  const submitData = async (e: React.SyntheticEvent) => {
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
        <h1>
          {results.length}{" "}
          {results.length > 1 || results.length === 0 ? "Results" : "Result"}...
        </h1>

        <div className="container">
          <div className="results">
            <ul>
              {results.map((food) => {
                return (
                  <li
                    onClick={() =>
                      Router.push("/s/[id]", `/s/${food.nix_item_id}`)
                    }
                    key={food.nix_item_id}
                  >
                    {food.brand_name_item_name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <style jsx>{`
          .container {
            height: 80vh;
            padding: 0 10px;
            margin: 0 auto;
            overflow-y:scroll;

          }
          .results {
            display: flex;
            justify-content: center;
          }
          .results > ul {
            list-style-type: none;
            padding: 0;
            scr
          }
          .results > ul > li {
            padding: 15px 10px;
            margin: 5px 0;
            border: 1px solid #aaa;
            border-radius: 10px;
            cursor: pointer;
          }
          .results > ul > li:hover {
            background-color: #aaa;
            color: #fff;
          }
        `}</style>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <div>
          <h1>Search Food</h1>
          <main>
            <form onSubmit={submitData}>
              <input
                autoFocus
                type="text"
                placeholder="Enter food name, brand, restaurant etc.."
                onChange={(e) => setUserInput(e.target.value)}
              />
              <div>
                <button disabled={!userInput} type="submit">
                  Search
                </button>
                <button className="back" onClick={() => Router.push("/")}>
                  Cancel
                </button>
              </div>
            </form>
          </main>
        </div>
        <style jsx>{`
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
            margin: 0 auto;
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
  }
};

export default Search;
