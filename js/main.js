
async function leerCategorias() {
  const categoriasJson = await fetch('./data/categorias.json');
  categoriasLst = await categoriasJson.json();
}

async function leerProductos() {
  const productosJson = await fetch('./data/productos.json');
  productosLst = await productosJson.json();
}

leerCategorias();
leerProductos();

setTimeout(() => {

  cargarCategorias();
  cargarProductos();

  comprobarCarrito();

}, 2000);

