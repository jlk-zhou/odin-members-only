const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const db = require("../db/queries");

const login = new LocalStrategy(
  { usernameField: "email" },
  async (email, password, done) => {
    try {
      const user = await db.getUserByEmail(email);
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
  },
);

const member = new LocalStrategy(
  { 
    usernameField: "club-password", 
    passwordField: "club-password", 
    passReqToCallback: true
  },
  async (req, username, password, done) => {
    try {
      const clubPassword = await db.getPrivilegePassword("member");
      const match = await bcrypt.compare(password, clubPassword);
      if (!match) {
        return done(null, false, { message: "Incorrect club password" });
      }
      return done(null, req.user);
    } catch (err) {
      return done(err);
    }
  },
);

const admin = new LocalStrategy(
  { 
    usernameField: "admin-password", 
    passwordField: "admin-password", 
    passReqToCallback: true
  },
  async (req, username, password, done) => {
    try {
      const adminPassword = await db.getPrivilegePassword("admin");
      const match = await bcrypt.compare(password, adminPassword);
      if (!match) {
        return done(null, false, { message: "Incorrect admin password" });
      }
      return done(null, req.user);
    } catch (err) {
      return done(err);
    }
  },
);

module.exports = { login, member, admin };
