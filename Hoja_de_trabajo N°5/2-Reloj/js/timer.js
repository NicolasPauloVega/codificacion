document.addEventListener('DOMContentLoaded', () => {

    const $timerLeft = document.querySelector('#time-left'),
        $btnStart = document.querySelector('#btn-start'),
        $btnPause = document.querySelector('#btn-pause'),
        $btnStop = document.querySelector('#btn-stop'),
        $minutes = document.querySelector('#minutes'),
        $seconds = document.querySelector('#seconds'),
        $inputContainer = document.querySelector('#input-container');
    
        let idInterval = null, timeDifference = 0,
        futureDate = null;

    const hideItem = element => {
        element.style.display = 'none';
    }

    const showItem = element => {
        element.style.display = "";
    }

    const startTimer = (minutes, seconds) => {
        hideItem($inputContainer);
        showItem($btnPause);
        hideItem($btnStart);
        showItem($btnStop);

        if (futureDate) {
            futureDate = new Date(new Date().getTime() + timeDifference);
            timeDifference = 0;
        } else {
            const milliseconds = (seconds + (minutes * 60)) * 1000;
            futureDate = new Date(new Date().getTime() + milliseconds);
        }
        
        clearInterval(idInterval);

        idInterval = setInterval(() => {
            
            const timerLetf = futureDate.getTime() - new Date().getTime();
            console.log(futureDate.getTime());
            console.log(new Date().getTime());

            if (timerLetf <= 0) {
                clearInterval(idInterval);
                hideItem($btnPause);
                showItem($btnStop);
            } else {
                $timerLeft.textContent = millisecondsMinutesAndSeconds(timerLetf);
            }
        }, 1000);
    };

    const pauseTimer = () => {
        hideItem($btnPause);
        showItem($btnStart);
        showItem($btnStop);
        timeDifference = futureDate.getTime() - new Date().getTime();
        clearInterval(idInterval);
    };

    const stopTimer = () => {
        clearInterval(idInterval);
        futureDate = null;
        timeDifference = 0;
        $timerLeft.textContent = '00:00.0';
        init();
    };

    const addZero = value => {
        if ((value < 10)) {
            return "0" + value;
        } else {
            return "" + value;
        }
    };

    const millisecondsMinutesAndSeconds = (milliseconds) => {
        
        const minutes = parseInt(milliseconds / 1000 / 60);
        milliseconds -= minutes * 60 * 1000;
        seconds = (milliseconds / 1000);
        console.log(`${addZero(minutes)}:${addZero(seconds.toFixed(1))}`);
        return `${addZero(minutes)}:${addZero(seconds.toFixed(1))}`;
        
    };

    const init = () => {
        $minutes.value = "";
        $seconds.value = "";
        showItem($inputContainer);
        showItem($btnStart);
        hideItem($btnPause);
        hideItem($btnStop);
    };

    $btnStart.onclick = () => {
        const minutes = parseInt($minutes.value);
        const seconds = parseInt($seconds.value);
        if (isNaN(minutes) || (isNaN(seconds)) || (seconds <= 0 && minutes <= 0)) {
            return;
        }
        startTimer(minutes,seconds);
    };

    init();
    $btnPause.onclick = pauseTimer;
    $btnStop.onclick = stopTimer;
})