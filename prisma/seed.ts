const { PrismaClient } = require('../src/generated/prisma');
const bcrypt = require('bcryptjs');

const db = new PrismaClient();

async function main() {
  const username = 'admin';
  const password = 'password'; // Change this in production!

  const existingAdmin = await db.admin.findUnique({
    where: { username },
  });

  if (existingAdmin) {
    console.log('Admin user already exists.');
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.admin.create({
    data: {
      username: username,
      password: hashedPassword,
    },
  });

  console.log(`Admin user '${username}' created with password '${password}'.`);
  console.log('Please change the default password in a production environment.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });



