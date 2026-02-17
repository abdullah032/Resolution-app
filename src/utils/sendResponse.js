export default function sendResponse(resObj, resData) {
  try {
    const status = resData.status || 500;
    resObj.writeHead(status, resData.headers);
    resObj.end(JSON.stringify(resData.response));
  } catch (error) {
    console.log(error);
  }
}
