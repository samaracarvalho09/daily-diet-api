import { it, describe, expect } from "vitest";
import request from "supertest";
import { app } from "../src/app";

describe("User", () => {
  it("should be able to create a new user", async () => {
    await request(app).post("/sessions/register").send({
      name: "Test User",
      email: "test1@email.com",
      password: "123456",
    });

    const loginResponse = await request(app).post("/sessions/login").send({
      email: "test1@email.com",
      password: "123456",
    });

    expect(loginResponse.statusCode).toBe(200);
  });
});
