"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const JWTStrategy = passport_jwt_1.default.Strategy;
const ExtractJWT = passport_jwt_1.default.ExtractJwt;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
