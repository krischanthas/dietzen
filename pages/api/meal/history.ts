import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { q: query } = req.query;

  const startOfDay: Date = new Date(String(query));
  startOfDay.setHours(17);
  startOfDay.setMinutes(0);
  startOfDay.setSeconds(0);
  startOfDay.setMilliseconds(0);

  const endOfDay: Date = new Date(String(query));
  endOfDay.setHours(40);
  endOfDay.setMinutes(59);
  endOfDay.setSeconds(59);
  endOfDay.setMilliseconds(59);

  const session = await getServerSession(req, res, authOptions);
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

  res.status(200).json({
    meals: JSON.parse(JSON.stringify(meals)),
    totals: JSON.parse(JSON.stringify(totals)),
  });
}
