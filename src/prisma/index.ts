import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();

export default prismaClient;
