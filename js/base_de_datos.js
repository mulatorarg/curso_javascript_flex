const categorias = [
  {
    nombre: "Bebidas"
  },
  {
    nombre: "Panadería"
  },
  {
    nombre: "Limpieza"
  },
];

const productos = [
  {
    id: 1,
    codigo: "7112233445511",
    nombre: "CERVEZA QUILMES 1L",
    categoria: "Bebidas",
    precio: 1000.00,
    imagen: "bebidas-quilmes-1l.jpg",
  },
  {
    id: 2,
    codigo: "7667788991010",
    nombre: "CERVEZA BRAHAMA 1L",
    categoria: "Bebidas",
    precio: 1050.00,
    imagen: "bebidas-brahama-1l.jpg",
  },
  {
    id: 3,
    codigo: "7123456789012",
    nombre: "PAN FRANCES X KG",
    categoria: "Panadería",
    precio: 760.00,
    imagen: "panaderia-pan-frances-kg.jpg",
  },
  {
    id: 4,
    codigo: "7129513571648",
    nombre: "MORTADELA PIAMONTESA X KG",
    categoria: "Fiambrería",
    precio: 3124.00,
    imagen: "fiambreria-mortadela-pia-kg.jpg",
  },
  {
    id: 5,
    codigo: "7357951462810",
    nombre: "DETERGENTE MAGISTRAL X 500ML",
    categoria: "Limpieza",
    precio: 2200.00,
    imagen: "limpieza-magistral-500ml.jpg",
  },
];


// ejemplo de carrito:
const carritoEjemplo =
  {
    usuario: 0,
    total: 1000.00,
    items: [
      {
        cantidad: 1,
        producto: 1,
        descripcion: 'CERVEZA QUILMES 1L',
        imagen: "bebidas-quilmes-1l.jpg",
        precio: 1000.00,
        subtotal: 1000.00
      }
    ]
  };
