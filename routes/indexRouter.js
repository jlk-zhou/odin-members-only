const { Router } = require("express");
const passport = require("passport");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

indexRouter.get("/sign-up", indexController.signUpGet);
indexRouter.post("/sign-up", indexController.signUpPost);

indexRouter.post(
  "/log-in",
  passport.authenticate("login", {
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
  });
});

indexRouter.get("/join-club", indexController.joinClubGet);
indexRouter.post(
  "/join-club",
  passport.authenticate("member", {
    failureRedirect: "/join-club",
  }),
  indexController.giveMemberStatus,
);

indexRouter.get("/become-admin", indexController.becomeAdminGet); 
indexRouter.post(
  "/become-admin", 
  passport.authenticate("admin", {
    failureRedirect: "/become-admin"
  }), 
  indexController.giveAdminStatus, 
)

indexRouter.get("/", indexController.showMessages);

module.exports = indexRouter;
