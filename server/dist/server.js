"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoute = require("./routes/auth.route");
const houseRoute = require("./routes/house.route");
const body_parser_1 = __importDefault(require("body-parser"));
var cookieParser = require('cookie-parser');
var cors = require("cors");
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use(cookieParser());
app.use(body_parser_1.default.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use("/api/auth", authRoute);
app.use("/api/house", houseRoute);
// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));
