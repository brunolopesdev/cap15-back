import { AppDataSource } from "../data-source";
import User from "../entity/User";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const repository = AppDataSource.getRepository(User);

export const getUsers = async (request: Request, response: Response) => {
  const users = await repository.find();
  return response.json(users);
};

export const createUsers = async (request: Request, response: Response) => {
  const { name, email, password } = request.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = repository.create({ name, email, password: hashedPassword });
  
  await repository.save(user);

  return response.status(201).json(user);
};

export const loginUser = async (request: Request, response: Response) => {
  const { email, password } = request.body;

  const user = await repository.findOneBy({ email });
  if (!user) {
    return response.status(400).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return response.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ id: user.id }, "your_secret_key", {
    expiresIn: "1h",
  });

  return response.json({ token });
};
