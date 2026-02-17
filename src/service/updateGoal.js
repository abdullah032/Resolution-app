import db from "../model/db.js";
import mongErrors from "../model/mongErrors.js";
export default async function updateGoal(id, data) {
  try {
    await db.updateById("goals", id, data);

    return { msg: "Goal updated!" };
  } catch (error) {
    if (error.name === "ValidationError")
      throw mongErrors.validationError(error);

    if (error.name === "castError") throw mongErrors.castError(error);

    throw error;
  }
}
