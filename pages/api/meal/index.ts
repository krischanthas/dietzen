// pages/api/post/index.ts
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { title, brand, nutrition } = req.body;

  const session = await getServerSession(req, res, authOptions);
  const result = await prisma.meal.create({
    data: {
      title: title,
      brand: brand,
      calories: nutrition.calories,
      serving: nutrition.serving,
      servingSize: nutrition.servingSize,
      fat: nutrition.fat,
      carbohydrates: nutrition.carbohydrates,
      protein: nutrition.protein,
      unit: nutrition.unit,
      author: { connect: { email: session?.user?.email as string } },
    },
  });
  res.json(result);
}
