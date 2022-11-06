"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const houseController = require("../controllers/house.controller");
const router = (0, express_1.default)();
const authMiddleware = require("../middlewares/auth.middleware");
router.get("/sell", authMiddleware, houseController.getMyHouses);
router.get("/", houseController.getAllHouses);
router.get("/:uid", houseController.getHousesByUser);
router.get("/info/:hid", houseController.getHouse);
router.post("/create", authMiddleware, [
    (0, express_validator_1.check)('name').isLength({ min: 10 }).withMessage('Name must be at least 10 chars long')
], houseController.createHouse);
module.exports = router;
