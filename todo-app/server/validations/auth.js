import { body } from "express-validator";

export const registerValidation = [
  body("email", "Invalid email format").isEmail(),
  body("password", "Password must be at least 6 characters").isLength({
    min: 6,
  }),
  body("username", "Username is required").isString(),
];
