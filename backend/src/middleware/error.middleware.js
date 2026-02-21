// module.exports = (err, req, res, next) => {

//   err.statusCode = err.statusCode || 500;
//   err.status = err.status || "error";

//   res.status(err.statusCode).json({
//     status: err.status,
//     message: err.message,
//   });

// };

module.exports = (err, req, res, next) => {

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Log detailed error in development
  if (process.env.NODE_ENV === "development") {
    console.error("ERROR 💥", err);
  }

  // Clean message in production
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });

};