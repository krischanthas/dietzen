// pages/p/[id].tsx

import React, { useState } from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Router from "next/router";
import Layout from "../../components/Layout";
import { useSession } from "next-auth/react";
import prisma from "../../lib/prisma";
import SearchItem, { SearchProps } from "../../components/SearchItem";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await fetch(
    `https://trackapi.nutritionix.com/v2/search/item?nix_item_id=${params?.id}`,
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

  return {
    props: { foods: data.foods },
  };
};

const FoodItem: React.FC<SearchProps> = (props) => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }
  // const userHasValidSession = Boolean(session);

  return (
    <Layout>
      <div>
        {props.foods.map((food, index) => (
          <div key={index} className="food">
            <SearchItem item={food} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default FoodItem;
