import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../lib/auth';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await hashPassword('admin123');
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: adminPassword,
      name: 'مدیر سیستم',
      role: 'admin',
    },
  });
  console.log('Admin user created');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());