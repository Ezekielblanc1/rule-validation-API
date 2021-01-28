const { trimResponse } = require("./helper");

const setRule = (req, res) => {
  const { field, condition, condition_value } = req.body.rule;

  let value = false;

  try {
    switch (condition) {
      case "eq":
        if (req.data === condition_value) {
          value = true;
        }
        break;
      case "neq":
        if (req.data !== condition_value) {
          value = true;
        }
        break;
      case "gt":
        if (Number(req.data) > Number(condition_value)) {
          value = true;
        }
        break;
      case "gte":
        if (Number(req.data) >= Number(condition_value)) {
          value = true;
        }
        break;
      case "contains":
        if (req.data.includes(condition_value)) {
          value = true;
        }
        break;

      default:
        break;
    }

    if (!value) {
      throw Error();
    }
    const payload = {
      message: `field ${field} successfully validated.`,
      status: "success",
      field,
      req,
      condition,
      condition_value,
    };
    return res.status(200).send(trimResponse(payload));
  } catch (err) {
    const payload = {
      message: `field ${field} failed validation.`,
      status: "error",
      field,
      req,
      condition,
      condition_value,
    };
    return res.status(400).send(trimResponse(payload));
  }
};

module.exports = setRule;
