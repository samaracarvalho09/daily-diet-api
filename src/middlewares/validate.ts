import { z } from "zod";
import { Request, Response, NextFunction } from "express";

// Generic middleware for body, params, or query
export const validate =
  (
    schema: z.ZodType,
    type: "body" | "params" | "query" = "body",
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req[type]);
      next();
    } catch (err: any) {
      return res.status(400).json({ error: err.errors ?? err.message });
    }
  };

// Schema for validating meal ID
export const mealIdParamsSchema = z.object({
  id: z.string().uuid({ message: "ID da refeição inválido" }),
});
