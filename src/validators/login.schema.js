import zod from "zod";
import validationResponse from "./validationResponse.js";

const Schema = zod.object({
  email: zod.string().email().min(7),
  password: zod.string(),
});

export default function loginValidation(data) {
  const response = Schema.safeParse(data);
  return validationResponse(response);
}
