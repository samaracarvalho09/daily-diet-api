import { Request, Response } from "express";
import * as mealService from "../services/meal.service";

// Create a meal
export const createMealController = async (req: Request, res: Response) => {
  try {
    const meal = await mealService.createMeal({
      ...req.body,
      userId: req.user.sub,
    });
    res.status(201).json(meal);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// List authenticated user's meals
export const listMealsController = async (req: Request, res: Response) => {
  try {
    const meals = await mealService.listMealsByUser(req.user.sub);
    res.json(meals);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Update a meal
export const updateMealController = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id; // garante string
    const meal = await mealService.updateMeal(id, req.user.sub, req.body);
    res.json(meal);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a meal
export const deleteMealController = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    await mealService.deleteMeal(id, req.user.sub);
    res.status(204).send();
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Get meal by ID
export const getMealController = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const meal = await mealService.getMealById(id, req.user.sub);
    res.json(meal);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Get user metrics
export const getMetricsController = async (req: Request, res: Response) => {
  try {
    const metrics = await mealService.getUserMetrics(req.user.sub);
    res.json(metrics);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
