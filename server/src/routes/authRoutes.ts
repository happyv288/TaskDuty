import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

const router = Router();

const generateToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign({ userId }, secret, {
    expiresIn: "7d",
  });
};

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id.toString());

    res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
    });
  }
});

// Login
// Login
router.post("/login", async (req, res) => {
  console.log("LOGIN ROUTE REACHED");

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    console.log("Looking for user:", email);

    const user = await User.findOne({ email });
    console.log(
      "User fields returned:",
      user ? Object.keys(user.toObject()) : "No user",
    );
    console.log(
      "Password field exists:",
      user ? Boolean(user.password) : false,
    );

    if (!user) {
      console.log("User not found");

      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    console.log("User found. Checking password...");

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      console.log("Password does not match");

      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    console.log("Password matches. Generating token...");

    const token = generateToken(user._id.toString());

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      message: "Login failed",
      error: error instanceof Error ? error.message : String(error),
    });
  }
});

export default router;
