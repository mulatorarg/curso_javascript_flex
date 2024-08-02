document.getElementById('calculadorIMC').addEventListener('click', function () {
  console.log("Se hizo click sobre el boton del enunciado 1: Calcular IMC");
  enunciado1();
});


// ---------ENUNCIADO 1---------------------------------------------------------------------------------------------------------

/*
--------------------------------------------------------------------------------------------------------------------------------
Calculador de IMC
Según wikipedia, El índice de masa corporal (IMC) es una razón matemática que asocia la masa (peso) y la talla de un individuo,
ideada por el estadístico belga Adolphe Quetelet, por lo que también se conoce como índice de Quetelet.
Se calcula según la operación: masa sobre el cuadrado de la altura del individuo.
IMC = masa / estatura ** 2
Considreciones iniciales: Como en toda División, es necesario, verificar que:
- el divisor no puede ser 0, porque daría un valor infinito,
- el dividendo no puede ser 0, porque la división dará 0.
Debo verificar que ambos valores sean númerícos (enteros o reales) y distintos a 0.
Además, nadie pesa 0Kg y/o mide 0m.
*/

// ---------FUNCIONES ----------------------------------------------------------------------------------------------------------

/*
Calculará el Índice de Masa Corporal.
Tiene un control de errores simple, donde los valores no pueden ser igual a 0, y supone que siempre se pasarán valores numéricos (ese
contol lo delega a otra función).
Retornaré null, si no puedo proceder con la operación.
*/
function calculateBMI(masa, estatura) {
    if (masa == 0) {
        console.error("calculateBMI", "La masa del individuo no puede ser 0.");
        return null;
    }

    if (estatura == 0) {
        console.error("calculateBMI", "La estatura del individuo no puede ser 0.");
        return null;
    }

    return masa / (estatura ** 2);
}

/*
Mostrará con un alert el resultado del IMC, y en caso de corresponder, su clasificación:

Peso bajo	< 18,50
Normal	    18,5-24,99
Sobrepeso	≥25,00-29,99
Obesidad	≥30,00
*/
function showBMIResult(imc_calculado) {

    if (isNaN(imc_calculado)) {
        alert("No se ha podido calcular correctamente el IMC del individuo. Intente de nuevo, presionando el botón.");
        return;
    }

    let clasificacion = '😎';
    const imc_porcentil = imc_calculado * 100;

    switch (true) {
        case (imc_porcentil <= 18.5):
            clasificacion = "⚠️ Peso bajo. Cuidate!"
            break;
        case (imc_porcentil < 25):
            clasificacion = "✅ Normal. No aflojes"
            break;
        case (imc_porcentil < 30):
            clasificacion = "⚠️ Sobrepeso. Cuidate!"
            break;
        default:
            clasificacion = "🛑 Obesidad. Cuidate!"
            break;
    }

    alert("El IMC del individuo es de " + imc_calculado.toFixed(2) + " y su clasificación es '" + clasificacion + "'.");
}

/*
Pedirá al usuario la masa y la altura del individuo al que quiere obtener el IMC.
Realizará las validaciones pertinentes, como que tanto la masa como la alturas sean valores numéricos y distintos a 0.
*/
function getUserData() {

    // Solicito al usuario, la masa del individuo:
    const masa = parseFloat(prompt("Introduce la masa (peso), expresado en kilogramos:"));
    console.log(masa);
    if (isNaN(masa) || masa <= 0) {
        console.error("getUserData", "La masa del individuo no tiene un valor correcto: " + masa);
        alert("No ha ingresado un valor correcto para el peso del Individuo. Intente de nuevo, presionando el botón.");
        return null;
    }

    // Solicito al usuario, la estarua del individuo:
    let estatura = parseFloat(prompt("Introduce la estatura, expresada en metros:"));
    console.log(estatura);
    if (isNaN(estatura) || estatura <= 0) {
        console.error("getUserData", "La estatura del individuo no tiene un valor correcto: " + estatura);
        alert("No ha ingresado un valor correcto para la estatura del Individuo. Intente de nuevo, presionando el botón.");
        return null;
    }

    return { masa, estatura };

}

function enunciado1() {
    const userData = getUserData();
    let bmi;

    if (userData == null) {
        console.error("enunciado1:", "el usuario no pasó los datos correctamente.");
        return;
    }
    
    bmi = calculateBMI(userData.masa, userData.estatura);
    console.log("calculateBMI", bmi);
    showBMIResult(bmi);

}