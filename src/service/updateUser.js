import db from "../model/db.js";
import mongErrors from "../model/mongErrors.js";
import httpErrors from "../utils/httpErrors.js";
export default async function updateUser(id, data) {
  const { email, hash, salt, token, createdAt } = data;
  try {
    // User can not change these value
    if (email || hash || salt || token || createdAt) {
      throw httpErrors.unprocessableEntity({
        error: "You can not change these filed",
      });
    }

    await db.updateById("users", id, data);

    return { msg: "User updated!" };
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError")
      throw mongErrors.validationError(error);

    if (error.name === "castError") throw mongErrors.castError(error);

    throw error;
  }
}
