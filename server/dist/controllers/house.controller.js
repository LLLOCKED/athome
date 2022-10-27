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
module.exports = { getMyHouses, getAllHouses, getHousesByUser };
