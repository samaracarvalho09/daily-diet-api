import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const registerUser = async (name: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: { name, email, password: hashedPassword }
  });
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Usuário não encontrado");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Senha incorreta");

  const token = jwt.sign({ sub: user.id }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "1h" });

  return { token, user: { name: user.name, email: user.email } };
};
