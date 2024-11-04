import { getUser } from "./user.service";

export const userRecipe = async (username: string) => {
  const user = await getUser(username);

  return user?.recipe;
};

export const storeRecipe = async (username: string, recipe: string) => {
  const user = await getUser(username);

  if (!user) {
    throw new Error(`User ${username} not found`);
  }

  user.recipe = recipe;
};
