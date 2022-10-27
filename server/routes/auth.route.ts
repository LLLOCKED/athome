import Router from "express";
const authController = require("../controllers/auth.controller");
const router = Router();
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/signup", authController.postRegistration);
router.post("/login", authController.postLogin);
router.get("/isAuth", authMiddleware, authController.getIsAuth);
router.get("/logout", authMiddleware , authController.logout);

module.exports = router;
