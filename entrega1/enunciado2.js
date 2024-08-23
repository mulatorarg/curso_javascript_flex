console.log("Enunciado 2 Cargado.");
document.getElementById('btnJugar').addEventListener('click', function () {
  console.log("Se hizo click sobre el boton del enunciado 2: Jugar 'Piedra, Papel o Tijera'");
  jugarPiedraPapelTijera();
});

/*
--------------------------------------------------------------------------------------------------------------------------------
Piedra, Papel o Tijera
*/

// ---------FUNCIONES ----------------------------------------------------------------------------------------------------------

function getUserChoice() {
  // Solicito al usuario, su opcion:
  let eleccion = prompt("Introduce tu elección (piedra, papel o tijera):");
  console.log(eleccion);

  if (eleccion == null || eleccion == undefined || eleccion.length < 1) {
    console.error("getUserData", "La eleccion del individuo no tiene un valor correcto: " + eleccion);
    alert("No ha ingresado un valor correcto.");
    return null;
  }

  eleccion = eleccion.toLowerCase();

  switch (eleccion) {
    case 'piedra':
      break;
    case 'papel':
      break;
    case 'tijera':
      break;
    default:
      eleccion = null;
      break;
  }

  return eleccion;
}

function determineWinner(eleccion_usuario = '') {

  const eleccion_nro = Math.floor(Math.random() * 3);
  let eleccion_pc = '';
  let resultado = 'la PC es la Ganadora';

  switch (eleccion_nro) {
    case 0:
      eleccion_pc = 'piedra';
      break;
    case 1:
      eleccion_pc = 'papel';
      break;
    case 2:
      eleccion_pc = 'tijera';
      break;
    default:
      eleccion_pc = '';
      break;
  }

  console.log('eleccion_usuario', eleccion_usuario);
  console.log('eleccion_pc', eleccion_pc);

  if (eleccion_usuario == 'piedra' && eleccion_pc == 'piedra') {
    resultado = 'es Empate';
  }

  if (eleccion_usuario == 'papel' && eleccion_pc == 'papel') {
    resultado = 'es Empate';
  }

  if (eleccion_usuario == 'tijera' && eleccion_pc == 'tijera') {
    resultado = 'es Empate';
  }

  if (eleccion_usuario == 'papel' && eleccion_pc == 'piedra') {
    resultado = 'eres el Ganador';
  }

  if (eleccion_usuario == 'piedra' && eleccion_pc == 'tijera') {
    resultado = 'eres el Ganador';
  }

  if (eleccion_usuario == 'tijera' && eleccion_pc == 'papel') {
    resultado = 'eres el Ganador';
  }

  return { eleccion_usuario, eleccion_pc, resultado };
}

function showGameResult(resultado_juego) {
  const msj = "Elegiste " + resultado_juego.eleccion_usuario + ' y la PC eligió ' + resultado_juego.eleccion_pc + ', por lo que ' + resultado_juego.resultado + '.';
  alert(msj);
}

// ---------EJECUTANDO  ----------------------------------------------------------------------------------------------------------

function jugarPiedraPapelTijera() {
  const userChoice = getUserChoice();

  if (userChoice == null) {
    console.error("enunciado2:", "el usuario no pasó una opción válida.");
    return;
  }

  winer = determineWinner(userChoice);
  console.log("determineWinner", winer);
  showGameResult(winer);
}
