let lastScrollTop = 0;
let lastRotationValue = 0;

function updateRotation(rotationValue) {
    const disc = document.querySelector('.disc');
    if (rotationValue !== lastRotationValue) {
        disc.style.transform = `rotateX(${rotationValue}deg)`;
        lastRotationValue = rotationValue; 
    }
}

document.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY; 
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight; 
    const scrollPercentage = scrollPosition / windowHeight; 
    const rotationValue = scrollPercentage * 60; 

    updateRotation(rotationValue);
    lastScrollTop = scrollPosition; 
});

// Contador de cuenta regresiva hasta el 17 de Noviembre
const targetDate = new Date('2024-11-17T00:00:00'); // Cambia esta fecha por la fecha objetivo
const timerDisplay = document.getElementById('timer');
const disc = document.querySelector('.disc');

function updateCountdown() {
    const now = new Date();
    const remainingTime = targetDate - now;

    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    timerDisplay.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`; // Mantiene el formato

    if (remainingTime <= 0) {
        clearInterval(countdownInterval);
        timerDisplay.innerHTML = "¡Evento en curso!";
    }
}

// Inicializa el contador al cargar la página
updateCountdown();

// Actualizar el contador cada segundo
const countdownInterval = setInterval(updateCountdown, 1000);
