

let lastScrollTop = 0;
let lastRotationValue = 0;

const disc = document.querySelector('.disc');

// Fecha objetivo para el evento
const targetDate = new Date('2025-11-17T14:00:00'); // Cambia esto a la fecha objetivo

let debugDate = null; // Fecha para debug. Usar null o new Date('2024-11-17T14:00:00')


const eventMessage = "¡EL EVENTO HA COMENZADO!";
const finishedEventMessage = "EL EVENTO HA TERMINADO. ¡NOS VEMOS LA PRÓXIMA!";

// Variable para la fecha de finalización del evento
let endDate = new Date('2025-11-17T20:00:00'); // Cambia esto a una fecha específica si lo deseas

// Función para obtener la fecha actual o la fecha de debugging
function getCurrentDate() {
    return debugDate !== null ? debugDate : new Date(); // Devuelve debugDate si no es null, de lo contrario, devuelve la fecha actual
}

function calculateMaxRotation() {
    const now = getCurrentDate();
    const timeUntilEvent = targetDate - now;

    const totalDaysUntilEvent = Math.floor(timeUntilEvent / (1000 * 60 * 60 * 24));
    const maxRotation = Math.min(180, Math.max(0, 60 + (120 * (30 - totalDaysUntilEvent) / 30)));

    return maxRotation;
}

const maxRotationValue = calculateMaxRotation();

function updateRotation(rotationValue) {
    if (rotationValue !== lastRotationValue) {
        disc.style.transform = `rotateX(${rotationValue}deg)`;
        lastRotationValue = rotationValue; 
    }
}

document.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY; 
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight; 
    const scrollPercentage = scrollPosition / windowHeight; 
    const rotationValue = scrollPercentage * maxRotationValue;

    updateRotation(rotationValue);
    lastScrollTop = scrollPosition; 
});

const timerDisplay = document.getElementById('timer');

// Variable de estado para verificar si el mensaje ha sido mostrado
let messageShown = false;

function updateCountdown() {
    // Incrementa debugDate cada segundo si no es null
    if (debugDate !== null) {
        debugDate = new Date(debugDate.getTime() + 1000); // Incrementa debugDate en 1 segundo
    }

    const now = getCurrentDate();
    const remainingTime = targetDate - now;
    const endRemainingTime = endDate - now; // Calcular el tiempo restante para la fecha de finalización

    // Calcular el tiempo restante
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    // Mostrar el temporizador solo si no ha comenzado el evento
    if (remainingTime > 0) {
        timerDisplay.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        timerDisplay.classList.remove('hide'); // Asegurarse de que el temporizador se muestre
    } else if (remainingTime <= 0 && remainingTime > -1000) {
        // Si el tiempo llega a 0, muestra el formato manteniendo el estilo
        timerDisplay.innerHTML = `0d 0h 0m 0s`;
        timerDisplay.classList.remove('hide');
    }

    // Calcular la diferencia entre la apertura y cierre del evento
    const eventDuration = endDate - targetDate;

    // Verifica si el evento ha comenzado o terminado
    if (remainingTime < 0 && endRemainingTime > 0) {
        // Si el evento ha comenzado pero no ha terminado
        if (!messageShown) { // Solo mostrar el mensaje si no se ha mostrado antes
            timerDisplay.classList.add('fade-out'); // Aplica fade out
            setTimeout(() => {
                timerDisplay.innerHTML = eventMessage; // Actualiza el mensaje
                timerDisplay.classList.remove('fade-out'); // Elimina fade out
                timerDisplay.classList.add('fade-in'); // Aplica fade in
                setTimeout(() => timerDisplay.classList.remove('fade-in'), 500); // Elimina fade in después de un tiempo
            }, 500); // Espera el tiempo de transición para ocultar
            messageShown = true; // Marca que el mensaje ha sido mostrado
        }
    } else if (remainingTime <= -eventDuration) {
        // Si el tiempo ha pasado el tiempo de cierre del evento
        if (messageShown) { // Solo actualizar el mensaje si ya se ha mostrado el mensaje del evento
            timerDisplay.classList.add('fade-out'); // Aplica fade out
            setTimeout(() => {
                timerDisplay.innerHTML = finishedEventMessage; // Mensaje de finalización
                timerDisplay.classList.remove('fade-out'); // Elimina fade out
                timerDisplay.classList.add('fade-in'); // Aplica fade in
                setTimeout(() => timerDisplay.classList.remove('fade-in'), 500); // Elimina fade in después de un tiempo
            }, 500); // Espera el tiempo de transición para ocultar
            messageShown = false; // Actualiza el estado para el mensaje mostrado
        }
    }
}

// Inicializa el contador al cargar la página
updateCountdown();

// Actualizar el contador cada segundo
const countdownInterval = setInterval(updateCountdown, 1000);
