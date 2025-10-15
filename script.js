/**
 * Función principal de cálculo. Se activa al modificar cualquiera de los dos campos (gramos o precio).
 * @param {HTMLInputElement} elemento El campo de entrada que ha sido modificado (this).
 */
function calcular(elemento) {
    // 1. Obtener valores de la interfaz
    const precioKiloInput = document.getElementById('precioKilo');
    const pesoGramosInput = document.getElementById('pesoGramos');
    const precioDeseadoInput = document.getElementById('precioDeseado');
    const mensajeResultado = document.getElementById('mensajeResultado');

    // Convertir el precio por kilo a número
    const precioPorKilo = parseFloat(precioKiloInput.value);

    // 2. Validar el precio por kilo
    if (isNaN(precioPorKilo) || precioPorKilo <= 0) {
        mensajeResultado.textContent = 'ERROR: El precio por kilo debe ser un número positivo.';
        return;
    }

    // 3. Determinar qué campo fue modificado
    const idModificado = elemento.id;
    let gramosFinal;
    let precioFinal;

    if (idModificado === 'pesoGramos') {
        // --- Caso A: El usuario modificó los GRAMOS ---
        const pesoEnGramos = parseFloat(elemento.value);

        if (isNaN(pesoEnGramos) || pesoEnGramos <= 0) {
            // Limpiar resultados si la entrada no es válida
            precioDeseadoInput.value = '';
            mensajeResultado.textContent = 'Esperando la entrada...';
            return;
        }
        
        // CÁLCULO DE PRECIO: (Gramos / 1000) * Precio_Kilo
        precioFinal = (pesoEnGramos / 1000) * precioPorKilo;
        
        // Actualizar el campo de Precio Deseado con el nuevo cálculo
        precioDeseadoInput.value = precioFinal.toFixed(2);
        
        // Actualizar el mensaje de resultado
        mensajeResultado.textContent = `Pesar ${pesoEnGramos.toFixed(0)} gramos y cobrar $${precioFinal.toFixed(2)}`;

    } else if (idModificado === 'precioDeseado') {
        // --- Caso B: El usuario modificó el PRECIO ---
        const precioDeseado = parseFloat(elemento.value);

        if (isNaN(precioDeseado) || precioDeseado <= 0) {
            // Limpiar resultados si la entrada no es válida
            pesoGramosInput.value = '';
            mensajeResultado.textContent = 'Esperando la entrada...';
            return;
        }

        // CÁLCULO DE GRAMOS: (Precio_Deseado / Precio_Kilo) * 1000
        gramosFinal = (precioDeseado / precioPorKilo) * 1000;

        // Actualizar el campo de Gramos con el nuevo cálculo
        pesoGramosInput.value = gramosFinal.toFixed(0);
        
        // Actualizar el mensaje de resultado
        mensajeResultado.textContent = `Pesar ${gramosFinal.toFixed(0)} gramos y cobrar $${precioDeseado.toFixed(2)}`;
    }
}

// Inicialización: Limpiar los campos de peso y precio al cargar la página
// para evitar confusión inicial y asegurar que el cálculo se haga solo con la interacción.
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('pesoGramos').value = '';
    document.getElementById('precioDeseado').value = '';
    document.getElementById('mensajeResultado').textContent = 'Introduzca un valor en Gramos o en Precio.';
});