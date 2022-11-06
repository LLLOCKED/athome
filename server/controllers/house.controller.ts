import {Request, Response} from "express";
const { validationResult } = require('express-validator');

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

async function getHouse(req:Request, res: Response){
    try {
        const house  = await prisma.house.findUnique({
            where:{
                id: req.params.hid
            }
        })
        res.status(200).json({house: house})
    }catch (error) {
        console.log(error);
        res.status(400).json({message: "Error get house"})
    }
}

async function createHouse(req:Request, res:Response){
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }
        const { name, about, generalInfo, address, cost, contact, city, type } = req.body;
        const house = await prisma.house.create({
            data:{
                name: name,
                about: about,
                generalInfo: generalInfo,
                address: address,
                cost: cost,
                contact: contact,
                city:{
                    connect:{
                        value: city
                    }
                },
                type:{
                    connect: {
                        value: type
                    }
                },
                author:{
                    connect:{
                        id: req.user
                    }
                }
            }
        })

        res.status(200).json({message: "House created", houses: house})
    }catch (error) {
        console.log(error);
        res.status(400).json({message: "Error create house"});
    }
}

module.exports = {getMyHouses, getAllHouses, getHousesByUser, createHouse, getHouse}