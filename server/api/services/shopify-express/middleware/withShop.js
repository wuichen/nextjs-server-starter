module.exports = function withShop({ authBaseUrl } = {}) {

  const verifyRequest = function verifyRequest(request, response, next) {
    const { query: { shop }, session, baseUrl } = request;

    if (session && session.accessToken) {
      next();
      return;
    }

    if (shop) {
      response.redirect(`${authBaseUrl || baseUrl}/auth?shop=${shop}`);
      return;
    }

    response.redirect('/toshopify');
    return;
  };

  verifyRequest.unless = require('express-unless')
  return verifyRequest

  // return function verifyRequest(request, response, next) {
  //   const { query: { shop }, session, baseUrl } = request;

  //   if (session && session.accessToken) {
  //     next();
  //     return;
  //   }

  //   if (shop) {
  //     response.redirect(`${authBaseUrl || baseUrl}/auth?shop=${shop}`);
  //     return;
  //   }

  //   response.redirect('/toshopify');
  //   return;
  // };
};
