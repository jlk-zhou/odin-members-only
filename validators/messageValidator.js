const { body } = require("express-validator");

const emptyErr = "must not be empty.";
const maxLengthErr = (maxLength) => `must not exceed ${maxLength} characters.`;

const validateMessage = [
  body("message")
    .trim()
    .notEmpty()
    .withMessage(`Message ${emptyErr}`)
    .isLength({ max: 140 })
    .withMessage(`Message ${maxLengthErr(140)}`),
];

module.exports = validateMessage; 
