const joiHandler = async (schema, req, res, next, reqObject = {}) => {
  try {
    await schema.validateAsync({
      ...req.body,
    });

    return next();
  } catch (error) {
    return res.status(400).send({
      message: error.message,
      status: "error",
      data: null,
    });
  }
};

const joiValidator = (schema, reqObject) => {
  return async (...arg) => {
    return await joiHandler(schema, ...arg, reqObject);
  };
};

module.exports = joiValidator
