import { z } from "zod";

export const userNameValidarion = z
  .string()
  .min(3, "User Name must be atleast 3 characters")
  .min(20, "User Name must be no more than 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special character");

export const signUpSchema = z.object({
  userName: userNameValidarion,
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "password must be at least 6 character" }),
});
