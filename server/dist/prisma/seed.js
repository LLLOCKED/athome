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
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Connect the client
        yield prisma.$connect();
        console.log("Prisma connected");
        // const createType = await prisma.city.create({
        //     data: {
        //         value: "lviv",
        //         name: "Lviv"
        //     }
        // })
        // const type = await prisma.city.findUnique({
        //     where: {
        //         name: "Lviv"
        //     }
        // })
        const user = yield prisma.user.create({
            data: {
                email: "2@ukr.net",
                name: "Vlad",
                password: "$2b$10$hmMZsFOpv3397jdX7oUtc.p28j6T066yH.6WYZp9AEqdc7wtFRVS2",
                house: {
                    create: [
                        {
                            name: "House 1",
                            about: "Good house",
                            generalInfo: [],
                            address: 'Sumy',
                            cost: 2000.00,
                            contact: "38099002211",
                            city: {
                                connect: {
                                    value: "lviv"
                                }
                            },
                            type: {
                                connect: {
                                    name: "Squmir House"
                                },
                            },
                        },
                        {
                            name: "House 2",
                            about: "Good house",
                            generalInfo: [],
                            address: 'Sumy',
                            cost: 3000.00,
                            contact: "38099002211",
                            city: {
                                connect: {
                                    value: "lviv"
                                }
                            },
                            type: {
                                connect: {
                                    id: '635a349c27ec4b0b981b908f'
                                },
                            },
                        },
                    ],
                },
            },
        });
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
