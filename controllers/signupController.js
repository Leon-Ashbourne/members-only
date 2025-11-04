// const authenticate = require("../passport/passport");

exports.signupGet = (req, res) => {
    res.render("signUp/signup", {title: "sign up", header: "Sign up:"});
}

