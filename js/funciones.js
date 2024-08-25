import { carritoEjemplo, categorias, productos } from "./base_de_datos.js";

const divProductos = document.getElementById("divProductos");
const dropdownCategorias = document.getElementById("dropdownCategorias");

const spanCantidad = document.getElementById("spanCantidad");

const txtBuscarProducto = document.getElementById("txtBuscarProducto");
const btnBuscarProducto = document.getElementById("btnBuscarProducto");
const btnLimpiarProducto = document.getElementById("btnLimpiarProducto");
var buscarProducto = localStorage.getItem('buscarProducto') ?? '';
var carrito = localStorage.getItem('carrito') ?? undefined;

const pruebas = false;
if (pruebas) carrito = carritoEjemplo;

// --------------------------------------------------------------------------------
btnLimpiarProducto.addEventListener("click", () => {
  localStorage.setItem(buscarProducto, '');
  buscarProducto = texto;
  txtBuscarProducto.value = texto;
  cargarProductos();
});

// --------------------------------------------------------------------------------
btnBuscarProducto.addEventListener("click", () => {
  const texto = txtBuscarProducto.value;
  localStorage.setItem(buscarProducto, texto);
  buscarProducto = texto;
  cargarProductos();
});

// --------------------------------------------------------------------------------

export function cargarCategorias() {
  var contenido = '';
  categorias.forEach(categoria => {
    contenido += `<li><a class="dropdown-item" href="#">${categoria.nombre}</a></li>`;
  });
  dropdownCategorias.innerHTML = contenido;
}

// --------------------------------------------------------------------------------

export function cargarProductos() {
  //console.log('Productos', productos.length);
  divProductos.innerHTML = 'No se encontraron Productos.';
  //console.log(buscarProducto);

  if (productos.length > 0) {

    var contenido = `<div class="row">`;
    productos.forEach(producto => {
      contenido += `
        <div class="col-md-4 col-sm-6 col-xs-12 mb-4">
          <div class="card">
            <img src="./img/productos/${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
            <div class="card-body">
              <div class="card-title">${producto.nombre}</div>
              <div class="card-text">${producto.precio}</div>
            </div>
          </div>
        </div>`;
    });
    divProductos.innerHTML = contenido;
  }

}

export function calcularTotales() {
  if(carrito === undefined) return;

  var cantidadProductos = carrito.items.length ?? 0;
  var total = 0;

  carrito.items.forEach(item => {
    total += item.subtotal ?? 0;
  });

  spanCantidad.innerText = cantidadProductos;

}


function existeProducto() {

}




