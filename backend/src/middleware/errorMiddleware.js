function errorMiddleware(error, req, res, next) {
  // If the error comes from an axios request (like GitHub API), use its status
  const statusCode =
    error.statusCode ||
    error.response?.status ||
    (res.statusCode === 200 ? 500 : res.statusCode);

  const message = error.response?.data?.message || error.message || "Server error";

  res.status(statusCode).json({
    success: false,
    message,
  });
}

module.exports = errorMiddleware;
