import { prisma } from "@/lib/db";

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function createUser(
  name: string,
  email: string,
  password: string
) {
  return prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
}