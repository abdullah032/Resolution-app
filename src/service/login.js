import db from "../model/db.js";
import sessionToken from "../utils/sessionToken.js";
import verifyPassword from "../utils/verifyPassword.js";
import httpErrors from "../utils/httpErrors.js";
export default async function login(data) {
  const { email, password } = data;

  try {
    // -> Find user by username
    const user = await db.find("users", { email: email }).select("+hash +salt");

    console.log(user);
    //If user does not exist:
    if (user.length === 0) {
      // send response 401, "invalid password or username"

      throw httpErrors.notFound({ error: "No such user found!" });
    }

    // If user exist
    //Extract Hash and salt from user database.
    const { hash, salt, _id } = user[0];

    //If user password does not matches :
    if (!verifyPassword(password, hash, salt)) {
      throw httpErrors.unauthorized({ error: "Invalid username or password" });
    }

    // If password matches:
    // Generate sessionToken
    const { token, cookieString } = await sessionToken();

    console.log(token);
    console.log(_id);
    // Updated user token property
    await db.create("sessionExpiry", { token, uId: _id });

    // Send response and set cookie
    return httpErrors.ok(
      { msg: "Welcome you are login" },
      { "Set-Cookie": cookieString },
    );
  } catch (error) {
    // console.log(error);
    throw error;
  }
}
