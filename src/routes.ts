import express, { Request, Response } from "express";
import { generateToken, validateUser } from "./auth";
import { authenticateToken } from "./middleware";
import { storeRecipe, userRecipe } from "./services/cookie.service";
import { registerUser } from "./services/user.service";

const router = express.Router();

// Register route
router.post("/register", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    await registerUser(username, password);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
});

// Login route
router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (await validateUser(username, password)) {
    const token = generateToken(username);
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// Get Cookie recipe
router.get(
  "/secret",
  authenticateToken,
  async (req: Request, res: Response) => {
    const recipe = await userRecipe((req as any).user.username);
    res.json({
      recipe,
    });
  }
);

// Store recipe
router.post(
  "/secret",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { recipe } = req.body;
    if (!recipe) {
      res.status(401).json({
        error: "Please include your secret recipe",
      });
    }

    const username = (req as any).user.username;
    await storeRecipe(username, recipe);

    res.json({
      recipe,
    });
  }
);

export default router;
