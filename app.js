const express = require("express");
const session = require("express-session");
const signupRouter = require("./routes/signupRouter");
const path = require("node:path");
const loginRouter = require("./routes/loginRouter");
const process = require("node:process");
const dotenv = require("dotenv");

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
        maxAge: 1000*60*60*24*31,
        key: "checking"
    },
    resave: false,
    saveUninitialized: false
}))

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