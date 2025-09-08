import Joi from "joi";
import type { Request, Response, NextFunction } from "express";

const authSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(1).required(),
});

export const validateAuthRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = authSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      valid: false,
      message: error.details?.[0]?.message ?? "Invalid request",
    });
  }

  next();
};
