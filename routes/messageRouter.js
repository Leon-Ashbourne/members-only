const Router = require("express").Router;
const messageController = require("../controllers/messageController");

const messageRouter = Router();

messageRouter.get("/", messageController.messageGet);
messageRouter.post("/", messageController.messagePost);

module.exports = messageRouter;