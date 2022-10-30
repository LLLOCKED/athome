"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const authController = require("../controllers/auth.controller");
const router = (0, express_1.default)();
const authMiddleware = require("../middlewares/auth.middleware");
router.post("/signup", [
    (0, express_validator_1.check)('email').isEmail().withMessage("Email not valid"),
    (0, express_validator_1.check)('name').isLength({ min: 3 }).withMessage('Name must be at least 3 chars long'),
    (0, express_validator_1.check)('password').isLength({ min: 6 }).withMessage("Password must be at least 6 chars long"),
], authController.postRegistration);
router.post("/login", [
    (0, express_validator_1.check)('email').isEmail().withMessage("Email not valid"),
    (0, express_validator_1.check)('password').isLength({ min: 6 }).withMessage("Password must be at least 6 chars long"),
], authController.postLogin);
router.get("/isAuth", authMiddleware, authController.getIsAuth);
module.exports = router;
