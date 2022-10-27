import { Request, Response } from "express";
const jwt = require("jsonwebtoken");

const bcrypt = require("../utils/bcrypt");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function generateAccessToken(id: string, name: string, email: string) {
  const payload = {
    id,
    name,
    email,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
}

async function postRegistration(req: Request, res: Response) {
  try {
    const { email, password, name } = req.body;

    const existsUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existsUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await prisma.user.create({
      data: {
        email: email,
        password: bcrypt.cryptPassword(password),
        name: name,
      },
    });
    return res.status(200).json({ message: "User created" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Registration error" });
  }
}

async function postLogin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const existsUser = await prisma.user.findUnique({
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
    const token = generateAccessToken(
      existsUser.id,
      existsUser.name,
      existsUser.email
    );
    return res.status(200).json({ message: "Logged in successfully 😊 👌", user: {id: existsUser.id, name: existsUser.name} , token: token});
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Login error" });
  }
}

async function getIsAuth(req: Request, res: Response) {
  try {
    const existsUser = await prisma.user.findUnique({
      where: {
        id: req.user,
      },
    });
    res.status(200).json(existsUser);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error" });
  }
}

async function logout(req: Request, res: Response) {
  try {
    return res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "Successfully logged out 😏 🍀" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error" });
  }
}

module.exports = {
  postRegistration,
  postLogin,
  getIsAuth,
  logout,
};
