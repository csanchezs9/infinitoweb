const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkProducts() {
  console.log('\n=== VERIFICANDO PRODUCTOS ===\n');

  // Ver un producto de ejemplo
  const producto = await prisma.product.findFirst({
    include: { images: true }
  });

  console.log('EJEMPLO DE PRODUCTO:');
  console.log('Handle:', producto.handle);
  console.log('Title:', producto.title);
  console.log('Tags:', producto.tags);
  console.log('ProductType:', producto.productType);
  console.log('Vendor:', producto.vendor);
  console.log('Tiene imágenes:', producto.images.length);

  console.log('\n=== COLECCIONES ===\n');

  const colecciones = await prisma.collection.findMany({
    where: {
      handle: {
        in: ['oreja', 'nariz', 'bucal']
      }
    }
  });

  colecciones.forEach(col => {
    console.log(`- ${col.handle}: ${col.title} (${col.productsCount} productos según shopify)`);
  });

  await prisma.$disconnect();
}

checkProducts();
