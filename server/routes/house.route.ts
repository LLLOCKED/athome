import Router from "express";
import {check} from "express-validator";

const houseController = require("../controllers/house.controller");
const router = Router();
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/sell", authMiddleware, houseController.getMyHouses);
router.get("/", houseController.getAllHouses);
router.get("/:uid", houseController.getHousesByUser);
router.get("/info/:hid", houseController.getHouse);
router.post("/create", authMiddleware,
    [
        check('name').isLength({min: 10}).withMessage('Name must be at least 10 chars long')
    ],
    houseController.createHouse);

module.exports = router;
