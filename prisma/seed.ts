import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });
async function main() {

  // Categories

  const sport = await prisma.category.create({
    data: {
      name: "Sport",
      slug: "sport",
    },
  });

  const prestige = await prisma.category.create({
    data: {
      name: "Prestige",
      slug: "prestige",
    },
  });

  const classic = await prisma.category.create({
    data: {
      name: "Classic",
      slug: "classic",
    },
  });

  // Products

  await prisma.product.createMany({
    data: [
      {
        slug: "carbon-sport-x",
        name: "Carbon Sport X",
        description:
          "Precision engineered sports watch with carbon fiber inspired aesthetics and Swiss automatic movement.",
        price: 399,
        image: "/products/carbon-sport-x.jpg",
        collection: "Sport Collection",
        leftBadge: "Best Seller",
        rightBadge: "Sport",
        movement: "Swiss Automatic",
        caseSize: "42mm",
        waterResistance: "100m",
        crystal: "Sapphire Crystal",
        strap: "Rubber Strap",
        warranty: "2 Years",
        stock: 12,
        categoryId: sport.id,
      },

      {
        slug: "aqua-diver-viii",
        name: "Aqua Diver VIII",
        description:
          "Professional diving timepiece built for adventure with exceptional durability and precision.",
        price: 449,
        image: "/products/aqua-diver-viii.jpg",
        collection: "Sport Collection",
        leftBadge: "New Arrival",
        rightBadge: "Diver",
        movement: "Swiss Automatic",
        caseSize: "44mm",
        waterResistance: "300m",
        crystal: "Sapphire Crystal",
        strap: "Rubber Strap",
        warranty: "2 Years",
        stock: 8,
        categoryId: sport.id,
      },

      {
        slug: "ivory-grand-xi",
        name: "Ivory Grand XI",
        description:
          "Elegant luxury timepiece designed for collectors who appreciate timeless sophistication.",
        price: 699,
        image: "/products/ivory-grand-xi.jpg",
        collection: "Prestige Collection",
        leftBadge: "Luxury",
        rightBadge: "Prestige",
        movement: "Swiss Automatic",
        caseSize: "40mm",
        waterResistance: "50m",
        crystal: "Sapphire Crystal",
        strap: "Italian Leather",
        warranty: "2 Years",
        stock: 5,
        categoryId: prestige.id,
      },

      {
        slug: "noir-skeleton-vii",
        name: "Noir Skeleton VII",
        description:
          "Open-heart skeleton dial showcasing mechanical artistry and exceptional craftsmanship.",
        price: 799,
        image: "/products/noir-skeleton-vii.jpg",
        collection: "Prestige Collection",
        leftBadge: "Premium",
        rightBadge: "Prestige",
        movement: "Swiss Automatic",
        caseSize: "41mm",
        waterResistance: "50m",
        crystal: "Sapphire Crystal",
        strap: "Italian Leather",
        warranty: "2 Years",
        stock: 4,
        categoryId: prestige.id,
      },

      {
        slug: "sport-titan-vi",
        name: "Sport Titan VI",
        description:
          "Titanium construction with lightweight comfort and high-performance engineering.",
        price: 549,
        image: "/products/sport-titan-vi.jpg",
        collection: "Sport Collection",
        leftBadge: "Best Seller",
        rightBadge: "Titanium",
        movement: "Swiss Automatic",
        caseSize: "43mm",
        waterResistance: "200m",
        crystal: "Sapphire Crystal",
        strap: "Rubber Strap",
        warranty: "2 Years",
        stock: 7,
        categoryId: sport.id,
      },

      {
        slug: "classic-heritage-v",
        name: "Classic Heritage V",
        description:
          "Inspired by traditional watchmaking with refined details and timeless proportions.",
        price: 499,
        image: "/products/classic-heritage-v.jpg",
        collection: "Classic Collection",
        leftBadge: "Classic",
        rightBadge: "Heritage",
        movement: "Swiss Automatic",
        caseSize: "39mm",
        waterResistance: "50m",
        crystal: "Sapphire Crystal",
        strap: "Leather Strap",
        warranty: "2 Years",
        stock: 10,
        categoryId: classic.id,
      },
    ],
  });

  console.log("Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });