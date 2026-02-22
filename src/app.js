import handleGetReq from "./controller/get.js";
import handlePostReq from "./controller/post.js";
import http from "http";
import { loadEnvFile } from "process";
import path from "path";
import _dirname from "./utils/dirname.js";
import bodyParser from "./utils/bodyParser.js";
import handlePatchReq from "./controller/patch.js";
import handleDeleteReq from "./controller/delete.js";
import sendResponse from "./utils/sendResponse.js";
import httpErrors from "./utils/httpErrors.js";
import authentication from "./utils/authentication.js";
import urlParts from "./utils/urlParts.js";
import applyCors from "./utils/applyCors.js";

// Load env file
loadEnvFile(path.join(_dirname, "..", "..", ".env"));

// Create server
const server = http.createServer();

// Handle requests
server.on("request", async (req, res) => {
  try {
    console.log("request");

    // Apply cors
    applyCors(res);

    const publicRoutes = ["login", "signup"];

    const { resource } = urlParts(req.url);

    if (req.url === "/favicon.ico") {
      res.writeHead(204); // No Content
      return res.end();
    }

    if (req.method === "OPTIONS") {
      console.log("options");
      res.writeHead(204);
      return res.end();
    }

    //Is user authenticated
    if (req.method !== "OPTIONS" && !publicRoutes.includes(resource)) {
      const user = await authentication(req);
      req.user = user;
    }

    const method = req.method;

    if (method === "GET") {
      await handleGetReq(req, res);
    } else if (method === "POST") {
      await handlePostReq(req, res);
    } else if (method === "PATCH") {
      const data = await bodyParser(req);
      req.body = data;
      await handlePatchReq(req, res);
    } else if (method === "DELETE") {
      const data = await bodyParser(req);
      req.body = data;
      await handleDeleteReq(req, res);
    } else {
      sendResponse(res, httpErrors.notFound({ error: 404 }));
    }
  } catch (error) {
    console.log(error);
    sendResponse(res, error);
  }
});

const port = Number(process.env.PORT);

server.listen(port, () => {
  console.log(`Server is listing on port: ${port}`);
});

// {"username":"ab@gmail.com","name":"Abdullah","password":"abc","confirmPassword":"abc"}

/*
      // User endpoints

      /users: to get all users (only for admin)
      /users/id: TO get specific user (only for admin and user itself) 
      
      /goals: To get all goals
      /goals/id : To get specific goal

      Methods
        GET: /
        POST: /
        PATCH: / (users/goals)/id 
        DELETE: / (user/goals)/id 

 */

// {"title":"Resolution project","description":"I have to finishe  this project by the end of this month, so  i have to daily spend 1 hour on this project.",
//   "goal":30,"dailyTarget":1
// }
