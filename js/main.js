async function iniciarPrograma() {
  await leerCategorias();
  await leerProductos();

  cargarCategorias();
  cargarProductos();

  comprobarCarrito();
}

iniciarPrograma();
