const express = require("express");
const session = require("express-session");
const signupRouter = require("./routes/signupRouter");
const path = require("node:path");
const loginRouter = require("./routes/loginRouter");
const process = require("node:process");
const dotenv = require("dotenv");
const passport = require("./passport/passport");
const sessionStore = require("connect-pg-simple")(session);
const pool = require("./models/pool");
const logoutRouter = require("./routes/logoutRouter");
const homeRouter = require("./routes/homeRouter");
const messageRouter = require("./routes/messageRouter");
const memberRouter = require("./routes/memberRouter");
const adminRouter = require("./routes/memberRouter.admin");
const deleteRouter = require("./routes/deleteRouter");


const app = express();
dotenv.config();

//views 
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//assets
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({extended: true}));

//sessions
const { SESSION_SECRET } = process.env;
app.use(session({
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000*60*60*24*31
    },
    resave: false,
    saveUninitialized: false,
    store: new sessionStore({
        pool: pool,
        createTableIfMissing: true
    })
}));
app.use(passport.session());


// routers
app.use("/sign-up", signupRouter);
app.use("/log-in", loginRouter);
app.use("/log-out", (req, res, next) => {
    req.method = "post";
    next();
}, logoutRouter);
app.use("/add-message", messageRouter);
app.use("/member", memberRouter);
app.use("/member-admin", adminRouter);
app.use("/delete", deleteRouter);
app.use("/", homeRouter);

const PORT = 3000;
app.listen(PORT, (error) => {
    if(error) throw error;

    console.log(`Successfully listening at port: ${PORT}`);
})