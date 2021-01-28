exports.trimResponse = ({
  message,
  status,
  field,
  req,
  condition,
  condition_value,
}) => {
  return {
    message,
    status,
    data: {
      validation: {
        error: status === "success" ? false : true,
        field: `${field}`,
        field_value: req.data,
        condition: `${condition}`,
        condition_value: `${condition_value}`,
      },
    },
  };
};
