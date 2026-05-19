const { body } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = (min, max) => `must be between ${min} and ${max} characters.`;
const maxLengthErr = (maxLength) => `must not exceed ${maxLength} characters.`;
const emailErr = "format incorrect. ";
const emptyErr = "must not be empty.";
const weakPasswordErr = `
must contain at least 8 characters, of which at least 1 lower case and upper case letters, and 1 number.
`;
const notMatchingErr = "do not match.";

const validateUser = [
  body("firstname")
    .trim()
    .notEmpty()
    .withMessage(`First name ${emptyErr}`)
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr(1, 10)}`),
  body("lastname")
    .optional({ values: "falsy" })
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ max: 10 })
    .withMessage(`Last name ${maxLengthErr(10)}`),
  body("email")
    .trim()
    .notEmpty()
    .withMessage(`Email ${emptyErr}`)
    .isEmail()
    .withMessage(`Email ${emailErr}`),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(`Password ${emptyErr}`)
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
    .withMessage(`Password ${weakPasswordErr}`)
    .isLength({ max: 30 })
    .withMessage(`Password ${maxLengthErr(30)}`),
  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Please type in the same password again.")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage(`Passwords ${notMatchingErr}`),
];

module.exports = validateUser;
