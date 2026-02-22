import httpResponse from "../utils/httpErrors.js";
export default async function logout() {
  try {
    return httpResponse.ok(
      { msg: "Logged out successfully!" },
      { "Set-Cookie": "refreshToken=; HttpOnly; Max-Age=0; Path=/" },
    );
  } catch (error) {
    console.log(error);
  }
}
