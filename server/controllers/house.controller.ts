import {Request, Response} from "express";

const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

async function getMyHouses(req: Request, res: Response) {
    try {
        const houses = await prisma.house.findMany({
            where: {
                authorId: req.user,
            },
            select: {
                id: true,
                name: true,
                generalInfo: true,
                city: {
                    select:{
                        name: true
                    }
                },
                type: {
                    select:{
                        name: true
                    }
                },
                address: true,
                cost: true
            }
        });
        if(houses.length === 0){
            return res.status(200).json({message: "You don't have houses"})
        }

        res.status(200).json({houses: houses})
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Get houses error"});
    }
}

async function getAllHouses(req: Request, res: Response) {
    try {
        const houses = await prisma.house.findMany({
            select: {
                id: true,
                name: true,
                generalInfo: true,
                city: {
                    select:{
                        name: true
                    }
                },
                type: {
                    select:{
                        name: true
                    }
                },
                address: true,
                cost: true
            }
        });

        res.status(200).json({houses: houses})
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Get houses error"});
    }
}

async function getHousesByUser(req: Request, res: Response) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.params.uid
            }
        })
        if(!user){
            return res.status(400).json({message: "User not found"})
        }

        const houses = await prisma.house.findMany({
            where:{
                authorId: user.id
            },
            select: {
                id: true,
                name: true,
                generalInfo: true,
                city: {
                    select:{
                        name: true
                    }
                },
                type: {
                    select:{
                        name: true
                    }
                },
                address: true,
                cost: true
            }
        });

        if(houses.length === 0){
            return res.status(200).json({message: "User don't have houses"})
        }

        res.status(200).json({houses: houses})
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Get houses error"});
    }
}

module.exports = {getMyHouses, getAllHouses, getHousesByUser}