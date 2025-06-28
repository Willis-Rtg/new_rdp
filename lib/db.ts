import { PrismaClient } from "@prisma/client";

// declare global {
//   var prisma: PrismaClient;
// }

const db = new PrismaClient();

// if (typeof window === "undefined") {
//   if (process.env.NODE_ENV === "production") {
//     db = new PrismaClient();
//   } else {
//     if (!global.prisma) {
//       global.prisma = new PrismaClient();
//     }

//     db = global.prisma;
//   }
// }

export default db;
