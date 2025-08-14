export function notFound(req, res, next) {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

export function errorHandler(err, _req, res, _next) {
  const status = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(status).json({
    message: err.message || 'Server error',
  });
}
