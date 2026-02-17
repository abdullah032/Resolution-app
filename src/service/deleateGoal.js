import db from "../model/db.js";

import mongErrors from "../model/mongErrors.js";
export default async function deleteGoal(id) {
  try {
    const result = await db.deleteById("goals", id);

    if (!result.deletedCount) throw mongErrors.noFound("goal");
    return { msg: "Goal deleted successfully!" };
  } catch (error) {
    throw error;
  }
}
