const Router = require("express").Router;
const deleteController = require("../controllers/deleteController");

const deleteRouter = Router();

deleteRouter.post("/", deleteController.deletePost);

module.exports = deleteRouter;