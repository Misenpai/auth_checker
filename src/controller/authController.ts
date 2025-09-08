import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../config/database.js";
import type {
  AuthRequest,
  AuthResponse,
  TestConnectionResponse,
} from "../types/index.js";

export const authenticateUser = async (req: Request, res: Response) => {
  try {
    const { username, password }: AuthRequest = req.body;

    if (!username || !password) {
      const response: AuthResponse = {
        success: false,
        valid: false,
        message: "Username and password are required",
      };
      return res.status(400).json(response);
    }

    // Find user in database
    const user = await prisma.user.findUnique({
      where: { username: username.trim() },
    });

    if (!user) {
      console.log(`[IIT-Auth] User not found: ${username}`);
      const response: AuthResponse = {
        success: true,
        valid: false,
        message: "Invalid credentials",
      };
      return res.status(200).json(response);
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      console.log(`[IIT-Auth] Invalid password for user: ${username}`);
      const response: AuthResponse = {
        success: true,
        valid: false,
        message: "Invalid credentials",
      };
      return res.status(200).json(response);
    }

    console.log(`[IIT-Auth] Authentication successful for user: ${username}`);
    const response: AuthResponse = {
      success: true,
      valid: true,
      message: "Authentication successful",
    };

    res.status(200).json(response);
  } catch (error: any) {
    console.error("[IIT-Auth] Authentication error:", error);
    const response: AuthResponse = {
      success: false,
      valid: false,
      message: "Internal server error",
    };
    res.status(500).json(response);
  }
};

export const testConnection = async (req: Request, res: Response) => {
  try {
    // Test database connection
    await prisma.$connect();

    const response: TestConnectionResponse = {
      success: true,
      connected: true,
      message: "IIT Auth service is running and database is connected",
    };

    res.status(200).json(response);
  } catch (error: any) {
    console.error("[IIT-Auth] Connection test error:", error);
    const response: TestConnectionResponse = {
      success: false,
      connected: false,
      message: "Database connection failed",
    };
    res.status(500).json(response);
  } finally {
    await prisma.$disconnect();
  }
};
