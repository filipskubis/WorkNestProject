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
      email: 'filipskubis@gmail.com',
      name: 'Felipe',
      password: await hash('123123123123K!', 12),
    },
    {
      email: 'admin@gmail.com',
      name: 'Admin',
      password: await hash('123123123123K!', 12),
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
