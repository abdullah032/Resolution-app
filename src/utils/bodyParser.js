import httpResponse from "./httpErrors.js";

export default function bodyParser(req) {
  return new Promise((resolve, reject) => {
    try {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", () => {
        try {
          const parseData = JSON.parse(data);
          resolve(parseData);
        } catch (error) {
          reject(httpResponse.bedRequest({ msg: "Invalid Json" }));
        }
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}
