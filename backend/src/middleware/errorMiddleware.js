function errorMiddleware(error, req, res, next) {
  const statusCode = error.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);

  res.status(statusCode).json({
    success: false,
    message: error.message || "Server error",
  });
}

module.exports = errorMiddleware;
