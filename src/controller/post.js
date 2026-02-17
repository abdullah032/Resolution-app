import urlParts from "../utils/urlParts.js";
import createGoal from "../service/createGoal.js";
import sendResponse from "../utils/sendResponse.js";

import httpErrors from "../utils/httpErrors.js";
import signup from "../service/signup.js";
import login from "../service/login.js";
export default async function handlePostReq(req, res) {
  const { resource } = urlParts(req.url);

  try {
    //If url contains signup
    if (resource === "signup") {
      const signupRes = await signup(req.data);
      sendResponse(res, signupRes);
    }
    //if url contains /login
    if (resource === "login") {
      const loginRes = await login(req.data);
      sendResponse(res, loginRes);
    }
    //if url contains /user
    if (resource === "users") {
      const userRes = await signup(req.data);
      sendResponse(res, httpErrors.ok(userRes));
    }
    // Check is URL contains /goals
    else if (resource === "goals") {
      const data = req.data;
      data.uId = req.user._id;
      const goalRes = await createGoal(data);

      sendResponse(res, httpErrors.ok({ goal: goalRes }));
    }
  } catch (error) {
    console.log("This error is coming from here..");
    console.log(error);
    sendResponse(res, error);
  }
}
