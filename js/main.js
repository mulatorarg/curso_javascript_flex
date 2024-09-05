// -----------------------------------------------------------

const categoriasJson = await fetch('./data/categorias.json');
categoriasLst = await categoriasJson.json();

const productosJson = await fetch('./data/productos.json');
productosLst = await productosJson.json();

// -----------------------------------------------------------

cargarCategorias();
cargarProductos();

comprobarCarrito();
