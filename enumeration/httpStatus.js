module.exports.HTTPSTATUS = {
  OK: {
    code: 200,
    message: 'The request has succeeded',
  },
  CREATED: {
    code: 201,
    message:
      'The request has succeeded and a new resource has been created as a result',
  },
  NO_CONTENT: {
    code: 204,
    message: 'The request has succeeded but no content to send back',
  },
  BAD_REQUEST: {
    code: 400,
    message: 'The server could not understand the request',
  },
  UNAUTHORIZED: {
    code: 401,
    message: 'The client must authenticate itself',
  },
  FOR_BIDDEN: {
    code: 403,
    message: 'The client does not have access rights to the content',
  },
  NOT_FOUND: {
    code: 404,
    message: 'The server can not find the requested resource',
  },
  METHOD_NOT_ALLOW: {
    code: 405,
    message:
      'The request method is known by the server but is not supported by the target resource',
  },
  CONFLICT: {
    code: 409,
    message: 'This response is sent when a request conflicts',
  },
};
