const divProductos = document.getElementById("divProductos");
const dropdownCategorias = document.getElementById("dropdownCategorias");

const divCarrito = document.getElementById("divCarrito");
const divCarritoTotal = document.getElementById("divCarritoTotal");

const divCarritoVolver = document.getElementById("divCarritoVolver");
const divCarritoVaciar = document.getElementById("divCarritoVaciar");
const divCarritoRealizar = document.getElementById("divCarritoRealizar");

const spanCantidad = document.getElementById("spanCantidad");

const txtBuscarProducto = document.getElementById("txtBuscarProducto");
const btnBuscarProducto = document.getElementById("btnBuscarProducto");
const btnLimpiarProducto = document.getElementById("btnLimpiarProducto");

var categoriasLst = [];
var productosLst = [];

var buscarProducto = '';
var productosFiltrados = [];
var carrito = localStorage.getItem('carrito') ?? undefined;

// --------------------------------------------------------------------------------
btnLimpiarProducto.addEventListener("click", (e) => {
  buscarProducto = '';
  txtBuscarProducto.value = '';
  cargarProductos();
});

btnBuscarProducto.addEventListener("click", (e) => {
  buscarProducto = txtBuscarProducto.value;
  cargarProductos();
});

divCarritoVaciar.addEventListener("click", (e) => {
  localStorage.removeItem('carrito');
  spanCantidad.innerText = '';
  carrito = JSON.parse(localStorage.getItem('carrito')) ?? undefined;
  if (carrito === undefined) {
    msjPersonalizado("No tienes productos en tu carrito", "info");
    return;
  };
  msjExitoTop('¡Su carrito fue vaciado correctamente!');
});

divCarritoRealizar.addEventListener("click", (e) => {
  carrito = JSON.parse(localStorage.getItem('carrito')) ?? undefined;
  if (carrito === undefined) {
    msjPersonalizado("No tienes productos en tu carrito", "error");
    return;
  };

  localStorage.removeItem('carrito');
  spanCantidad.innerText = '';

  msjPersonalizado("¡Gracias por su compra!");
});

// --------------------------------------------------------------------------------
function sinImplementar() {
  msjPersonalizado("Función no implementada!", "info");
}

function msjPersonalizado(texto = 'Genial!', icono = 'success', botonOk = "Aceptar", titulo = 'Agusele JS') {
  Swal.fire({
    title: titulo,
    icon: icono,
    text: texto,
    toast: true,
    confirmButtonText: botonOk
  });
}

async function msjExitoTop(texto = 'Genial!') {
  await Swal.fire({
    position: "top-end",
    icon: "success",
    text: texto,
    showConfirmButton: false,
    timer: 1500,
    toast: true,
    confirmButtonText: "Aceptar"
  });
}

async function leerCategorias() {
  const categoriasResp = await fetch('./data/categorias.json');
  const categoriasJson = await categoriasResp.json();
  categoriasLst = categoriasJson;
}

async function leerProductos() {
  const productosResp = await fetch('./data/productos.json');
  const productosJson = await productosResp.json();
  productosLst = productosJson;
}

// --------------------------------------------------------------------------------
function cargarCategorias() {
  let contenido = '';
  categoriasLst.forEach(categoria => {
    contenido += `<li><a class="dropdown-item" href="javascript:void(0)" onclick="sinImplementar();">${categoria.nombre}</a></li>`;
  });
  dropdownCategorias.innerHTML = contenido;
}

function cargarProductos() {
  divProductos.innerHTML = '<p>No se encontraron Productos.</p>';
  buscarProducto = buscarProducto.toLowerCase();

  if (productosLst.length > 0) {

    if (buscarProducto.length > 0) {
      productosFiltrados = productosLst.filter((item) => item.nombre.toLowerCase().includes(buscarProducto));
    } else {
      productosFiltrados = productosLst;
    }

    if (productosFiltrados.length == 0) return;

    let contenido = `<div class="row">`;
    productosFiltrados.forEach(producto => {
      contenido += `
        <div class="col-md-4 col-sm-6 col-xs-12 mb-4">
          <div class="card">
            <img src="./img/productos/${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
            <div class="card-body">
              <div class="card-title">${producto.nombre}</div>
              <div class="card-text">${producto.precio}</div>
            </div>
            <div class="card-footer">
              <button onclick="agregarProducto(${producto.id})" type="button" class="btn btn-sm btn-success">Agregar al carrito</button>
            </div>
          </div>
        </div>`;
    });
    divProductos.innerHTML = contenido;
  }
}

