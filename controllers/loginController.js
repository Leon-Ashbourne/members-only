// const authenticate = require("../passport/passport");

exports.loginGet = (req, res) =>{
    res.render("login/login", {title: "log in", header: "Log in:"});
}


