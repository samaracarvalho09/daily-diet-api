import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createMeal = async (data: {
  name: string;
  description?: string;
  date: Date;
  isOnDiet: boolean;
  userId: string;
}) => {
  return prisma.meal.create({ data });
};

export const listMealsByUser = async (userId: string) => {
  return prisma.meal.findMany({
    where: { userId },
    select: {
      id: true,
      name: true,
      description: true,
      isOnDiet: true,
    },
  });
};

export const getMealById = async (id: string, userId: string) => {
  const meal = await prisma.meal.findFirst({
    where: { id, userId },
    select: {
      id: true,
      name: true,
      description: true,
      isOnDiet: true,
    },
  });
  if (!meal)
    throw new Error("Refeição não encontrada ou não pertence ao usuário");
  return meal;
};

export const updateMeal = async (
  id: string,
  userId: string,
  data: Partial<any>,
) => {
  const meal = await prisma.meal.findFirst({ where: { id, userId } });
  if (!meal) throw new Error("Refeição não encontrada");
  return prisma.meal.update({ where: { id }, data });
};

export const deleteMeal = async (id: string, userId: string) => {
  const meal = await prisma.meal.findFirst({ where: { id, userId } });
  if (!meal) throw new Error("Refeição não encontrada");
  return prisma.meal.delete({ where: { id } });
};

export const getUserMetrics = async (userId: string) => {
  const meals = await prisma.meal.findMany({
    where: { userId },
    orderBy: { date: "asc" },
  });

  const totalMeals = meals.length;
  const totalOnDiet = meals.filter((m) => m.isOnDiet).length;
  const totalOffDiet = meals.filter((m) => !m.isOnDiet).length;

  // Calculates the longest consecutive on-diet streak
  let bestOnDietSequence = 0;
  let currentSequence = 0;
  for (const meal of meals) {
    if (meal.isOnDiet) {
      currentSequence += 1;
      if (currentSequence > bestOnDietSequence)
        bestOnDietSequence = currentSequence;
    } else {
      currentSequence = 0;
    }
  }

  return { totalMeals, totalOnDiet, totalOffDiet, bestOnDietSequence };
};
