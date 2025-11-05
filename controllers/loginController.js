// const authenticate = require("../passport/passport");
const bcrypt = require("bcryptjs");

async function loginPost(req, res) {
    //
}

exports.loginGet = (req, res) =>{
    res.render("login/login", {title: "log in", header: "Log in:"});
}


