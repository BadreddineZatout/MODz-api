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

  await prisma.cancelReason.createMany({
    data: [
      { reason: 'Client is not serious', cancelBy: 'EMPLOYEE' },
      { reason: 'Client requested the cancellation', cancelBy: 'EMPLOYEE' },
      {
        reason: 'Client does not have sufficient funds',
        cancelBy: 'EMPLOYEE',
      },
      { reason: 'Incorrect order details', cancelBy: 'EMPLOYEE' },
      { reason: 'Delayed payment', cancelBy: 'EMPLOYEE' },
      { reason: 'Material unavailability', cancelBy: 'EMPLOYEE' },
      { reason: 'Project cancellation', cancelBy: 'EMPLOYEE' },
      { reason: 'Regulatory issues', cancelBy: 'EMPLOYEE' },
      {
        reason: 'Technical issues with the online system',
        cancelBy: 'EMPLOYEE',
      },
      { reason: 'Supplier or subcontractor issues', cancelBy: 'EMPLOYEE' },
      { reason: "I can't achieve this work", cancelBy: 'EMPLOYEE' },
      { reason: 'The employee asked me to cancel', cancelBy: 'CLIENT' },
      { reason: 'The project was canceled', cancelBy: 'CLIENT' },
      { reason: 'I made an error in the request', cancelBy: 'CLIENT' },
      { reason: 'I no longer need the workers', cancelBy: 'CLIENT' },
      { reason: 'Budget issues occurred', cancelBy: 'CLIENT' },
      {
        reason: 'Unsatisfied with the recruitment process',
        cancelBy: 'CLIENT',
      },
      { reason: 'Change of plans', cancelBy: 'CLIENT' },
    ],
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
