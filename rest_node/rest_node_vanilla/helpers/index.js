const generateResponse = (
  res,
  payload = null,
  statusCode = 400,
  error = null
) => {
  res.setHeader('Content-Type', 'application/json'); // Set Content Type to return JSON
  res.statusCode = statusCode; // Set Status Code
  const responseObject =
    payload !== null ? { status: 'OK', payload } : { status: 'ERROR', error }; // The object returned, based on success or error

  return res.end(JSON.stringify(responseObject, null, 3));
};

const ReadableStreamToString = (req) =>
  new Promise((resolve, reject) => {
    try {
      let output = '';
      req.on('data', (buffer) => (output += buffer.toString()));
      req.on('end', () => resolve(output));
    } catch (error) {
      reject(error);
    }
  });

const matchRoute = async (req, res, routes) => {
  let url = req.url;

  const route = routes.find(({ method, path }) => {
    if (url.length > 2 && url.slice(-1) === '/') {
      // Check if has '/' at the end and remove it, need to be more than 2 chars on url
      url = url.slice(0, -1);
    }
    const areTheMethodsEqual = method === req.method; // Check if GET === GET etc

    const checkIfPathIsMatching =
      typeof path === 'object' ? url.match(path) : path === url;

    return checkIfPathIsMatching && areTheMethodsEqual; // Return true if is match by path and method, ex: '/users', GET
  });

  if (route) {
    let param = null;
    let body = null;
    const methods = ['POST', 'PATCH', 'PUT'];

    if (typeof route.path === 'object') {
      param = url.match(route.path)[1]; // Get param from request, ex: /users/123 => param: 123 by regex| [1] => the value from regex in on position 1
    }

    if (methods.includes(req.method)) {
      body = await ReadableStreamToString(req);
    }
    return route.callback(res, body, param);
  }
  return generateResponse(res, null, 400, 'ERROR: Bad Request!'); // If not a match return error
};

module.exports = {
  generateResponse,
  ReadableStreamToString,
  matchRoute,
};
