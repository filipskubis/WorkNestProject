/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Delete all existing users
  await prisma.user.deleteMany({});

  // Create sample users
  const users = [
    {
      email: 'user1@example.com',
      password: await hash('password123', 12),
    },
    {
      email: 'user2@example.com',
      password: await hash('password123', 12),
    },
    {
      email: 'admin@example.com',
      password: await hash('admin123', 12),
    },
  ];

  // Insert users into the database
  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
    console.log(`Created user: ${user.email}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
