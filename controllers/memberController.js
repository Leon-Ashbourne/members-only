const query = require("../models/query");
const dotenv = require("dotenv");
const process = require("node:process");
const { body, matchedData, validationResult } = require("express-validator");


dotenv.config();
const { MEMBER_PASSKEY } = process.env;

exports.membersGet = (req, res) => {
    res.render("members/joinclub", {title: "club", header: "We wish you to join our club!"});
}

//validation, sanitization
const emptyErr = "must not be empty";
const sanitize = [
    body("passkey").trim()
        .notEmpty().withMessage(`passkey ${emptyErr}`)
        .escape()
]

function memberCheck(req, res, next) {
    const { passkey } = res.locals;

    if(passkey === MEMBER_PASSKEY) {
        next();
    }
    res.render("members/joinclub", {
        msg: "incorrect passkey"
    })
}

async function membersAddPost(req, res) {
    const user_id = req.user.id;

    await query.membershipPost(user_id, "member");
    res.redirect("/");

}

exports.membersPost = [
    sanitize,
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(400).render("members/joinclub", {
                errors: errors.array(),
                title: "club",
                header: "We wish you to join our club!"
            });
            next("erorr");
        }

        const { passkey } = matchedData(req);
        res.locals.passkey = passkey;
        next();
    },
    memberCheck,
    membersAddPost
]