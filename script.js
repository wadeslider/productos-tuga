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
 * @param {boolean} isDark True para modo oscuro, false para modo claro.
 */
function applyTheme(isDark) {
    const body = document.body;
    const moonIcon = document.querySelector('.fa-moon');
    const sunIcon = document.querySelector('.fa-sun');
    
    if (isDark) {
        body.classList.add('dark-mode');
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
    } else {
        body.classList.remove('dark-mode');
        moonIcon.classList.remove('hidden');
        sunIcon.classList.add('hidden');
    }
}

/**
 * Función para alternar el modo oscuro con transición de onda expansiva.
 */
function toggleTheme(event) {
    const body = document.body;
    const isDarkMode = body.classList.contains('dark-mode');
    const transitionElement = document.getElementById('theme-transition');
    
    // 1. Guardar el tema opuesto (el que se aplicará después de la transición)
    const nextThemeIsDark = !isDarkMode;
    localStorage.setItem(THEME_STORAGE_KEY, nextThemeIsDark ? 'dark' : 'light');

    // 2. Configurar el color y la posición de inicio de la onda
    const lightBg = getComputedStyle(body).getPropertyValue('--color-background');
    const darkBg = getComputedStyle(body).getPropertyValue('--dark-bg');
    const nextThemeColor = nextThemeIsDark ? darkBg : lightBg;
    
    transitionElement.style.backgroundColor = nextThemeColor;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    transitionElement.style.left = `${centerX}px`;
    transitionElement.style.top = `${centerY}px`;
    
    // 3. Ejecutar la expansión
    transitionElement.style.transform = 'scale(0)';

    requestAnimationFrame(() => {
        // Calcular el radio para cubrir toda la pantalla
        const diagonal = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2);
        const scaleFactor = diagonal / transitionElement.offsetWidth;
        
        transitionElement.style.transform = `scale(${scaleFactor * 2})`;
    });
    
    // 4. Aplicar el tema después de un retraso
    setTimeout(() => {
        applyTheme(nextThemeIsDark);
    }, 300); 

    // 5. Resetear la transición después de que termine
    setTimeout(() => {
        transitionElement.style.transform = 'scale(0)';
        // Opcional: Limpiar posición después de resetear
        // transitionElement.style.left = ''; 
        // transitionElement.style.top = ''; 
    }, 700); 
}

/**
 * Carga el tema guardado en localStorage al inicio.
 */
function loadTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    // Si no hay tema guardado, o si es 'light', no hacemos nada (el CSS es light por defecto)
    if (savedTheme === 'dark') {
        applyTheme(true);
    } else {
        // Nos aseguramos de aplicar el tema claro y la visibilidad correcta de iconos
        applyTheme(false); 
    }
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