const executable = async (schema, req, res, next, reqObject = {}) => {
  try {
    await schema.validateAsync({
      ...req.body,
    });

    return next();
  } catch (err) {
    return res.status(400).send({
      message: err.message,
      status: "error",
      data: null,
    });
  }
};

const joiValidator = (schema, reqObject) => {
  return async (...args) => {
    return await executable(schema, ...args, reqObject);
  };
};

module.exports = joiValidator
