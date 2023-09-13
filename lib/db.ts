import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// globalThis.prisma giúp tránh trường hợp mỗi khi thay đổi 1 dòng code thì 1 prisma client được tạo
export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
