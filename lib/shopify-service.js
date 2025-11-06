const fetch = require('node-fetch');

const SHOPIFY_STORE = 'infinitopiercing.com';
const ITEMS_PER_PAGE = 250; // Shopify max

/**
 * Obtiene todas las colecciones disponibles en la tienda
 */
async function obtenerColecciones() {
    try {
        const url = `https://${SHOPIFY_STORE}/collections.json`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error al obtener colecciones: ${response.status}`);
        }

        const data = await response.json();
        return data.collections || [];
    } catch (error) {
        console.error('Error en obtenerColecciones:', error);
        throw error;
    }
}

/**
 * Obtiene todos los productos de una colección específica
 * Usa paginación correcta con Link headers y elimina duplicados
 * @param {string} coleccionHandle - El handle de la colección (ej: 'nariz', 'oreja')
 * @param {number} limit - Límite de productos por página (default: 250)
 */
async function obtenerProductosPorColeccion(coleccionHandle, limit = ITEMS_PER_PAGE) {
    try {
        let productosUnicos = new Map(); // Usar Map para eliminar duplicados por ID
        let url = `https://${SHOPIFY_STORE}/collections/${coleccionHandle}/products.json?limit=${limit}`;
        let pageNum = 1;

        while (url) {
            console.log(`  📄 Página ${pageNum} de "${coleccionHandle}"...`);
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Error al obtener productos: ${response.status}`);
            }

            const data = await response.json();
            const productos = data.products || [];

            if (productos.length === 0) {
                break;
            }

            // Agregar productos únicos al Map (elimina duplicados automáticamente)
            productos.forEach(producto => {
                productosUnicos.set(producto.id, producto);
            });

            // Buscar siguiente página en Link header
            const linkHeader = response.headers.get('Link');
            url = null; // Reset para próxima iteración

            if (linkHeader) {
                // Parsear Link header para encontrar rel="next"
                const links = linkHeader.split(',');
                for (const link of links) {
                    const match = link.match(/<([^>]+)>;\s*rel="next"/);
                    if (match) {
                        url = match[1];
                        pageNum++;
                        break;
                    }
                }
            }

            // Si obtuvimos menos productos que el límite, no hay más páginas
            if (productos.length < limit) {
                break;
            }
        }

        // Convertir Map a Array
        const todosLosProductos = Array.from(productosUnicos.values());
        return todosLosProductos;
    } catch (error) {
        console.error('Error en obtenerProductosPorColeccion:', error);
        throw error;
    }
}

/**
 * Obtiene todos los productos de la tienda sin filtrar por colección
 */
async function obtenerTodosLosProductos(limit = ITEMS_PER_PAGE) {
    try {
        let productosUnicos = new Map();
        let url = `https://${SHOPIFY_STORE}/products.json?limit=${limit}`;
        let pageNum = 1;

        while (url) {
            console.log(`  📄 Página ${pageNum} de productos globales...`);
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Error al obtener productos: ${response.status}`);
            }

            const data = await response.json();
            const productos = data.products || [];

            if (productos.length === 0) {
                break;
            }

            productos.forEach(producto => {
                productosUnicos.set(producto.id, producto);
            });

            const linkHeader = response.headers.get('Link');
            url = null;

            if (linkHeader) {
                const links = linkHeader.split(',');
                for (const link of links) {
                    const match = link.match(/<([^>]+)>;\s*rel="next"/);
                    if (match) {
                        url = match[1];
                        pageNum++;
                        break;
                    }
                }
            }

            if (productos.length < limit) {
                break;
            }
        }

        return Array.from(productosUnicos.values());
    } catch (error) {
        console.error('Error en obtenerTodosLosProductos:', error);
        throw error;
    }
}

module.exports = {
    obtenerColecciones,
    obtenerProductosPorColeccion,
    obtenerTodosLosProductos
};
