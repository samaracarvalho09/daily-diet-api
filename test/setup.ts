import { execSync } from "node:child_process";
import { beforeEach, afterAll } from "vitest";
import { prisma } from "../src/lib/prisma";

beforeEach(() => {
  execSync("npx prisma migrate reset --force");
});

afterAll(async () => {
  await prisma.$disconnect();
});