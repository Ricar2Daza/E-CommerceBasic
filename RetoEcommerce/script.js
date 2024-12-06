document.addEventListener('DOMContentLoaded', function() {
    // Contador de visitas (almacenado en localStorage)
    let visitCount = localStorage.getItem('visitCount');
    if (visitCount === null) {
        visitCount = 0;
    }
    visitCount++;
    localStorage.setItem('visitCount', visitCount);
    console.log(`Esta página ha sido visitada ${visitCount} veces.`);

    // Carrito de compras simulado
    const carrito = [];

    // Lista de productos artesanales divididos en categorías
    const productos = [
        { categoria: 'Cerámica', id: 1, nombre: 'Jarrón de Cerámica', precio: 25, inventario: 10, imagen: 'images/jarron_ceramica.jpg' },
        { categoria: 'Cerámica', id: 2, nombre: 'Plato Decorativo', precio: 20, inventario: 15, imagen: 'images/plato_decorativo.jpg' },
        { categoria: 'Cerámica', id: 3, nombre: 'Taza de Cerámica', precio: 10, inventario: 30, imagen: 'images/taza_ceramica.jpg' },
        { categoria: 'Cerámica', id: 4, nombre: 'Figura de Cerámica', precio: 15, inventario: 20, imagen: 'images/figura_ceramica.jpg' },
        { categoria: 'Cerámica', id: 5, nombre: 'Maceta de Barro', precio: 18, inventario: 25, imagen: 'images/maceta_barro.jpg' },
        
        { categoria: 'Tejidos', id: 6, nombre: 'Tejido de Lana', precio: 15, inventario: 40, imagen: 'images/tejido_lana.jpg' },
        { categoria: 'Tejidos', id: 7, nombre: 'Bolso Tejido a Mano', precio: 35, inventario: 20, imagen: 'images/bolso_tejido.jpg' },
        { categoria: 'Tejidos', id: 8, nombre: 'Alfombra Tejida', precio: 50, inventario: 10, imagen: 'images/alfombra_tejida.jpg' },
        { categoria: 'Tejidos', id: 9, nombre: 'Bufanda de Lana', precio: 12, inventario: 25, imagen: 'images/bufanda_lana.jpg' },
        { categoria: 'Tejidos', id: 10, nombre: 'Sombrero de Paja', precio: 22, inventario: 15, imagen: 'images/sombrero_paja.jpg' },
        
        { categoria: 'Pinturas', id: 11, nombre: 'Cuadro Pintura Acrílica', precio: 30, inventario: 10, imagen: 'images/cuadro_acrilico.jpg' },
        { categoria: 'Pinturas', id: 12, nombre: 'Cuadro Abstracto', precio: 45, inventario: 5, imagen: 'images/cuadro_abstracto.jpg' },
        { categoria: 'Pinturas', id: 13, nombre: 'Cuadro Paisaje', precio: 35, inventario: 8, imagen: 'images/cuadro_paisaje.jpg' },
        { categoria: 'Pinturas', id: 14, nombre: 'Lienzo Decorativo', precio: 25, inventario: 20, imagen: 'images/lienzo_decorativo.jpg' },
        { categoria: 'Pinturas', id: 15, nombre: 'Retrato Hecho a Mano', precio: 60, inventario: 7, imagen: 'images/retrato_mano.jpg' },
        
        { categoria: 'Joyas', id: 16, nombre: 'Collar de Piedras Naturales', precio: 20, inventario: 30, imagen: 'images/collar_piedras.jpg' },
        { categoria: 'Joyas', id: 17, nombre: 'Pulsera de Cuentas', precio: 12, inventario: 50, imagen: 'images/pulsera_cuentas.jpg' },
        { categoria: 'Joyas', id: 18, nombre: 'Anillo de Plata', precio: 25, inventario: 15, imagen: 'images/anillo_plata.jpg' },
        { categoria: 'Joyas', id: 19, nombre: 'Pendientes de Oro', precio: 40, inventario: 10, imagen: 'images/pendientes_oro.jpg' },
        { categoria: 'Joyas', id: 20, nombre: 'Broche Vintage', precio: 18, inventario: 20, imagen: 'images/broche_vintage.jpg' }
    ];

    // Mostrar productos en la página
    const productosContainer = document.createElement('div');
    productosContainer.classList.add('productos-container');
    productos.forEach(producto => {
        const productoElemento = document.createElement('div');
        productoElemento.classList.add('producto');
        productoElemento.setAttribute('data-categoria', producto.categoria);
        productoElemento.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <p>Inventario: ${producto.inventario} unidades</p>
            <button class="agregar-carrito" data-id="${producto.id}">Agregar al Carrito</button>
        `;
        productosContainer.appendChild(productoElemento);
    });
    document.querySelector('main').appendChild(productosContainer);

    // Barra de búsqueda y navegación
    const navContainer = document.querySelector('.navbar');
    const barraBusqueda = document.createElement('input');
    barraBusqueda.setAttribute('type', 'text');
    barraBusqueda.setAttribute('placeholder', 'Buscar productos...');
    barraBusqueda.classList.add('barra-busqueda');
    navContainer.appendChild(barraBusqueda);

    barraBusqueda.addEventListener('input', function() {
        const valorBusqueda = barraBusqueda.value.toLowerCase();
        document.querySelectorAll('.producto').forEach(productoElemento => {
            const nombreProducto = productoElemento.querySelector('h3').textContent.toLowerCase();
            productoElemento.style.display = nombreProducto.includes(valorBusqueda) ? 'block' : 'none';
        });
    });

    // Filtro por categorías
    const filtroCategorias = document.createElement('select');
    filtroCategorias.classList.add('filtro-categorias');
    const categoriasUnicas = [...new Set(productos.map(producto => producto.categoria))];
    filtroCategorias.innerHTML = `<option value="">Todas las Categorías</option>`;
    categoriasUnicas.forEach(categoria => {
        filtroCategorias.innerHTML += `<option value="${categoria}">${categoria}</option>`;
    });
    navContainer.appendChild(filtroCategorias);

    filtroCategorias.addEventListener('change', function() {
        const categoriaSeleccionada = filtroCategorias.value;
        document.querySelectorAll('.producto').forEach(productoElemento => {
            productoElemento.style.display =
                categoriaSeleccionada === '' || productoElemento.getAttribute('data-categoria') === categoriaSeleccionada
                    ? 'block'
                    : 'none';
        });
    });

    // Agregar producto al carrito
    document.querySelector('.productos-container').addEventListener('click', function(event) {
        if (event.target.classList.contains('agregar-carrito')) {
            const productoId = parseInt(event.target.getAttribute('data-id'));
            const producto = productos.find(p => p.id === productoId);
            if (producto && producto.inventario > 0) {
                agregarProducto(producto);
                producto.inventario--;
                event.target.parentElement.querySelector('p:nth-child(4)').textContent = `Inventario: ${producto.inventario} unidades`;
                actualizarCarritoIcono();
            } else {
                alert('Producto sin inventario disponible.');
            }
        }
    });

    // Función para agregar un producto al carrito
    function agregarProducto(producto) {
        carrito.push(producto);
        console.log('Producto agregado:', producto);
        console.log('Carrito actual:', carrito);
    }

    // Crear el ícono del carrito y mostrar la cantidad de productos
    const carritoIcono = document.createElement('div');
    carritoIcono.classList.add('cart-icon');
    carritoIcono.innerHTML = `
        <span>🛒</span>
        <span class="cart-count">0</span>
    `;
    navContainer.appendChild(carritoIcono);

    carritoIcono.addEventListener('click', function() {
        mostrarCarrito();
    });

    // Mostrar carrito en una nueva pestaña
    function mostrarCarrito() {
        const nuevaVentana = window.open('', '_blank');
        nuevaVentana.document.write(`
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Carrito de Compras</title>
                <link rel="stylesheet" href="styles.css">
            </head>
            <body>
                <div class="checkout-container">
                    <h2 class="checkout-header">Carrito de Compras</h2>
                    ${carrito.map(producto => `
                        <div class="checkout-item">
                            <img src="${producto.imagen}" alt="${producto.nombre}">
                            <div>
                                <h3>${producto.nombre}</h3>
                                <p>Precio: $${producto.precio}</p>
                            </div>
                        </div>
                    `).join('')}
                    <div class="checkout-summary">
                        <p>Total: $${carrito.reduce((total, producto) => total + producto.precio, 0)}</p>
                        <button class="checkout-button" onclick="alert('Redirigiendo a la pasarela de pago...')">Proceder al Pago</button>
                    </div>
                </div>
            </body>
            </html>
        `);
    }

    // Actualizar el conteo de productos en el ícono del carrito
    function actualizarCarritoIcono() {
        const cartCount = carrito.length;
        document.querySelector('.cart-count').textContent = cartCount;
    }
});