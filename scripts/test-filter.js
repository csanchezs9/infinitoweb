const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testFilter() {
  console.log('\n=== TEST DE FILTRADO ===\n');

  const productosOreja = await prisma.product.findMany({
    where: {
      tags: { contains: 'Oreja' }
    },
    take: 5
  });

  console.log(`Productos con "Oreja" en tags: ${productosOreja.length}`);
  productosOreja.slice(0, 3).forEach(p => console.log(`  - ${p.title}`));

  const productosNariz = await prisma.product.findMany({
    where: {
      tags: { contains: 'Nariz' }
    },
    take: 5
  });

  console.log(`\nProductos con "Nariz" en tags: ${productosNariz.length}`);
  productosNariz.slice(0, 3).forEach(p => console.log(`  - ${p.title}`));

  await prisma.$disconnect();
}

testFilter();
