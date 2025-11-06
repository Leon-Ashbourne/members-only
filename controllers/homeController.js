const query = require("../models/query");


function homeSetSetUser(req, res, next) {
    if(req.user) {
        res.locals.currentUser = req.user;
        res.locals.username = req.user.username;
    }
    next();
}

async function homeMessagesGet(req, res, next) {
    const messages = await query.messagesGet();
    res.locals.messages = messages;
    next();
}

function homeRender(req, res) {
    const user = res.locals.username || "guest";
    res.render("home/index.ejs", {title: "members-only", header: `Welcome back ${user}`});
}

const homepageGet = [ homeSetSetUser, homeMessagesGet, homeRender ];

module.exports = {
    homeMessagesGet,
    homepageGet
}