/**
 * Función que calcula el precio total basándose en el precio por kilo y el peso en gramos.
 * Se llama automáticamente cada vez que el usuario teclea en los campos de entrada.
 */
function calcularPrecio() {
    // 1. Obtener los valores de los campos de entrada
    // Usamos parseFloat para convertir los valores de texto a números decimales
    const precioPorKilo = parseFloat(document.getElementById('precioKilo').value);
    const pesoEnGramos = parseFloat(document.getElementById('pesoGramos').value);
    
    // 2. Obtener los elementos HTML donde mostraremos los resultados
    const resultadoPeso = document.getElementById('pesoMuestra');
    const resultadoPrecio = document.getElementById('precioFinal');

    // 3. Validar la entrada: si no son números válidos o el peso/precio es negativo, reiniciamos.
    if (isNaN(precioPorKilo) || isNaN(pesoEnGramos) || precioPorKilo <= 0 || pesoEnGramos < 0) {
        resultadoPeso.textContent = '0';
        resultadoPrecio.textContent = '$ 0.00';
        return; // Detener la función
    }

    // 4. Realizar la conversión de unidades y el cálculo
    // Convertimos gramos a kilogramos: pesoEnGramos / 1000
    const pesoEnKilos = pesoEnGramos / 1000;

    // Fórmula: Precio Total = Peso en Kilos * Precio por Kilo
    const precioTotal = pesoEnKilos * precioPorKilo;
    
    // 5. Mostrar los resultados en la interfaz
    
    // Muestra el peso ingresado (redondeado sin decimales para gramos)
    resultadoPeso.textContent = pesoEnGramos.toFixed(0); 

    // Muestra el precio final formateado con 2 decimales y el símbolo de moneda
    resultadoPrecio.textContent = '$ ' + precioTotal.toFixed(2);
}

// Inicializar: Llamar a la función al cargar la página para mostrar el cálculo inicial 
// si los campos tienen valores predeterminados.
window.onload = calcularPrecio;
