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
var buscarProducto = '';
var productosFiltrados = [];
var carrito = localStorage.getItem('carrito') ?? undefined;

const pruebas = true;
if (pruebas && carrito == undefined) {
  carrito = carritoEjemplo;
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// --------------------------------------------------------------------------------
btnLimpiarProducto.addEventListener("click", (e) => {
  buscarProducto = '';
  txtBuscarProducto.value = '';
  cargarProductos();
});

// --------------------------------------------------------------------------------
btnBuscarProducto.addEventListener("click", (e) => {
  buscarProducto = txtBuscarProducto.value;
  cargarProductos();
});

// --------------------------------------------------------------------------------
divCarritoVaciar.addEventListener("click", (e) => {
  console.log('divCarritoVaciar');
  localStorage.removeItem('carrito');
});

// --------------------------------------------------------------------------------
divCarritoRealizar.addEventListener("click", (e) => {
  console.log('divCarritoRealizar');
});

// --------------------------------------------------------------------------------

function sinImplementar() {
  Swal.fire({
    title: "CoderShop JS",
    text: "Función no implementada!",
    icon: "info"
  });
  return true;
}

// --------------------------------------------------------------------------------

function cargarCategorias() {
  //console.log('Categorias', categorias.length);
  var contenido = '';
  categorias.forEach(categoria => {
    contenido += `<li><a class="dropdown-item" href="javascript:void(0)" onclick="sinImplementar();">${categoria.nombre}</a></li>`;
  });
  dropdownCategorias.innerHTML = contenido;
}

// --------------------------------------------------------------------------------

function cargarProductos() {
  //console.log('Productos', productos.length);
  divProductos.innerHTML = '<p>No se encontraron Productos.</p>';
  buscarProducto = buscarProducto.toLowerCase();

  if (productos.length > 0) {

    // si tengo algun texto que buscar, filtro
    if (buscarProducto.length > 0) {
      productosFiltrados = productos.filter((item) => item.nombre.toLowerCase().includes(buscarProducto));
    } else {
      // si NO tengo algun texto que buscar, muestro todos
      productosFiltrados = productos;
    }

    // if no tengo productos que mostrar, vuelvo (ya tengo el msj arriba)
    if (productosFiltrados.length == 0) return;

    var contenido = `<div class="row">`;
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

  // console.log('calcularTotales.Carrito', carrito);

  var cantidadProductos = carrito.items.length ?? 0;
  var total = 0;

  carrito.items.forEach(item => {
    total += item.subtotal ?? 0;
  });

  spanCantidad.innerText = cantidadProductos;

  localStorage.setItem('carrito', JSON.stringify(carrito));

  //console.log('calcularTotales.Carrito', carrito);
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

function agregarProducto(id = 0, cantidad = 1) {
  carrito = JSON.parse(localStorage.getItem('carrito')) ?? undefined;

  if ((carrito === undefined) || (carrito.items.length == 0)) {
    carrito = {
      usuario: 0,
      total: 0,
      items: []
    };
  }

  var nuevoProducto;
  const agregar = false;
  carrito.items.forEach(item => {
    if (item.producto == id) {
      item.cantidad += cantidad;
//      item.total
    } else {
      nuevoProducto = {
        cantidad: cantidad,
        producto: id,
        descripcion: productos.find(),
        imagen: "bebidas-quilmes-1l.jpg",
        precio: 1000.00,
        subtotal: 1000.00
      }
      agregar = true;
    }
  });

  if (agregar) carrito.items.push(nuevoProducto);

  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function comprobarCarrito() {
  console.log('comprobarCarrito');
  carrito = JSON.parse(localStorage.getItem('carrito')) ?? undefined;
  var divCarritoTexto = '';
  var divCarritoTotalTexto = '';

  if ((carrito !== undefined) && (carrito.items.length > 0)) {
    divCarritoTexto = `<div class="row">`;
    carrito.items.forEach(item => {
      divCarritoTexto += `
        <div class="d-flex align-items-center">
          <div class="flex-shrink-0">
            <img class="img thumbnail rounded" src="./img/productos/${item.imagen}" alt="${item.descripcion}" height="56">
          </div>
          <div class="flex-grow-1 ms-3">
            ${item.descripcion} <br/>
            ${item.cantidad} unidades a ${item.precio} cada una.
          </div>
        </div>`;
    });
  }

  divCarrito.innerHTML = divCarritoTexto;
  divCarritoTotal.innerHTML = divCarritoTotalTexto;
}
