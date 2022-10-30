"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("../utils/bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
function generateAccessToken(id, name, email) {
    const payload = {
        id,
        name,
        email,
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
}
function postRegistration(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            const { email, password, name } = req.body;
            const existsUser = yield prisma.user.findUnique({
                where: {
                    email: email,
                },
            });
            if (existsUser) {
                return res.status(400).json({ message: "User already exists" });
            }
            const user = yield prisma.user.create({
                data: {
                    email: email,
                    password: bcrypt.cryptPassword(password),
                    name: name,
                },
            });
            return res.status(200).json({ message: "User created" });
        }
        catch (error) {
            console.log(error);
            res.status(400).json({ message: "Registration error" });
        }
    });
}
function postLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            const { email, password } = req.body;
            const existsUser = yield prisma.user.findUnique({
                where: {
                    email: email,
                },
            });
            if (!existsUser) {
                return res.status(400).json({ message: "User not exists" });
            }
            const validPassword = bcrypt.compareSync(password, existsUser.password);
            if (!validPassword) {
                return res.status(400).json({ message: "Password not valid" });
            }
            const token = generateAccessToken(existsUser.id, existsUser.name, existsUser.email);
            return res.status(200).json({ message: "Logged in successfully 😊 👌", user: { id: existsUser.id, name: existsUser.name }, token: token });
        }
        catch (error) {
            console.log(error);
            res.status(400).json({ message: "Login error" });
        }
    });
}
function getIsAuth(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const existsUser = yield prisma.user.findUnique({
                where: {
                    id: req.user,
                },
            });
            res.status(200).json(existsUser);
        }
        catch (error) {
            console.log(error);
            res.status(400).json({ message: "Error" });
        }
    });
}
module.exports = {
    postRegistration,
    postLogin,
    getIsAuth,
};
