import Router from "express";
import {check} from "express-validator";
const authController = require("../controllers/auth.controller");
const router = Router();
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/signup",
    [
        check('email').isEmail().withMessage("Email not valid"),
        check('name').isLength({min: 3}).withMessage('Name must be at least 3 chars long'),
        check('password').isLength({ min: 6 }).withMessage("Password must be at least 6 chars long"),
    ],
    authController.postRegistration);
router.post("/login",
    [
        check('email').isEmail().withMessage("Email not valid"),
        check('password').isLength({ min: 6 }).withMessage("Password must be at least 6 chars long"),
    ],
    authController.postLogin);
router.get("/isAuth", authMiddleware, authController.getIsAuth);

module.exports = router;
