const { validationResult } = require("express-validator");
const validateMessage = require("../validators/messageValidator");
const db = require("../db/queries");

async function createNewMessageGet(req, res) {
  if (req.user) {
    res.render("createNewMessage", { user: req.user });
  } else {
    res.redirect("/");
  }
}

const createNewMessagePost = [
  validateMessage,
  async function createNewMessagePost(req, res) {
    // Check if the user is logged in
    if (req.user) {
      // Validate message input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("createNewMessage", {
          user: req.user,
          errors: errors.array(),
        });
      }
      // Insert new message in DB
      await db.createNewMessage(req.user.id, req.body.message)
    }
    res.redirect("/");
  },
];

module.exports = {
  createNewMessageGet,
  createNewMessagePost,
};
