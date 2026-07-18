// @ts-check

export const HTTP_STATUS = Object.freeze({
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  METHOD_NOT_ALLOWED: 405,
});

// Automation Exercise returns JSON-formatted bodies with this legacy media type.
export const API_CONTENT_TYPES = Object.freeze({
  LEGACY_JSON: "text/html",
});
