import { Hash } from "crypto";

const bcrypt = require("bcrypt");
const saltRounds = 10;

function cryptPassword(password: string) {
    return bcrypt.hashSync(password, saltRounds);
}

function compareSync(password: string, hashPassword: string) {
    return bcrypt.compareSync(password, hashPassword);
}

module.exports = {compareSync, cryptPassword}

