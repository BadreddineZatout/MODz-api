import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.socialMedia.createMany({
    data: [
      { name: 'Facebook' },
      { name: 'Instagram' },
      { name: 'Twitter' },
      { name: 'TikTok' },
      { name: 'Whatsapp' },
      { name: 'Telegram' },
      { name: 'SnapChat' },
    ],
  });

  await prisma.pack.create({
    data: { name: 'Free' },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
