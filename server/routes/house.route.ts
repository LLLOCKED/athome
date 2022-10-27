import Router from "express";
const houseController = require("../controllers/house.controller");
const router = Router();
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/sell", authMiddleware, houseController.getMyHouses );
router.get("/", houseController.getAllHouses );
router.get("/:uid", houseController.getHousesByUser );

module.exports = router;
