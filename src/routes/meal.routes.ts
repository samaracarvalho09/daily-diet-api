import { Router } from "express";
import { authenticateToken } from "../middlewares/authenticateToken";
import { validate } from "../middlewares/validate";
import {
  createMealController,
  listMealsController,
  updateMealController,
  deleteMealController,
  getMetricsController,
  getMealController,
} from "../controllers/meal.controller";

import { createMealSchema, updateMealSchema } from "../schemas/meal.schema";
import { mealIdParamsSchema } from "../middlewares/validate"; // seu schema de params

export const mealRoutes = Router();

// Create a new meal
mealRoutes.post(
  "/",
  authenticateToken,
  validate(createMealSchema, "body"),
  createMealController,
);

// List all meals for the authenticated user
mealRoutes.get("/", authenticateToken, listMealsController);

// Retrieve user metrics
mealRoutes.get("/metrics", authenticateToken, getMetricsController);

// Get a specific meal by ID
mealRoutes.get(
  "/:id",
  authenticateToken,
  validate(mealIdParamsSchema, "params"),
  getMealController,
);

// Update a meal
mealRoutes.put(
  "/:id",
  authenticateToken,
  validate(mealIdParamsSchema, "params"),
  validate(updateMealSchema, "body"),
  updateMealController,
);

// Delete a meal
mealRoutes.delete(
  "/:id",
  authenticateToken,
  validate(mealIdParamsSchema, "params"),
  deleteMealController,
);
