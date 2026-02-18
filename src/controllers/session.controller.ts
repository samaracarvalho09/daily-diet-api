import { Request, Response } from "express";
import { registerSchema, loginSchema } from "../schemas/auth.schema";
import { registerUser, loginUser } from "../services/session.service";

export async function register(req: Request, res: Response) {
  try {
    const data = registerSchema.parse(req.body);
    const user = await registerUser(data.name, data.email, data.password);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.errors ?? err.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const data = loginSchema.parse(req.body);
    const result = await loginUser(data.email, data.password);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.errors ?? err.message });
  }
}