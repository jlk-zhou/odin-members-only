const path = require("node:path");
const express = require("express");
const session = require("express-session");
const sessionOptions = require("./auth/sessionOptions");
const passport = require("passport");
const strategies = require("./auth/LocalStrategies");
const serializeUser = require("./auth/serializeUser");
const deserializeUser = require("./auth/deserializeUser");

const messagesRouter = require("./routes/messagesRouter"); 
const indexRouter = require("./routes/indexRouter");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use(session(sessionOptions));
app.use(passport.session());

passport.use("login", strategies.login);
passport.use("member", strategies.member); 
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.use("/messages", messagesRouter); 
app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Members only - listening on port ${PORT}`);
});
