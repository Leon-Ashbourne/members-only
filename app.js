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
        pool: pool
    })
}));
app.use(passport.session());


// routers
app.use("/sign-up", signupRouter);
app.use("/log-in", loginRouter);
app.get("/", (req, res) => {
    res.send("Hello, World!");
})

const PORT = 3000;
app.listen(PORT, (error) => {
    if(error) throw error;

    console.log(`Successfully listening at port: ${PORT}`);
})