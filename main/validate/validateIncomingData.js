 const validateFieldFromData = (req, res, next) => {
    try {
      const {
        rule: { field },
        data,
      } = req.body;
      const fieldArray = field.split('.');

      if (fieldArray.length > 2) {
        throw new Error('Field nesting can not be more than two levels.');
      }

      const arrayFilter = fieldArray.filter((arr) => arr);

      if (arrayFilter.length < 1) {
        throw new Error('No field supplied.');
      }

      const checkDataFirstField = data.hasOwnProperty(arrayFilter[0]);

      if (!checkDataFirstField) {
        throw new Error(`Field ${arrayFilter[0]} is missing from data.`);
      }

      if (arrayFilter.length === 1) {
        req.data = data[arrayFilter[0]];
        return next();
      }

      const checkDataInnerField = data[arrayFilter[0]].hasOwnProperty(
        arrayFilter[1]
      );

      if (!checkDataInnerField) {
        throw new Error(`Field ${arrayFilter[1]} is missing from data.`);
      }

      req.data = data[arrayFilter[0]][arrayFilter[1]];

      return next();
    } catch (error) {
      return res.status(400).send({
        message: error.message,
        status: 'error',
        data: null,
      });
    }
  };

  module.exports = validateFieldFromData