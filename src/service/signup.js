import generateHashAndSalt from "../utils/generateHashAndSalt.js";
import sessionToken from "../utils/sessionToken.js";
import httpErrors from "../utils/httpErrors.js";
import db from "../model/db.js";
import mongoose from "mongoose";

export default async function signup(data) {
  // opens a temporary database session
  const session = await mongoose.startSession();

  try {
    const { email, password, confirmPassword, name } = data;

    //find the email in database:
    const userExist = await db.find("users", { email }, { email: 1 });

    //If this email already exist in database:
    if (userExist.length) {
      throw httpErrors.conflict({ error: "This email is taken!" });
    }

    //If password does not exist in request object
    if (!password)
      throw httpErrors.unprocessableEntity({
        error: "Please type password",
      });

    //If Confirm password does not exist in request object
    if (!confirmPassword)
      throw httpErrors.unprocessableEntity({
        error: "Please type confirm password",
      });

    // If password is shorter than 8 chars
    if (password.length < 8 || confirmPassword.length < 8)
      throw httpErrors.unprocessableEntity({
        error: "Password should be at least 8 characters long!",
      });

    //if password and confirmPassword does not matches:
    if (password !== confirmPassword)
      throw httpErrors.unprocessableEntity({
        error: "Password does not matches with confirm password!",
      });

    //Convert password into hash and salt
    const { hash, salt } = await generateHashAndSalt(password);

    //call sessionToken
    const { token, cookieString } = await sessionToken();

    //Group the next operations together
    session.startTransaction();

    //Create new user
    const newUser = await db.create(
      "users",
      {
        email,
        hash,
        salt,
        name,
      },
      { session },
    );

    // Create expiry session document
    await db.create(
      "sessionExpiry",
      {
        token: token,
        uId: newUser._id,
      },
      { session },
    );

    // Save everything!
    await session.commitTransaction();

    // Close the workspace
    session.endSession();

    return httpErrors.ok(
      { msg: `Welcome ${newUser.name}` },
      { "Set-Cookie": cookieString },
    );
  } catch (error) {
    // Undo everything
    session.abortTransaction();
    session.endSession();
    console.log(error);
    throw error;
  }
}
