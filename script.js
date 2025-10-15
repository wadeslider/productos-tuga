const THEME_STORAGE_KEY = 'user-theme-preference';

/**
 * Se llama al modificar el campo de Precio por Kilogramo.
 */
function validarPrecioKilo() {
    // ... (función de cálculo igual)
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
    // ... (función de cálculo igual)
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
 * Aplica el tema inmediatamente (sin transición).
 */
function applyTheme(isDark) {
    const body = document.body;
    const moonIcon = document.querySelector('.fa-moon');
    const sunIcon = document.querySelector('.fa-sun');
    
    if (isDark) {
        body.classList.add('dark-mode');
        // Sol está visible por defecto, lo ocultamos y mostramos la luna
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    } else {
        body.classList.remove('dark-mode');
        // Luna está visible por defecto, la ocultamos y mostramos el sol
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
    }
}

/**
 * Función para alternar el modo oscuro con transición de onda expansiva.
 */
function toggleTheme(event) {
    const body = document.body;
    const isDarkMode = body.classList.contains('dark-mode');
    const transitionElement = document.getElementById('theme-transition');
    const themeToggle = document.getElementById('themeToggle');
    
    // 1. Guardar el tema opuesto
    const nextThemeIsDark = !isDarkMode;
    localStorage.setItem(THEME_STORAGE_KEY, nextThemeIsDark ? 'dark' : 'light');

    // 2. Configurar el color y la posición de inicio de la onda (Esquina Inferior Izquierda del botón)
    const lightBg = getComputedStyle(body).getPropertyValue('--color-background');
    const darkBg = getComputedStyle(body).getPropertyValue('--dark-bg');
    const nextThemeColor = nextThemeIsDark ? darkBg : lightBg;
    
    transitionElement.style.backgroundColor = nextThemeColor;
    
    const rect = themeToggle.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Posicionar el centro del círculo de transición en el centro del botón
    transitionElement.style.left = `${centerX}px`;
    transitionElement.style.top = `${centerY}px`;
    
    // 3. Ejecutar la expansión
    transitionElement.style.transform = 'scale(0)';

    requestAnimationFrame(() => {
        // Calcular el radio para cubrir toda la pantalla (diagonal desde el botón hasta la esquina más lejana)
        const distanceToFarCorner = Math.sqrt(
            Math.max(centerX, window.innerWidth - centerX) ** 2 + 
            Math.max(centerY, window.innerHeight - centerY) ** 2
        );
        
        const scaleFactor = distanceToFarCorner * 2 / transitionElement.offsetWidth;
        
        transitionElement.style.transform = `scale(${scaleFactor})`;
    });
    
    // 4. Aplicar el tema después de un retraso
    setTimeout(() => {
        applyTheme(nextThemeIsDark);
    }, 300); 

    // 5. Resetear la transición después de que termine
    setTimeout(() => {
        transitionElement.style.transform = 'scale(0)';
    }, 700); 
}

/**
 * Carga el tema guardado en localStorage al inicio.
 */
function loadTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    // Si es 'dark', aplicamos el modo oscuro. De lo contrario, usamos el modo claro (por defecto).
    applyTheme(savedTheme === 'dark');
}


// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // 1. Cargar el tema primero
    loadTheme();
    
    // 2. Inicialización de campos y validación
    document.getElementById('pesoGramos').value = '';
    document.getElementById('precioDeseado').value = '';
    validarPrecioKilo();
    
    // 3. Vinculamos el botón de tema a su función
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
});