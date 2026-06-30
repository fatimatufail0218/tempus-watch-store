import { prisma } from "../db";

export async function getProductById(id: number) {
  return prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
}

export async function getAllProducts() {
  return prisma.product.findMany({
    include: {
      category: true,
    },
    orderBy: {
      id: "asc",
    },
  });
}