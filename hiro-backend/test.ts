import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Test Users table
  const users = await prisma.user.findMany();
  console.log("Users:", users);

  // Test Quotes table
  const quotes = await prisma.quote.findMany();
  console.log("Quotes:", quotes);

  // Test EquipmentBookings table
  const equipmentBookings = await prisma.equipmentBooking.findMany();
  console.log("EquipmentBookings:", equipmentBookings);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });