const Router = require("express");
const loginController = require("../controllers/loginController");
const passport = require("../passport/passport");

const loginRouter = Router();

loginRouter.get("/", loginController.loginGet);
loginRouter.post("/", passport.authenticate(
    "local", {
        failureRedirect: "/log-in",
        successRedirect: "/"
    }
))


module.exports = loginRouter;