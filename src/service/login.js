import db from "../model/db.js";
import verifyPassword from "../utils/verifyPassword.js";
import httpErrors from "../utils/httpErrors.js";
import { createJWToken } from "../utils/Jwt.js";
export default async function login(data) {
  const { email, password } = data;

  try {
    // -> Find user by username
    const user = await db.find("users", { email: email }).select("+hash +salt");

    //If user does not exist:
    if (user.length === 0) {
      // send response 401, "invalid password or username"

      throw httpErrors.notFound({ error: "No such user found!" });
    }
    console.log("Line 18");
    // If user exist
    //Extract Hash and salt from user database.
    const { hash, salt, _id } = user[0];

    //If user password does not matches :
    if (!verifyPassword(password, hash, salt)) {
      throw httpErrors.unauthorized({ error: "Invalid username or password" });
    }

    // If password matches: Generate JWT TOKEN
    const token = createJWToken({ _id, email });

    // Send response and set cookie
    return httpErrors.ok(
      { msg: "Welcome you are login", user: { email, _id }, token },
      {
        "Set-Cookie": [
          `refreshToken=${token}; HttpOnly; Secure; SameSite=Strict`,
        ],
      },
    );
  } catch (error) {
    console.log("This also runs");
    console.log(error);
    throw error;
  }
}
