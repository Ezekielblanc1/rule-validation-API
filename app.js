require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const jsonData = require("./data.json");
const joiSchema = require("./main/validate/validateSchema");
const joiValidator = require("./main/validate/validatorFunc");
const setRule = require("./main/setRule");
const validateFieldFromData = require("./main/validate/validateIncomingData");
app.get("/", (req, res) => {
  res.json(jsonData);
});

app.post("/validate-rule", joiValidator(joiSchema), validateFieldFromData, setRule);

app.listen(process.env.PORT || 5000, () => console.log(`Server running on port ${port}`));
