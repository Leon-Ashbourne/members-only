const query = require("../models/query");
const { validationResult, body, matchedData } = require("express-validator");
const homeSetUser = require("./homeController").homeSetUser;


function messageCheckSession(req, res, next) {
    if(req.user) next();
    else res.redirect("/log-in");
}

function messageRender(req, res) {
    res.render("home/messages/add", {title: "add", header: "Add new message: "});
}

exports.messageGet = [ homeSetUser, messageCheckSession, messageRender ];

//validate
const empErr = "must not be empty";
const titleLenErr = "must be less than 30 characters";
const messageLenErr = "must be less than 400 characters";

const validate = [
    body("title").trim()
        .notEmpty().withMessage(`title ${empErr}`)
        .escape()
        .isLength({max: 30}).withMessage(`title ${titleLenErr}`),
    body("message").trim()
        .notEmpty().withMessage(`message ${empErr}`)
        .escape()
        .isLength({max: 400}).withMessage(`message ${messageLenErr}`)
]

async function messageAdd(req, res) {

    const {title, message } = res.locals.userMsgData;
    const user_id = req.user.id;

    await query.userMessagePost(user_id, title, message);
    res.redirect("/");
}

exports.messagePost = [
    validate, 
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).render("home/messages/add", {
                errors: errors.array(),
                title: "add",
                header: "Add new message: "
            });
        }

        const { title, message } = matchedData(req);
        res.locals.userMsgData = {title, message};
        next();
    },
    messageAdd
];