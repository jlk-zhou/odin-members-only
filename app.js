const path = require("node:path");
const express = require("express");
const session = require("express-session");
const sessionOptions = require("./auth/sessionOptions");
const passport = require("passport");
const { localStrategy } = require("./auth/LocalStrategy");
const serializeUser = require("./auth/serializeUser");
const deserializeUser = require("./auth/deserializeUser");

const indexRouter = require("./routes/indexRouter");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use(session(sessionOptions));
app.use(passport.session());

passport.use(localStrategy);
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Members only - listening on port ${PORT}`);
});
