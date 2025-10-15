/**
 * Función principal de cálculo. Se activa al modificar cualquiera de los dos campos (gramos o precio).
 * @param {HTMLInputElement} elemento El campo de entrada que ha sido modificado (this).
 */
function calcular(elemento) {
    // 1. Obtener valores de la interfaz
    const precioKiloInput = document.getElementById('precioKilo');
    const pesoGramosInput = document.getElementById('pesoGramos');
    const precioDeseadoInput = document.getElementById('precioDeseado');

    // Convertir el precio por kilo a número
    const precioPorKilo = parseFloat(precioKiloInput.value);

    // 2. Validar el precio por kilo (fijo)
    if (isNaN(precioPorKilo) || precioPorKilo <= 0) {
        // Si el precio por kilo es inválido, limpiamos los otros campos.
        pesoGramosInput.value = '';
        precioDeseadoInput.value = '';
        return; 
    }

    // 3. Determinar qué campo fue modificado
    const idModificado = elemento.id;
    let gramosFinal;
    let precioFinal;

    if (idModificado === 'pesoGramos') {
        // --- Caso A: El usuario modificó los GRAMOS ---
        const pesoEnGramos = parseFloat(elemento.value);

        if (isNaN(pesoEnGramos) || pesoEnGramos < 0) {
            // Limpiar el campo de Precio Deseado si la entrada de Gramos no es válida
            precioDeseadoInput.value = '';
            return;
        }
        
        // CÁLCULO DE PRECIO: (Gramos / 1000) * Precio_Kilo
        precioFinal = (pesoEnGramos / 1000) * precioPorKilo;
        
        // Actualizar el campo de Precio Deseado con el nuevo cálculo
        precioDeseadoInput.value = precioFinal.toFixed(2);

    } else if (idModificado === 'precioDeseado') {
        // --- Caso B: El usuario modificó el PRECIO ---
        const precioDeseado = parseFloat(elemento.value);

        if (isNaN(precioDeseado) || precioDeseado < 0) {
            // Limpiar el campo de Gramos si la entrada de Precio no es válida
            pesoGramosInput.value = '';
            return;
        }

        // CÁLCULO DE GRAMOS: (Precio_Deseado / Precio_Kilo) * 1000
        gramosFinal = (precioDeseado / precioPorKilo) * 1000;

        // Actualizar el campo de Gramos con el nuevo cálculo
        // Usamos toFixed(0) para redondear a gramos enteros, más práctico para el pesaje.
        pesoGramosInput.value = gramosFinal.toFixed(0);
    }
}

// Inicialización: Al cargar la página, limpiamos los campos de entrada de cantidad para que el usuario empiece a interactuar.
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('pesoGramos').value = '';
    document.getElementById('precioDeseado').value = '';
});