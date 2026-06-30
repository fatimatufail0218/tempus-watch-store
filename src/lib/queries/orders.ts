import { prisma } from "../db";

export async function getOrdersByUserId(userId: number) {
  return prisma.order.findMany({
    where: { userId },
    include: {
      items: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}