function calcularTotales() {
  carrito = JSON.parse(localStorage.getItem('carrito')) ?? undefined;
  if (carrito === undefined) return;

  let cantidadProductos = carrito.items.length ?? 0;
  let total = 0;

  carrito.items.forEach(item => {
    total += item.subtotal ?? 0;
  });

  spanCantidad.innerText = cantidadProductos;

  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function existeProducto(id) {
  carrito = JSON.parse(localStorage.getItem('carrito')) ?? undefined;
  if (carrito === undefined) return false;
  if (carrito.items.length == 0) return false;

  carrito.items.forEach(item => {
    if (item.producto_id == id) return true;
  });

  return false;
}

async function agregarProducto(id = 0, cantidad = 1) {
  if (isNaN(cantidad)) {
    msjPersonalizado("No se pasó correctamenta la cantidad.", "error");
  }

  const producto = productosLst.find((producto) => producto.id == id);
  if (producto == undefined) {
    msjPersonalizado("Producto no encontrado.", "error");
    return;
  }

  carrito = JSON.parse(localStorage.getItem('carrito')) ?? undefined;
  if ((carrito === undefined) || (carrito.items.length == 0)) {
    carrito = {
      usuario: 0,
      total: 0,
      items: []
    };
  }

  let nuevoItem;
  let agregar = true;
  let positivo = (cantidad > 0);

  carrito.items.forEach((item, index) => {
    if (item.producto == id) {
      agregar = false;
      item.precio = producto.precio;
      item.cantidad += cantidad;
      item.subtotal = item.cantidad * producto.precio;

      if (item.cantidad <= 0) {
        carrito.items.splice(index, 1);
      }
    }
  });

  if (agregar) {
    nuevoItem = {
      cantidad: cantidad,
      producto: id,
      descripcion: producto.nombre,
      imagen: producto.imagen,
      precio: producto.precio,
      subtotal: cantidad * producto.precio
    }
    carrito.items.push(nuevoItem)
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));
  comprobarCarrito();

  if (positivo) {
    msj = "El producto fue sumado a tu carrito!";
  } else {
    msj = "El producto fue descontado de tu carrito!";
  }
  await msjExitoTop(msj);
}

function comprobarCarrito() {
  carrito = JSON.parse(localStorage.getItem('carrito')) ?? undefined;
  let divCarritoTexto = '';
  let divCarritoTotalTexto = '';
  let total = 0;
  let cantidadProductos = '';

  if ((carrito == undefined) || (carrito.items.length == 0)) {
    divCarritoTexto = `<p>Carrito Vacío</p>`;
  } else {
    carrito.items.forEach(item => {
      total += item.subtotal * item.cantidad;
      cantidadProductos = carrito.items.length;
      divCarritoTexto += `
        <div class="d-flex align-items-center mb-2">
          <div class="flex-shrink-0">
            <img class="img thumbnail rounded" src="./img/productos/${item.imagen}" alt="${item.descripcion}" height="56">
          </div>
          <div class="flex-grow-1 ms-3">
            ${item.descripcion} <br/>
            ${item.cantidad} unidades a $ ${total.toFixed(2)} cada una.
            <button onclick="agregarProducto(${item.producto}, -1)" type="button" class="btn btn-sm btn-danger">-</button>
            <button onclick="agregarProducto(${item.producto},  1)" type="button" class="btn btn-sm btn-success">+</button>
          </div>
        </div>`;
    });
    if (total > 0) divCarritoTotalTexto = `<p>Total: $ ${total.toFixed(2)}</p>`;
  }

  divCarrito.innerHTML = divCarritoTexto;
  divCarritoTotal.innerHTML = divCarritoTotalTexto;
  spanCantidad.innerText = cantidadProductos;
}
