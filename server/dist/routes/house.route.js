"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const houseController = require("../controllers/house.controller");
const router = (0, express_1.default)();
const authMiddleware = require("../middlewares/auth.middleware");
router.get("/sell", authMiddleware, houseController.getMyHouses);
router.get("/", houseController.getAllHouses);
router.get("/:uid", houseController.getHousesByUser);
module.exports = router;
