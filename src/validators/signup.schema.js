import zod from "zod";
import validationResponse from "./validationResponse.js";

const regex = /@(gmail|yahoo|hotmail)\.(com|edu|org)$/gi;
// Schema
const Schema = zod
  .object({
    name: zod.string().min(1),
    email: zod.string().email(),
    password: zod.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: zod.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default function signupValidation(data) {
  const result = Schema.safeParse(data);
  return validationResponse(result);
}
