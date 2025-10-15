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
        if (precioDeseadoInput.value) {
            calcular(precioDeseadoInput);
        } else if (pesoGramosInput.value) {
            calcular(pesoGramosInput);
        }
    }
}


/**
 * Función principal de cálculo. Se activa al modificar cualquiera de los dos campos (gramos o precio).
 * @param {HTMLInputElement} elemento El campo de entrada que ha sido modificado (this).
 */
function calcular(elemento) {
    const precioKiloInput = document.getElementById('precioKilo');
    const pesoGramosInput = document.getElementById('pesoGramos');
    const precioDeseadoInput = document.getElementById('precioDeseado');

    const precioPorKilo = parseFloat(precioKiloInput.value);

    if (isNaN(precioPorKilo) || precioPorKilo <= 0) {
        pesoGramosInput.value = '';
        precioDeseadoInput.value = '';
        return; 
    }

    const idModificado = elemento.id;

    if (idModificado === 'precioDeseado') {
        const precioDeseado = parseFloat(elemento.value);
        if (isNaN(precioDeseado) || precioDeseado < 0) {
            pesoGramosInput.value = '';
            return;
        }

        const gramosFinal = (precioDeseado / precioPorKilo) * 1000;
        pesoGramosInput.value = gramosFinal.toFixed(0);

    } else if (idModificado === 'pesoGramos') {
        const pesoEnGramos = parseFloat(elemento.value);
        if (isNaN(pesoEnGramos) || pesoEnGramos < 0) {
            precioDeseadoInput.value = '';
            return;
        }
        
        const precioFinal = (pesoEnGramos / 1000) * precioPorKilo;
        precioDeseadoInput.value = precioFinal.toFixed(2);
    }
}

/**
 * Función para alternar el modo oscuro y cambiar el icono del botón.
 */
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    // Alterna la clase y devuelve true si se añadió (dark-mode activado)
    const isDarkMode = body.classList.toggle('dark-mode'); 

    // Obtener los iconos (usando selectores específicos para evitar conflicto con span)
    const moonIcon = themeToggle.querySelector('.fa-moon');
    const sunIcon = themeToggle.querySelector('.fa-sun');

    if (isDarkMode) {
        // En modo oscuro, el ícono activo es el SOL
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
    } else {
        // En modo claro, el ícono activo es la LUNA
        moonIcon.classList.remove('hidden');
        sunIcon.classList.add('hidden');
    }
}


// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Inicialización de campos y validación
    document.getElementById('pesoGramos').value = '';
    document.getElementById('precioDeseado').value = '';
    validarPrecioKilo();
    
    // 1. Vinculamos el botón de tema a su función
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // 2. Ocultar el sol por defecto (estamos en modo claro)
    const sunIcon = document.querySelector('#themeToggle .fa-sun');
    if (sunIcon) {
        sunIcon.classList.add('hidden');
    }
});