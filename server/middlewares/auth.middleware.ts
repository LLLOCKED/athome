import { NextFunction, Request, Response } from "express";
const jwt = require("jsonwebtoken");

module.exports = function (req: Request, res: Response, next: NextFunction) {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(403).json({ message: "User not auth" });
    }
    const decodeData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodeData.id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "User not auth" });
  }
};
