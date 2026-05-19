const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const db = require("../db/queries");

const localStrategy = new LocalStrategy(
  { usernameField: "email" }, 
  async (email, password, done) => {
  try {
    const user = await db.getUserByEmail(email);
    console.log(user); 
    if (!user) {
      return done(null, false, { message: "Incorrect username" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, { message: "Incorrect password" });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

module.exports = { localStrategy }; 