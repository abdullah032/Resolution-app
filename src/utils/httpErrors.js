const httpErrors = (function () {
  const contentType = "application/json";

  //   Not Found
  const notFound = (data, headers = {}) => {
    return {
      status: 404,
      response: data,
      headers: { "Content-type": contentType, ...headers },
    };
  };

  const ok = (data, headers = {}) => {
    return {
      status: 200,
      response: data,
      headers: { "Content-type": contentType, ...headers },
    };
  };

  const unauthorized = (data, headers = {}) => {
    return {
      status: 401,
      response: data,
      headers: { "Content-type": contentType, ...headers },
    };
  };

  const bedRequest = (data, headers = {}) => {
    return {
      status: 400,
      response: data,
      headers: { "Content-type": contentType, ...headers },
    };
  };

  const internalError = (data, headers = {}) => {
    return {
      status: 500,
      response: data,
      headers: { "Content-type": contentType, ...headers },
    };
  };

  const forbidden = (data, headers = {}) => {
    return {
      status: 403,
      response: data,
      headers: { "Content-type": contentType, ...headers },
    };
  };

  const unprocessableEntity = (data, headers = {}) => {
    /*
     422 Used when the request is properly formatted (JSON/Form) but validation 
      fails (e.g., password does not match confirmation).
    */
    return {
      status: 422,
      response: data,
      headers: { "Content-type": contentType, ...headers },
    };
  };

  const conflict = (data, headers = {}) => {
    // It can be use for user already exit!
    return {
      status: 409,
      response: data,
      headers: { "Content-type": contentType, ...headers },
    };
  };
  return {
    notFound,
    internalError,
    ok,
    unauthorized,
    bedRequest,
    forbidden,
    unprocessableEntity,
    conflict,
  };
})();

export default httpErrors;
