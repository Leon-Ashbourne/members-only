const { Router } = require("express");
const adminController = require("../controllers/memberController.admin");

const adminRouter = Router();

adminRouter.get("/", adminController.adminGet);
adminRouter.post("/", adminController.adminPost);

module.exports = adminRouter;