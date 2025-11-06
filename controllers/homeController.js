const query = require("../models/query");


function homeSetUser(req, res, next) {
    if(req.user) {
        res.locals.currentUser = req.user;
    }
    next();
}

async function homeMessagesGet(req, res, next) {
    const messages = await query.messagesGet();
    res.locals.messages = messages;
    next();
}

function homeRender(req, res) {
    const user = req.user ? req.user.username: "guest";
    res.render("home/index.ejs", {title: "members-only", header: `Welcome back ${user}`});
}

const homepageGet = [ homeSetUser, homeMessagesGet, homeRender ];

module.exports = {
    homeMessagesGet,
    homepageGet,
    homeSetUser
}