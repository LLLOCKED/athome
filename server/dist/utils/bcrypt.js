"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const saltRounds = 10;
function cryptPassword(password) {
    return bcrypt.hashSync(password, saltRounds);
}
function compareSync(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword);
}
module.exports = { compareSync, cryptPassword };
