const Joi = require('@hapi/joi');


 const joiSchema = Joi.object({
    rule: Joi.object()
      .keys({
        field: Joi.string().required().messages({
          'string.base': `field should be a string`,
          'string.empty': 'field "field" in rule should have a value.',
          'any.required': `field is required.`,
        }),
        condition: Joi.string()
          .valid('eq', 'neq', 'gte', 'gt', 'contains')
          .required()
          .messages({
            'string.base': `condition should be a string`,
            'string.empty': 'field condition in rule have a value.',
            'any.required': `condition is required.`,
          }),
        condition_value: Joi.any().required().messages({
          'any.required': `condition_value is required`,
        }),
      })
      .required()
      .messages({
        'string.base': `rule should be an object`,
        'any.required': `rule is required.`,
      }),
    data: Joi.alternatives().try(
      Joi.string().required(),
      Joi.array().required(),
      Joi.object().required()
    ),
  });

  module.exports = joiSchema