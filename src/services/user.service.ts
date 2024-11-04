import bcrypt from "bcryptjs";

interface User {
  username: string;
  password: string;
  recipe?: string;
}

const users: User[] = [];

export const getUser = async (username: string) => {
  const user = users.find((u: { username: string }) => u.username === username);

  return user;
};

export const registerUser = async (
  username: string,
  password: string
): Promise<void> => {
  const userExists = users.find((u) => u.username === username);
  if (userExists) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({ username, password: hashedPassword });
};
