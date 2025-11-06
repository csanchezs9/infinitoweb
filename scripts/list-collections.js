const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function listCollections() {
  const collections = await prisma.collection.findMany({
    orderBy: { productsCount: 'desc' }
  });

  console.log('\n=== TODAS LAS COLECCIONES EN DB ===\n');
  collections.forEach(col => {
    console.log(`${col.handle.padEnd(30)} - ${col.title.padEnd(30)} (${col.productsCount} productos)`);
  });

  await prisma.$disconnect();
}

listCollections();
