"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
    var _a;
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: "User not auth" });
        }
        const decodeData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodeData.id;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(403).json({ message: "User not auth" });
    }
};
