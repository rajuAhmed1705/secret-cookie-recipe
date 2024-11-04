import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getUser } from "./services/user.service";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "default_secret_key";

export const generateToken = (username: string) => {
  return jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded as string;
  } catch (error) {
    console.error("Token verification failed:", error);
    throw error;
  }
};

export const validateUser = async (
  username: string,
  password: string
): Promise<boolean> => {
  const user = await getUser(username);

  return !!user && (await bcrypt.compare(password, user.password));
};
