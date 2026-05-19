const { Router } = require("express");
const passport = require("passport");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

indexRouter.get("/sign-up", indexController.signUpGet);
indexRouter.post("/sign-up", indexController.signUpPost);
indexRouter.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  }),
);
indexRouter.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err); 
    }
    res.redirect("/"); 
  })
})
indexRouter.get("/", indexController.showMessages);

module.exports = indexRouter;
