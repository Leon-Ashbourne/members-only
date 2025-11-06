const Router = require("express").Router;
const memberController = require("../controllers/memberController");

const memberRouter = Router();

memberRouter.get("/", memberController.membersGet);
memberRouter.post("/", memberController.membersPost);

module.exports = memberRouter;