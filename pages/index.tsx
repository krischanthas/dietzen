// pages/drafts.tsx

import React from "react";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import Layout from "../components/Layout";
import { MealProps } from "../components/Meal";
import prisma from "../lib/prisma";
import DailySummary from "../components/DailySummary";
import DailyMealsList from "../components/DailyMealsList";
import DateForm from "../components/DateForm";
import Login from "../components/Login";

const startOfDay: Date = new Date();
startOfDay.setHours(-7);
startOfDay.setMinutes(0);
startOfDay.setSeconds(0);
const endOfDay: Date = new Date();
endOfDay.setHours(23);
endOfDay.setMinutes(59);
endOfDay.setSeconds(59);

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { meals: [] } };
  }

  const meals = await prisma.meal.findMany({
    where: {
      createdAt: {
        gte: startOfDay,
        // lte: endOfDay,
      },
      author: { email: session.user?.email },
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  const totals = {
    calories: 0,
    fat: 0,
    carbohydrates: 0,
    protein: 0,
  };
  meals.map((meal) => {
    totals.calories += parseInt(meal.calories);
    totals.fat += parseInt(meal.fat);
    totals.carbohydrates += parseInt(meal.carbohydrates);
    totals.protein += parseInt(meal.protein);
  });
  return {
    props: {
      meals: JSON.parse(JSON.stringify(meals)),
      totals: JSON.parse(JSON.stringify(totals)),
    },
  };
};

type HomeProps = {
  meals: MealProps[];
  totals: {
    calories: number;
    fat: number;
    carbohydrates: number;
    protein: number;
  };
  uom: string;
};

const Home: React.FC<HomeProps> = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <Login />
      </Layout>
    );
  }

  return (
    <Layout>
      <DateForm />
      <DailySummary totals={props.totals} />
      <DailyMealsList meals={props.meals} />
    </Layout>
  );
};

export default Home;
