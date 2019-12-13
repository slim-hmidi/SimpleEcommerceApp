class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorMiddleware = (error, req, res) => {
  const statusCode = error.statusCode || 500;
  const { message } = error;

  return res.send(statusCode).send({
    message,
  });
};

module.exports = {
  ErrorHandler,
  errorMiddleware,
};
