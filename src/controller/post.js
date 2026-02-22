import urlParts from "../utils/urlParts.js";
import createGoal from "../service/createGoal.js";
import sendResponse from "../utils/sendResponse.js";

import httpErrors from "../utils/httpErrors.js";
import signup from "../service/signup.js";
import login from "../service/login.js";
import signupValidation from "../validators/signup.schema.js";
import loginValidation from "../validators/login.schema.js";
import goalValidation from "../validators/goal.schema.js";

import signupRateLimiter from "../utils/signupRateLimiter.js";

import loginRateLimiter from "../utils/loginRateLimiter.js";

import bodyParser from "../utils/bodyParser.js";

export default async function handlePostReq(req, res) {
  const { resource } = urlParts(req.url);

  const user = {
    name: req.user.name,
    _id: req.user._id,
    email: req.user.email,
  };
  const token = createJWToken(user);

  try {
    //If url contains signup
    if (resource === "signup") {
      await signupRateLimiter(req, res, async () => {
        const data = signupValidation(req.body);
        const signupRes = await signup(data);
        sendResponse(res, signupRes);
      });
    }
    //if url contains /login
    if (resource === "login") {
      await loginRateLimiter(req, res, async () => {
        const body = await bodyParser(req);
        const data = loginValidation(body);
        const loginRes = await login(data);
        console.log("OK");
        sendResponse(res, loginRes);
      });
    }

    // Check is URL contains /goals
    else if (resource === "goals") {
      const data = goalValidation(req.body);
      data.uId = req.user._id;
      const goalRes = await createGoal(data);

      sendResponse(res, httpErrors.ok({ goal: goalRes, token }));
    }
  } catch (error) {
    error.response.token = token;

    sendResponse(res, error);
  }
}
