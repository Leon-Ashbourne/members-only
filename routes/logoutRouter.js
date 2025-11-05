const { Router } = require("express");
const logoutController = require("../controllers/logoutController");

const logoutRouter = Router();

logoutRouter.post("/", logoutController.logoutPost);

module.exports = logoutRouter;