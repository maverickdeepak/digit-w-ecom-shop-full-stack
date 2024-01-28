const not_found = (req, res, next) => {
  const error = new Error(`Not Found ${req.orignalUrl}`);
  res.status(404);
  next(error);
};

const error_handler = (err, req, res, next) => {
  let status_code = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // check for mongoose object id or case error
  if (err.name === "CastError" && err.kind === "ObjectId") {
    (message = "Resource not found"), (status_code = 404);
  }

  res.status(status_code).json({
    message,
    stack: process.env.NODE_ENV === "production" ? "🧁" : err.stack,
  });
};

export {not_found, error_handler}