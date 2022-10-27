const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient();

async function main() {
    // Connect the client
    await prisma.$connect();
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

    const user = await prisma.user.create({
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
                        city:{
                            connect:{
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
                        city:{
                            connect:{
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
    })
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
