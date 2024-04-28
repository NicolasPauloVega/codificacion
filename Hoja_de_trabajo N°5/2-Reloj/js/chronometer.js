// Obtienes un reloj digital de la página web.
const stopwatch = document.getElementById('stopwatch');
// Aquí tienes el botón que controla el reloj, para iniciar o pausar el tiempo.
const playPauseButton = document.getElementById('play-pause');
// Esto sería como la arena que cae en el reloj de arena, pero es una esfera que se mueve.
const secondsSphere = document.getElementById('seconds-sphere');

// Aquí guardamos un temporizador, pero aún no lo hemos configurado.
let stopwatchInterval;
// Esto es el tiempo que ha pasado, por ahora está en cero.
let runningTime = 0;

// Esta función es como decir "si el reloj está pausado, entonces inicia el tiempo, si no, paúsalo".
const playPause = () => {
    const isPaused = !playPauseButton.classList.contains('running');
    if (isPaused) {
        playPauseButton.classList.add('running');
        start();
    } else {
        playPauseButton.classList.remove('running');
        Pause();
    }
};

// "Pause" es como decir "detén la caída de la arena y pausa el tiempo".
const Pause = () => {
    secondsSphere.style.animationPlayState = 'paused';
    clearInterval(stopwatchInterval);
};

// "stop" es como presionar el botón de reinicio: detiene la esfera, quita la animación y pone el tiempo en cero.
const stop = () => {
    secondsSphere.style.transform = 'rotate(-90deg) translateX(60px)';
    secondsSphere.style.animation = 'none';
    playPauseButton.classList.remove('running');
    runningTime = 0;
    clearInterval(stopwatchInterval);
    stopwatch.textContent = '00:00';
};

// "start" es como voltear el reloj de arena para que la arena empiece a caer de nuevo y el tiempo se reanude.
const start = () => {
    secondsSphere.style.animation = 'rotation 60s linear infinite';
    let startTime = Date.now() - runningTime;
    secondsSphere.style.animationPlayState = 'running';
    stopwatchInterval = setInterval(() => {
        runningTime = Date.now() - startTime;
        stopwatch.textContent = calculateTime(runningTime);
    }, 1000);
};

// "calculateTime" es como tener un amigo que está contando los granos de arena que caen y te dice cuánto tiempo ha pasado en minutos y segundos.
const calculateTime = runningTime => {
    const total_seconds = Math.floor(runningTime / 1000);
    const total_minutes = Math.floor(total_seconds / 60);

    const display_seconds = (total_seconds % 60).toString().padStart(2, "0");
    const display_minutes = total_minutes.toString().padStart(2, "0");

    return `${display_minutes}:${display_seconds}`;
};
