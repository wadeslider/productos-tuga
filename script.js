/**
 * Se llama al modificar el campo de Precio por Kilogramo.
 * Habilita/Deshabilita los campos de Peso y Precio Deseado.
 */
function validarPrecioKilo() {
    const precioKiloInput = document.getElementById('precioKilo');
    const pesoGramosInput = document.getElementById('pesoGramos');
    const precioDeseadoInput = document.getElementById('precioDeseado');
    
    const precioPorKilo = parseFloat(precioKiloInput.value);

    const esValido = !isNaN(precioPorKilo) && precioPorKilo > 0;

    // Habilitar o deshabilitar los campos de abajo
    pesoGramosInput.disabled = !esValido;
    precioDeseadoInput.disabled = !esValido;

    // Si se invalida el precio por kilo, limpiamos los campos de cálculo
    if (!esValido) {
        pesoGramosInput.value = '';
        precioDeseadoInput.value = '';
    }
    
    // Si ya es válido, podemos llamar a 'calcular' para recalcular en caso de que ya hubiera valores
    if (esValido) {
        // Llamamos a calcular sobre el campo de peso si tiene valor, si no, sobre el de precio deseado
        // Esto asegura que si el usuario estaba escribiendo un valor, se calcule inmediatamente
        if (pesoGramosInput.value) {
            calcular(pesoGramosInput);
        } else if (precioDeseadoInput.value) {
            calcular(precioDeseadoInput);
        }
    }
}


/**
 * Función principal de cálculo. Se activa al modificar cualquiera de los dos campos (gramos o precio).
 * @param {HTMLInputElement} elemento El campo de entrada que ha sido modificado (this).
 */
function calcular(elemento) {
    // 1. Obtener valores de la interfaz
    const precioKiloInput = document.getElementById('precioKilo');
    const pesoGramosInput = document.getElementById('pesoGramos');
    const precioDeseadoInput = document.getElementById('precioDeseado');

    const precioPorKilo = parseFloat(precioKiloInput.value);

    // Si el precio por kilo no es válido, detenemos el cálculo (esto debería ser manejado por 'disabled', pero es buena práctica)
    if (isNaN(precioPorKilo) || precioPorKilo <= 0) {
        pesoGramosInput.value = '';
        precioDeseadoInput.value = '';
        return; 
    }

    // 2. Determinar qué campo fue modificado
    const idModificado = elemento.id;

    if (idModificado === 'pesoGramos') {
        // --- Caso A: El usuario modificó los GRAMOS ---
        const pesoEnGramos = parseFloat(elemento.value);

        if (isNaN(pesoEnGramos) || pesoEnGramos < 0) {
            precioDeseadoInput.value = '';
            return;
        }
        
        // CÁLCULO DE PRECIO: (Gramos / 1000) * Precio_Kilo
        const precioFinal = (pesoEnGramos / 1000) * precioPorKilo;
        
        // Actualizar el campo de Precio Deseado con el nuevo cálculo
        precioDeseadoInput.value = precioFinal.toFixed(2);

    } else if (idModificado === 'precioDeseado') {
        // --- Caso B: El usuario modificó el PRECIO ---
        const precioDeseado = parseFloat(elemento.value);

        if (isNaN(precioDeseado) || precioDeseado < 0) {
            pesoGramosInput.value = '';
            return;
        }

        // CÁLCULO DE GRAMOS: (Precio_Deseado / Precio_Kilo) * 1000
        const gramosFinal = (precioDeseado / precioPorKilo) * 1000;

        // Actualizar el campo de Gramos con el nuevo cálculo
        pesoGramosInput.value = gramosFinal.toFixed(0);
    }
}

// Inicialización: Al cargar la página, limpiamos los campos y validamos el precio por kilo
document.addEventListener('DOMContentLoaded', () => {
    // Limpiamos los campos de cálculo
    document.getElementById('pesoGramos').value = '';
    document.getElementById('precioDeseado').value = '';
    
    // Validamos el precio por kilo para establecer el estado inicial de los campos de cálculo
    validarPrecioKilo();
});