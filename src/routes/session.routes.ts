import { Router } from "express";
import { register, login } from "../controllers/session.controller";
import { validate } from "../middlewares/validate";
import { registerSchema, loginSchema } from "../schemas/auth.schema";
import { authenticateToken } from "../middlewares/authenticateToken";

export const sessionRoutes = Router();

sessionRoutes.post("/register", validate(registerSchema), register);
sessionRoutes.post("/login", validate(loginSchema), login);
sessionRoutes.get("/profile", authenticateToken, (req, res) => {
  res.json({ user: req.user });
});
