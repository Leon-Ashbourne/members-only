const bcrypt = require("bcryptjs");
const { validationResult, matchedData, body } = require("express-validator");
const query = require("../models/query");


const empErr = "must not be empty";
const userLenErr = "must be between 5 and 10";
const passLenErr = "must be between 5 and 8";
const matchErr = "must match the password!";

const validate = [
    body("username").trim()
        .notEmpty().withMessage(`username ${empErr}`)
        .escape()
        .isLength({min:5, max: 10}).withMessage(`username's length ${userLenErr}`),

    body("email").trim()
        .notEmpty().withMessage(`Email ${empErr}`)
        .escape()
        .isEmail().withMessage(`please enter appropraite email`)
        .custom( async (val) => {

            const rows = await query.emailGet(val);
            const emailExists = rows[0];
            if(!!emailExists) return false;

            return true;
        }).withMessage("email already exists"),
    
    body("password").trim()
        .notEmpty().withMessage(`password ${empErr}`)
        .escape()
        .isLength({min: 5, max: 8}).withMessage(`password's length ${passLenErr}`)
        .bail(),

    body("confirm-password").trim()
        .notEmpty().withMessage(`Email ${empErr}`)
        .custom((value, {req}) => {
            const { password } = req.body;
            if(value !== password) return false;

            return true;
        }).withMessage(`${matchErr}`)
];

exports.signupPost = [
    validate,
    (req, res, next) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(400).render("signUp/signup", {
                errors: errors.array(),
                title: "Sign up",
                header: "Sign up:"
            });
            next("error from signup");
        }

        next()

    }, 
    async (req, res) => {

        const { username, password, email } = matchedData(req);
        const hashedPassword = await bcrypt.hash(password, 12);

        await query.userSignupPost(username, email, hashedPassword);
        res.redirect("/");
    }
]


exports.signupGet = (req, res) => {
    res.render("signUp/signup", {title: "sign up", header: "Sign up:"});
}

