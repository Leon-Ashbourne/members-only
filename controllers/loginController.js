const bcrypt = require("bcryptjs");
const homeMessagesGet = require("./homeController").homeMessagesGet;

function loginSetLocalUser(req, res, next) {
    res.locals.currentUser = req.user;
    next()
};

function loginRedirect(req, res) {
    res.render("home/index.ejs", {title: "Home", header: `Welcome back ${req.user.username}`});
}

exports.loginGet = (req, res) =>{
    res.render("login/login", {title: "log in", header: "Log in:"});
}

exports.loginPost = [loginSetLocalUser, homeMessagesGet, loginRedirect ];

