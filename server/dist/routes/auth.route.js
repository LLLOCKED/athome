"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController = require("../controllers/auth.controller");
const router = (0, express_1.default)();
const authMiddleware = require("../middlewares/auth.middleware");
router.post("/signup", authController.postRegistration);
router.post("/login", authController.postLogin);
router.get("/isAuth", authMiddleware, authController.getIsAuth);
router.get("/logout", authMiddleware, authController.logout);
module.exports = router;
