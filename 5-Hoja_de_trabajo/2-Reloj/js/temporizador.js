// Esperamos a que se carge todo el contenido del DOM
document.addEventListener(
    "DOMContentLoaded", () => {
        
        // Obtenemos los elementos del DOM
        const $tiempoRestante = document.querySelector('#tiempoRestante'),
            $btnIniciar = document.querySelector('#btn-iniciar'),
            $btnPausar = document.querySelector('#btn-pausar'),
            $btnDetener = document.querySelector('#btn-detener'),
            $minutos = document.querySelector('#minutos'),
            $segundos = document.querySelector('#segundos'),
            $contenedorInputs = document.querySelector('#contenedorInputs');

        // Variables para el intervalo, diferencia temporal y fecha futura
        let idInterval = null, diferenciaTemporal = 0, fechaFuturo = null;

        // Función para mostrar un elemento
        const mostrarElemento = elemento => {
            elemento.style.display = "";
        };

        // Función para ocultar un elemento
        const ocultarElemento = elemento => {
            elemento.style.display = "none";
        };

        // Función para iniciar el temporizador
        const iniciarTemporizador = (minutos, segundos) => {
            // ocultarElemento($contenedorInputs);
            mostrarElemento($btnPausar);
            ocultarElemento($btnIniciar);
            ocultarElemento($btnDetener);

            // Calculamos la fecha futura
            if (fechaFuturo) {
                fechaFuturo = new Date(new Date().getTime() + diferenciaTemporal);
                diferenciaTemporal = 0;
            } else {
                const milisegundos = (segundos + (minutos * 60)) * 1000;
                fechaFuturo = new Date(new Date().getTime() + milisegundos);
            }

            // Limpiamos el intervalo
            clearInterval(idInterval);

            // Creamos el intervalo que actualiza el tiempo restante
            idInterval = setInterval(
                () => {
                    const tiempoRestante = fechaFuturo.getTime() - new Date().getTime();

                    // Actualizamos el tiempo restante en el DOM
                    if (tiempoRestante <= 0) {
                        clearInterval(idInterval);
                        ocultarElemento($btnPausar);
                        mostrarElemento($btnDetener);
                    } else {
                        $tiempoRestante.textContent = milisegundosAMinutosYSegundos(tiempoRestante);
                    }
                }, 50
            );
        };

        // Función para pausar el temporizador
        const pausarTemporizador = () => {
            ocultarElemento($btnPausar);
            mostrarElemento($btnIniciar);
            mostrarElemento($btnDetener);

            // Calculamos la diferencia temporal
            diferenciaTemporal = fechaFuturo.getTime() - new Date().getTime();

            // Limpiamos el intervalo
            clearInterval(idInterval);
        };

        // Función para detener el temporizador
        const detenerTemporizador = () => {
            clearInterval(idInterval);
            fechaFuturo = null;
            diferenciaTemporal = 0;
            $tiempoRestante.textContent = "00:00.0";
            init();
        };

        // Función para agregar un cero si es necesario
        const agregarCeroSiEsNecesario = valor => {
            if (valor < 10) {
                return "0" + valor;
            } else {
                return "" + valor;
            }
        };

        // Función para convertir milisegundos a minutos y segundos
        const milisegundosAMinutosYSegundos = (milisegundos) => {
            const minutos = parseInt(milisegundos / 1000 / 60);
            milisegundos -= minutos * 60 * 1000;
            let segundos = (milisegundos / 1000);
            return `${agregarCeroSiEsNecesario(minutos)}:${agregarCeroSiEsNecesario(segundos.toFixed(1))}`;
        };

        // Función de inicialización
        const init = () => {
            // No necesitas establecer los campos de entrada como cadenas vacías
            // $minutos.value = "";
            // $segundos.value = "";
        
            mostrarElemento($minutos.parentElement.parentElement); // Mostrar contenedor de minutos
            mostrarElemento($segundos.parentElement.parentElement); // Mostrar contenedor de segundos
            mostrarElemento($tiempoRestante); // Mostrar el tiempo restante
        
            mostrarElemento($btnIniciar); // Mostrar botón de iniciar
            ocultarElemento($btnPausar); // Ocultar botón de pausar
            ocultarElemento($btnDetener); // Ocultar botón de detener
        };

        // Evento click para el botón de iniciar
        $btnIniciar.onclick = () => {
            const minutos = parseInt($minutos.value);
            const segundos = parseInt($segundos.value);
        
            if (isNaN(minutos) || isNaN(segundos) || (segundos <= 0 && minutos <= 0)) {
                return;
            }
            iniciarTemporizador(minutos, segundos);
        };

        // Inicialización
        init();

        // Eventos click para los botones de pausar y detener
        $btnPausar.onclick = pausarTemporizador;
        $btnDetener.onclick = detenerTemporizador;
    }
)