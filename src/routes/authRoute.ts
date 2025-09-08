import { Router } from "express";
import {
  authenticateUser,
  testConnection,
} from "../controller/authController.js";
import { validateAuthRequest } from "../middleware/validation.js";

const router = Router();

// POST /api/auth/authenticate
router.post("/authenticate", validateAuthRequest, authenticateUser);

// GET /api/auth/test
router.get("/test", testConnection);

export default router;
