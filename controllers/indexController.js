const { validationResult } = require("express-validator");
const validateUser = require("../validators/userValidator");
const db = require("../db/queries");
const bcrypt = require("bcryptjs");

async function showMessages(req, res) {
  res.render("index", { user: req.user });
}

async function signUpGet(req, res) {
  res.render("signUpForm");
}

const signUpPost = [
  validateUser,
  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("signUpForm", {
        errors: errors.array(),
      });
    }
    try {
      const firstname = req.body.firstname; 
      const lastname = req.body.lastname; 
      const email = req.body.email; 
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await db.createUser({
        firstname,
        lastname,
        email,
        hashedPassword,
      });
      res.redirect("/");
    } catch (err) {
      return next(err);
    }
  },
];

module.exports = {
  showMessages,
  signUpGet,
  signUpPost,
};
