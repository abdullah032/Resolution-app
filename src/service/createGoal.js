import db from "../model/db.js";
import mongErrors from "../model/mongErrors.js";

export default async function createGoal(data) {
  try {
    const goal = await db.create("goals", data);
    return goal;
  } catch (error) {
    if (error.name === "ValidationError")
      throw mongErrors.validationError(error);

    if (error.name === "castError") throw mongErrors.castError(error);

    throw error;
  }
}
