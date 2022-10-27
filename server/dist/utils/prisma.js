"use strict";
const { PrismaClientDB } = require('@prisma/client');
const db = new PrismaClientDB();
module.exports = { db };
