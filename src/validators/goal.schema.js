import zod from "zod";
import validationResponse from "./validationResponse.js";

const Schema = zod.object({
  title: zod.string().min(1),
  description: zod.string().optional(),
  goal: zod.number().min(1),
  dailyTarget: zod.number().min(1),
  type: zod.string(),
  category: zod.string(),
});

export default function goalValidation(data) {
  const response = Schema.safeParse(data);
  return validationResponse(response);
}
