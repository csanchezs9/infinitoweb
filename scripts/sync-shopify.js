/**
 * Script de sincronización de productos desde Shopify a base de datos local
 * Ejecutar con: npm run sync
 */

const { PrismaClient } = require('@prisma/client');
const shopifyService = require('../lib/shopify-service');

const prisma = new PrismaClient();

// Configuración de categorías (del código original)
const CATEGORIAS = {
    'parte-cuerpo': {
        nombre: 'Parte del Cuerpo',
        emoji: '👤',
        colecciones: ['oreja', 'nariz', 'ceja', 'bucal', 'corporal']
    },
    'bisuteria': {
        nombre: 'Bisutería',
        emoji: '💍',
        colecciones: ['candongas', 'topos', 'solitarios']
    },
    'tipo-material': {
        nombre: 'Tipo de Material',
        emoji: '⚡',
        colecciones: ['titanio-grado-implante', 'acero', 'titanio', 'plata', 'oro', 'covergold']
    },
    'tipo-joya': {
        nombre: 'Tipo de Joya',
        emoji: '💎',
        colecciones: [
            'aro', 'chispa-nostril', 'labret', 'barra-barbell', 'herradura',
            'bcr', 'barra-pezon-nipple', 'banana-curved-barbell', 'top-microdermal'
        ]
    }
};

async function sincronizarColecciones() {
    console.log('\n🔄 Sincronizando colecciones...\n');

    try {
        const coleccionesShopify = await shopifyService.obtenerColecciones();
        console.log(`✅ Encontradas ${coleccionesShopify.length} colecciones en Shopify\n`);

        let sincronizadas = 0;

        for (const col of coleccionesShopify) {
            // Determinar categoría y emoji
            let categoria = 'otras';
            let emoji = '📦';

            for (const [catKey, catData] of Object.entries(CATEGORIAS)) {
                if (catData.colecciones.includes(col.handle)) {
                    categoria = catKey;
                    emoji = catData.emoji;
                    break;
                }
            }

            await prisma.collection.upsert({
                where: { shopifyId: String(col.id) },
                update: {
                    title: col.title,
                    description: col.body_html || '',
                    productsCount: col.products_count || 0,
                    categoria: categoria,
                    emoji: emoji,
                    updatedAt: new Date()
                },
                create: {
                    shopifyId: String(col.id),
                    handle: col.handle,
                    title: col.title,
                    description: col.body_html || '',
                    productsCount: col.products_count || 0,
                    categoria: categoria,
                    emoji: emoji
                }
            });

            sincronizadas++;
            process.stdout.write(`\r  💾 Guardando colecciones... ${sincronizadas}/${coleccionesShopify.length}`);
        }

        console.log('\n✅ Colecciones sincronizadas exitosamente\n');
        return coleccionesShopify;

    } catch (error) {
        console.error('❌ Error sincronizando colecciones:', error);
        throw error;
    }
}

