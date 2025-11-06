const query = require("../models/query");
const dotenv = require("dotenv");
const process = require("node:process");
const { body, matchedData, validationResult } = require("express-validator");
const homeSetUser = require("./homeController").homeSetUser;


dotenv.config();

const { ADMIN_PASSKEY } = process.env;


exports.adminGet = [
    homeSetUser,
    (req, res) => {
        res.render("members/admin", {
            title: "admin",
            header: "We wish you to join as one of admins!"
        });
    }
]

const emptyErr = "must not be empty";
const sanitize = [
    body("adminPasskey").trim()
        .notEmpty().withMessage(`passkey ${emptyErr}`)
        .escape()
]

function adminCheck(req, res, next) {
    const { passkey } = res.locals;

    if(passkey === ADMIN_PASSKEY) {
        next();
        return;
    }
    res.render("members/admin", {
        error: "incorrect passkey",
        title: "admin",
        header: "We wish you to join as one of admins!"
    })
}

async function adminAddPost(req, res) {
    const user_id = req.user.id;
    if(req.user.status) {
        await query.membershipUpdate(user_id, "admin");
    }else {
        await query.membershipPost(user_id, "admin");
    }
    res.redirect("/");
}

exports.adminPost = [
    sanitize,
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).render("members/admin", {
                errors: errors.array(),
                title: "admin",
                header: "We wish you to join as one of admins!"
            });
        }

        const { adminPasskey } = matchedData(req);
        res.locals.passkey = adminPasskey;
        next();
    },
    adminCheck,
    adminAddPost
]