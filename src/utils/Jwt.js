import jwt from "jsonwebtoken";
import httpErrors from "./httpErrors.js";

// Create JWT Token

function createJWToken(payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h", // Expire within 1 hour
  });
  return token;
}

function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    if (err.message === "invalid token" || err.message === "jwt malformed") {
      throw httpErrors.unauthorized({ error: "Unauthorized User!" });
    }
  }
}

export { verifyToken, createJWToken };
