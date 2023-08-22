// pages/p/[id].tsx

import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Router from "next/router";
import Layout from "../../components/Layout";
import { MealProps } from "../../components/Meal";
import { useSession } from "next-auth/react";
import prisma from "../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const meal = await prisma.meal.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: JSON.parse(JSON.stringify(meal)),
  };
};

async function deleteMeal(id: string): Promise<void> {
  await fetch(`/api/meal/${id}`, {
    method: "DELETE",
  });
  Router.push("/");
}

const Meal: React.FC<MealProps> = (props) => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const mealBelongsToUser = session?.user?.email === props.author?.email;
  let title = props.title;

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {props?.brand || ""}</p>
        <ReactMarkdown children={props.calories} />

        {userHasValidSession && mealBelongsToUser && (
          <button onClick={() => deleteMeal(props.id)}>Delete</button>
        )}
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Meal;