async function sincronizarProductos() {
    console.log('\n🔄 Sincronizando productos...\n');

    try {
        // Obtener todos los productos de la tienda
        console.log('📦 Obteniendo productos de Shopify...');
        const productosShopify = await shopifyService.obtenerTodosLosProductos();
        console.log(`\n✅ Encontrados ${productosShopify.length} productos en Shopify\n`);

        let sincronizados = 0;

        for (const prod of productosShopify) {
            // Obtener precio de la primera variante
            const variantePrincipal = prod.variants && prod.variants[0];
            const precio = variantePrincipal?.price || '0';
            const compareAtPrice = variantePrincipal?.compare_at_price || null;
            const available = variantePrincipal?.available || false;

            // Crear o actualizar producto
            const producto = await prisma.product.upsert({
                where: { shopifyId: String(prod.id) },
                update: {
                    title: prod.title,
                    description: prod.body_html || '',
                    bodyHtml: prod.body_html || '',
                    price: precio,
                    compareAtPrice: compareAtPrice,
                    available: available,
                    vendor: prod.vendor || '',
                    productType: prod.product_type || '',
                    tags: JSON.stringify(prod.tags || []),
                    updatedAt: new Date()
                },
                create: {
                    shopifyId: String(prod.id),
                    handle: prod.handle,
                    title: prod.title,
                    description: prod.body_html || '',
                    bodyHtml: prod.body_html || '',
                    price: precio,
                    compareAtPrice: compareAtPrice,
                    available: available,
                    vendor: prod.vendor || '',
                    productType: prod.product_type || '',
                    tags: JSON.stringify(prod.tags || [])
                }
            });

            // Sincronizar imágenes
            if (prod.images && prod.images.length > 0) {
                // Eliminar imágenes existentes
                await prisma.productImage.deleteMany({
                    where: { productId: producto.id }
                });

                // Crear nuevas imágenes
                for (let i = 0; i < prod.images.length; i++) {
                    const img = prod.images[i];
                    await prisma.productImage.create({
                        data: {
                            productId: producto.id,
                            src: img.src,
                            alt: img.alt || prod.title,
                            position: i
                        }
                    });
                }
            }

            // Sincronizar variantes
            if (prod.variants && prod.variants.length > 0) {
                // Eliminar variantes existentes
                await prisma.productVariant.deleteMany({
                    where: { productId: producto.id }
                });

                // Crear nuevas variantes
                for (const variant of prod.variants) {
                    await prisma.productVariant.create({
                        data: {
                            productId: producto.id,
                            shopifyId: String(variant.id),
                            title: variant.title,
                            price: variant.price,
                            compareAtPrice: variant.compare_at_price || null,
                            sku: variant.sku || null,
                            barcode: variant.barcode || null,
                            available: variant.available || false,
                            inventoryQty: variant.inventory_quantity || 0,
                            weight: variant.weight ? parseFloat(variant.weight) : null,
                            weightUnit: variant.weight_unit || null,
                            requiresShipping: variant.requires_shipping !== false
                        }
                    });
                }
            }

            sincronizados++;
            process.stdout.write(`\r  💾 Guardando productos... ${sincronizados}/${productosShopify.length}`);
        }

        console.log('\n✅ Productos sincronizados exitosamente\n');

    } catch (error) {
        console.error('❌ Error sincronizando productos:', error);
        throw error;
    }
}

async function main() {
    console.log('\n╔═══════════════════════════════════════════════════════╗');
    console.log('║                                                       ║');
    console.log('║  ∞  INFINITO PIERCING - SINCRONIZACIÓN SHOPIFY       ║');
    console.log('║                                                       ║');
    console.log('╚═══════════════════════════════════════════════════════╝');

    try {
        const inicio = Date.now();

        // Sincronizar colecciones primero
        await sincronizarColecciones();

        // Sincronizar productos
        await sincronizarProductos();

        const duracion = ((Date.now() - inicio) / 1000).toFixed(2);

        // Mostrar estadísticas finales
        const totalColecciones = await prisma.collection.count();
        const totalProductos = await prisma.product.count();
        const totalImagenes = await prisma.productImage.count();
        const totalVariantes = await prisma.productVariant.count();

        console.log('\n╔═══════════════════════════════════════════════════════╗');
        console.log('║                   SINCRONIZACIÓN COMPLETA            ║');
        console.log('╚═══════════════════════════════════════════════════════╝\n');
        console.log(`  📊 Estadísticas:`);
        console.log(`     • Colecciones: ${totalColecciones}`);
        console.log(`     • Productos: ${totalProductos}`);
        console.log(`     • Imágenes: ${totalImagenes}`);
        console.log(`     • Variantes: ${totalVariantes}`);
        console.log(`     • Tiempo: ${duracion}s\n`);

    } catch (error) {
        console.error('\n❌ Error fatal:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

// Ejecutar
main();
