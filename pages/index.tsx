// pages/drafts.tsx

import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import Layout from "../components/Layout";
import Meal, { MealProps } from "../components/Meal";
import prisma from "../lib/prisma";
import { useRouter } from "next/router";


const startOfDay: Date = new Date();
startOfDay.setHours(0);
startOfDay.setMinutes(0);
startOfDay.setSeconds(0);
startOfDay.setMilliseconds(0);

const endOfDay: Date = new Date();
endOfDay.setHours(23);
endOfDay.setMinutes(59);
endOfDay.setSeconds(59);
endOfDay.setMilliseconds(59);

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { meals: [] } };
  }

  const meals = await prisma.meal.findMany({
    where: {
      createdAt: {
        lte: endOfDay,
        gte: startOfDay,
      },
      author: { email: session.user.email },
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

type Props = {
  meals: MealProps[];
  totals: {
    calories: number;
    fat: number;
    carbohydrates: number;
    protein: number;
  };
  uom: string;
};

const Meals: React.FC<Props> = (props) => {

  const { data: session } = useSession();
  // var tzoffset = new Date().getTimezoneOffset() * 60000;
  var localISOTime = new Date(Date.now()).toISOString().slice(0, 10);
  const [searchDate, setSearchDate] = useState(localISOTime);
  const Router = useRouter();

  if (!session) {
    return (
      <Layout>
        <h1>Dietzen</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  const onSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const encodedSearchDate = encodeURI(searchDate);
    Router.push(`/mealHistory?q=${encodedSearchDate}`);
  };

  return (
    <Layout>
      <div className="page">
        <div>
          <form onSubmit={onSearch}>
            <input
              type="date"
              name="date"
              // placeholder={startOfDay.toISOString().substring(0, 10)}
              value={searchDate}
              onChange={(event) => setSearchDate(event.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
        <section className="section">
          <div className="section-hdr">
            <h2>Daily Totals</h2>
          </div>

          <div className="daily-totals">
            <div>
              <h3>{props.totals.calories}</h3>
              <p>Calories</p>
            </div>
            <div>
              <h3>{props.totals.fat}</h3>
              <p>Fat</p>
            </div>
            <div>
              <h3>{props.totals.carbohydrates}</h3>
              <p>Carbohydrates</p>
            </div>
            <div>
              <h3>{props.totals.protein}</h3>
              <p>Protein</p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-hdr">
            <h2>My Meals</h2>
          </div>
          {props.meals.map((meal) => (
            <div key={meal.id} className="meal">
              <Meal meal={meal} />
            </div>
          ))}
        </section>
      </div>
      <style jsx>{`
        form {
          margin: 1rem 0;
        }
        .meal {
          background: var(--geist-background);
          transition: box-shadow 0.1s ease-in;
        }
        .meal:hover {
          box-shadow: 1px 1px 3px #aaa;
        }
        .meal + .meal {
          margin: 25px 0;
        }
        .section {
          padding: 1rem;
          margin: 1rem 0;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
            0 6px 20px 0 rgba(0, 0, 0, 0.19);
        }
        .section-hdr {
          display: flex;
          justify-content: space-between;
          padding: 0 1rem;
        }
        .section-hdr > h2 {
          padding: 5px 0;
          border-bottom: 0.5px solid #000;
        }

        .daily-totals {
          display: flex;
          justify-content: space-around;
          padding: 1rem 0;
        }
        .daily-totals > div > h3 {
          font-size: 50px;
          font-weight: 900;
          text-align: center;
          margin-bottom: 0;
        }
        .daily-totals > div > p {
          text-align: center;
          margin-top: 0;
        }

        @media screen and (max-width: 800px) {
          .daily-totals {
            flex-direction: column;
            align-items: center;
            padding: 20px 10px;
            text-align: center;
          }

          h3 {
            margin-bottom: 0;
            font-size: 120%;
          }
          h4 {
            margin: 0;
          }
          p {
            margin: 5px 0;
          }
          .section-hdr {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </Layout>
  );
};

export default Meals;
