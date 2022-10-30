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
const { validationResult } = require('express-validator');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
function getMyHouses(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const houses = yield prisma.house.findMany({
                where: {
                    authorId: req.user,
                },
                select: {
                    id: true,
                    name: true,
                    generalInfo: true,
                    city: {
                        select: {
                            name: true
                        }
                    },
                    type: {
                        select: {
                            name: true
                        }
                    },
                    address: true,
                    cost: true
                }
            });
            if (houses.length === 0) {
                return res.status(200).json({ message: "You don't have houses" });
            }
            res.status(200).json({ houses: houses });
        }
        catch (error) {
            console.log(error);
            res.status(400).json({ message: "Get houses error" });
        }
    });
}
function getAllHouses(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const houses = yield prisma.house.findMany({
                select: {
                    id: true,
                    name: true,
                    generalInfo: true,
                    city: {
                        select: {
                            name: true
                        }
                    },
                    type: {
                        select: {
                            name: true
                        }
                    },
                    address: true,
                    cost: true
                }
            });
            res.status(200).json({ houses: houses });
        }
        catch (error) {
            console.log(error);
            res.status(400).json({ message: "Get houses error" });
        }
    });
}
function getHousesByUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prisma.user.findUnique({
                where: {
                    id: req.params.uid
                }
            });
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }
            const houses = yield prisma.house.findMany({
                where: {
                    authorId: user.id
                },
                select: {
                    id: true,
                    name: true,
                    generalInfo: true,
                    city: {
                        select: {
                            name: true
                        }
                    },
                    type: {
                        select: {
                            name: true
                        }
                    },
                    address: true,
                    cost: true
                }
            });
            if (houses.length === 0) {
                return res.status(200).json({ message: "User don't have houses" });
            }
            res.status(200).json({ houses: houses });
        }
        catch (error) {
            console.log(error);
            res.status(400).json({ message: "Get houses error" });
        }
    });
}
function createHouse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            const { name, about, generalInfo, address, cost, contact, city, type } = req.body;
            const house = yield prisma.house.create({
                data: {
                    name: name,
                    about: about,
                    generalInfo: generalInfo,
                    address: address,
                    cost: cost,
                    contact: contact,
                    city: {
                        connect: {
                            value: city
                        }
                    },
                    type: {
                        connect: {
                            value: type
                        }
                    },
                    author: {
                        connect: {
                            id: req.user
                        }
                    }
                }
            });
            res.status(200).json({ message: "House created", houses: house });
        }
        catch (error) {
            console.log(error);
            res.status(400).json({ message: "Error create house" });
        }
    });
}
module.exports = { getMyHouses, getAllHouses, getHousesByUser, createHouse };
