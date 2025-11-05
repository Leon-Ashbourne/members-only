
function homeSetSetUser(req, res, next) {
    if(req.user) {
        res.locals.currentUser = req.user;
        res.username = req.user.username;
    }
    next();
}

function homeRender(req, res) {
    const user = res.locals.username || "guest";
    res.render("home/index.ejs", {title: "members-only", header: `Welcome back ${user}`});
}

exports.homepageGet = [ homeSetSetUser, homeRender ];