const pg = require("pg");
const expressSession = require("express-session");
const pgSession = require("connect-pg-simple")(expressSession);
const pgPool = require("../db/pool");
require("dotenv").config();

const options = {
  store: new pgSession({
    pool: pgPool,
  }),
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false, 
  cookie: { maxAge: 24 * 60 * 60 * 1000 },
};

module.exports = options;
