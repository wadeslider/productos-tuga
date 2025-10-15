/**
 * Se llama al modificar el campo de Precio por Kilogramo.
 */
function validarPrecioKilo() {
    const precioKiloInput = document.getElementById('precioKilo');
    const pesoGramosInput = document.getElementById('pesoGramos');
    const precioDeseadoInput = document.getElementById('precioDeseado');
    
    const precioPorKilo = parseFloat(precioKiloInput.value);

    const esValido = !isNaN(precioPorKilo) && precioPorKilo > 0;

    pesoGramosInput.disabled = !esValido;
    precioDeseadoInput.disabled = !esValido;

    if (!esValido) {
        pesoGramosInput.value = '';
        precioDeseadoInput.value = '';
    }
    
    if (esValido) {
        if (precioDeseadoInput.value) {
            calcular(precioDeseadoInput);
        } else if (pesoGramosInput.value) {
            calcular(pesoGramosInput);
        }
    }
}


/**
 * Función principal de cálculo.
 */
function calcular(elemento) {
    const precioKiloInput = document.getElementById('precioKilo');
    const pesoGramosInput = document.getElementById('pesoGramos');
    const precioDeseadoInput = document.getElementById('precioDeseado');

    const precioPorKilo = parseFloat(precioKiloInput.value);

    if (isNaN(precioPorKilo) || precioPorKilo <= 0) { return; }

    const idModificado = elemento.id;

    if (idModificado === 'precioDeseado') {
        const precioDeseado = parseFloat(elemento.value);
        if (isNaN(precioDeseado) || precioDeseado < 0) { pesoGramosInput.value = ''; return; }
        const gramosFinal = (precioDeseado / precioPorKilo) * 1000;
        pesoGramosInput.value = gramosFinal.toFixed(0);

    } else if (idModificado === 'pesoGramos') {
        const pesoEnGramos = parseFloat(elemento.value);
        if (isNaN(pesoEnGramos) || pesoEnGramos < 0) { precioDeseadoInput.value = ''; return; }
        const precioFinal = (pesoEnGramos / 1000) * precioPorKilo;
        precioDeseadoInput.value = precioFinal.toFixed(2);
    }
}

/**
 * Función para alternar el modo oscuro con transición de onda expansiva.
 */
function toggleTheme(event) {
    const body = document.body;
    const isDarkMode = body.classList.contains('dark-mode');
    const transitionElement = document.getElementById('theme-transition');
    
    // 1. Configurar el color y la posición de inicio de la onda
    const nextThemeColor = isDarkMode ? getComputedStyle(body).getPropertyValue('--color-background') : getComputedStyle(body).getPropertyValue('--dark-bg');
    transitionElement.style.backgroundColor = nextThemeColor;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    transitionElement.style.left = `${centerX}px`;
    transitionElement.style.top = `${centerY}px`;
    
    // 2. Ejecutar la expansión (transform: scale)
    transitionElement.style.transform = 'scale(0)';
    transitionElement.classList.add('active'); // Clase temporal para asegurar la transición

    // Asegurar que la escala sea 0 antes de iniciar
    requestAnimationFrame(() => {
        // Calcular el radio para cubrir toda la pantalla (diagonal)
        const diagonal = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2);
        const scaleFactor = diagonal / transitionElement.offsetWidth;
        
        transitionElement.style.transform = `scale(${scaleFactor * 2})`; // Escala suficiente
    });
    
    // 3. Cambiar el tema después de un retraso
    setTimeout(() => {
        body.classList.toggle('dark-mode');
        // Alternar íconos
        const moonIcon = document.querySelector('.fa-moon');
        const sunIcon = document.querySelector('.fa-sun');

        if (body.classList.contains('dark-mode')) {
            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
        } else {
            moonIcon.classList.remove('hidden');
            sunIcon.classList.add('hidden');
        }

    }, 300); // 300ms antes de cambiar el tema (la transición dura 600ms)

    // 4. Resetear la transición después de que termine
    setTimeout(() => {
        transitionElement.style.transform = 'scale(0)';
        transitionElement.classList.remove('active');
        transitionElement.style.left = ''; // Limpiar posición
        transitionElement.style.top = ''; // Limpiar posición
    }, 700); // Resetear 700ms después de iniciar
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