import { it, describe, expect } from "vitest";
import request from "supertest";
import { app } from "../src/app";

describe("Meal flow", () => {
  it("should create a meal after authenticating", async () => {
    // Create user
    await request(app).post("/sessions/register").send({
      name: "Test User",
      email: "test@email.com",
      password: "123456",
    });

    // Login
    const loginResponse = await request(app).post("/sessions/login").send({
      email: "test@email.com",
      password: "123456",
    });

    const token = loginResponse.body.token;

    // Create meal
    const mealResponse = await request(app)
      .post("/meals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Lunch",
        description: "Rice and chicken",
        isOnDiet: true,
        date: new Date().toISOString(),
      });

    expect(mealResponse.statusCode).toBe(201);
  });

  it("should list all meals", async () => {
    // Create user
    await request(app).post("/sessions/register").send({
      name: "Test User",
      email: "test@email.com",
      password: "123456",
    });

    // Login
    const loginResponse = await request(app).post("/sessions/login").send({
      email: "test@email.com",
      password: "123456",
    });

    const token = loginResponse.body.token;

    // Create meal
    await request(app)
      .post("/meals")
      .set("Authorization", `Bearer ${token}`)
      .send([
        {
          name: "Lunch",
          description: "Rice and chicken",
          isOnDiet: true,
          date: new Date().toISOString(),
        },
        {
          name: "Breakfast",
          description: "Bread, coffee and apple",
          isOnDiet: true,
          date: new Date().toISOString(),
        },
      ]);

    // List meals
    const listMeals = await request(app)
      .get("/meals")
      .set("Authorization", `Bearer ${token}`);

    expect(listMeals.statusCode).toBe(200);
  });

  it("should list a specific meal", async () => {
    // Create user
    await request(app).post("/sessions/register").send({
      name: "Test User",
      email: "test@email.com",
      password: "123456",
    });

    // Login
    const loginResponse = await request(app).post("/sessions/login").send({
      email: "test@email.com",
      password: "123456",
    });

    const token = loginResponse.body.token;

    // Create meal
    const createMealResponse = await request(app)
      .post("/meals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Lunch",
        description: "Rice and chicken",
        isOnDiet: true,
        date: new Date().toISOString(),
      });

    const idMeal = createMealResponse.body.id;

    // List a specific meal
    const listMeals = await request(app)
      .get(`/meals/${idMeal}`)
      .set("Authorization", `Bearer ${token}`);
    expect(listMeals.statusCode).toBe(200);
  });

  it("should update a meal", async () => {
    // Create user
    await request(app).post("/sessions/register").send({
      name: "Test User",
      email: "test@email.com",
      password: "123456",
    });

    // Login
    const loginResponse = await request(app).post("/sessions/login").send({
      email: "test@email.com",
      password: "123456",
    });

    const token = loginResponse.body.token;

    // Create meal
    const createMealResponse = await request(app)
      .post("/meals")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Lunch",
        description: "Rice and chicken",
        isOnDiet: true,
        date: new Date().toISOString(),
      });

    const idMeal = createMealResponse.body.id;
  });
});