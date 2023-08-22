import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const mealId = req.query.id;
  if (req.method === "DELETE") {
    const meal = await prisma.meal.delete({
      where: { id: mealId },
    });
    res.json(meal);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
