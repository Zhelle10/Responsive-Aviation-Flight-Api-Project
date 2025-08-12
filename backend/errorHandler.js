// errorHandler.js
module.exports = (err, req, res, next) => {
  console.log("Error handler called:", err.status, err.message); // DEBUG
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal Server Error",
      status: err.status || 500,
    },
  });
};
  
