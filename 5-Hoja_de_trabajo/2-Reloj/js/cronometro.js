// Esperamos a que se carge todo el contenido con la palabra "DOMContentLoaded"
document.addEventListener(
    'DOMContentLoaded', () => {

        // Obtenemos todos los valores del DOM.
        const $tiempoTranscurrido = document.querySelector('#tiempoTranscurrido'),
            $btnIniciar = document.querySelector('#btnIniciar'),
            $btnPausar = document.querySelector('#btnPausar'),
            $btnMarca = document.querySelector('#btnMarca'),
            $btnDetener = document.querySelector('#btnDetener'),
            $ContenedorMarcas = document.querySelector('#contenedorMarcas');

        // Creamos variables para almacenar las marcas, obtener el id del interval y un tiempo de inicio que esta en un valor nulo
        let marcas = [],
            idInterval,
            tiempoInicio = null,
            tiempoPausa = null;
        
        // Creamos una variable para calcular la diferencia temporal del cronometro
        let diferenciaTemporal = 0;

        // Creamos algunas funciones una para ocultar un elemento si es necesario y otra para mostrarlo
        const ocultarElemento = elemento => {
            elemento.style.display = "none";
        };

        const mostrarElemento = elemento => {
            elemento.style.display = "";
        }

        // Creamos una funcion la cual agrega un cero en el caso de ser necesario en el caso de ser un numero menor que cero
        const agregarCeroSiEsNecesario = valor => {
            if (valor < 10) {
                return "0" + valor;
            } else {
                return "" + valor;
            }
        };

        // Creamos una funcion que nos permite calcular los minutos y segundos utilizando los milisegundos (pasando de milisegundos a minutos y segundos)
        const milisegundosAMinutosYSegundos = (milisegundos) => {
            const minutos = parseInt(milisegundos / 1000 / 60);
            milisegundos -= minutos * 60 * 1000;
            let segundos = milisegundos / 1000;
            return `${agregarCeroSiEsNecesario(minutos)}:${agregarCeroSiEsNecesario(segundos.toFixed(1))}`; // usamos toFixed(1) para que redondee el numero y lo muestre una decima
        };

        // Creamos alfunas funciones que nos ayudaran para el funcionamiento del cronometro.
        // Para esto vamos a utilizar la variable diferenciaTemporal la cual nos ayudara a calcular el tiempo en el que esta el cronometro.

        // Función para iniciar el cronómetro
        const iniciar = () => {
            const ahora = new Date(); // Tomamos los valores del tiempo actual
            // Calcula el tiempo de inicio teniendo en cuenta el tiempo pausado, si lo hay
            tiempoInicio = new Date(ahora.getTime() - (tiempoPausa || 0));
            //tiempoInicio = new Date(ahora.getTime() - diferenciaTemporal); // Restamos la hora actual con la hora que tiene la variable diferenciaTemporal
            clearInterval(idInterval); // Limpia el intervalo anterior, si existe
            idInterval = setInterval(refrescarTiempo, 100); // Cada cien milisegundo llamamos a la función refrescarTiempo para actualizar el tiempo
            // Ahora ocultamos algunos botones y los mostramos
            ocultarElemento($btnIniciar);
            ocultarElemento($btnDetener);
            mostrarElemento($btnMarca);
            mostrarElemento($btnPausar);
        };

        // Función para pausar el cronómetro
        const pausar = () => {
            clearInterval(idInterval); // Detiene el intervalo que actualiza el tiempo del cronómetro
            tiempoPausa = new Date().getTime() - tiempoInicio.getTime();
            // ahora ocultamos y mostramos botones
            mostrarElemento($btnIniciar);
            ocultarElemento($btnMarca);
            ocultarElemento($btnPausar);
            mostrarElemento($btnDetener);
        };

        // Creamos una funcion para refrescar el tiempo del cronometro pues lo unico que hace es cambiar la diferencia del tiempo.
        const refrescarTiempo = () => {
            const ahora = new Date();
            const diferencia = ahora.getTime() - tiempoInicio.getTime();
            $tiempoTranscurrido.textContent = milisegundosAMinutosYSegundos(diferencia);
        };

        // Creamos una funcion para poder colocar una marca de tiempo en el cronometro
        const ponerMarca = () => {
            marcas.unshift(new Date() - tiempoInicio.getTime());
            dibujarMarcas(); // Mostramos la marca en pantalla
        };

        // Creamos una funcion para mostrar la marca en pantalla
        const dibujarMarcas = () => {
            $ContenedorMarcas.innerHTML = "";
            // Creamos un bucle para poder recorrer todas las marcas
            for (const [indice, marca] of marcas.entries()) {
                const $p = document.createElement("p"); // Creamos un elemento p que es un parrafo
                $p.innerHTML = `<strong>${marcas.length - indice}.</strong> ${milisegundosAMinutosYSegundos(marca)}`; // Calculamos para mostrar el numero de manera decreciente es decir de 10 a 0
                $ContenedorMarcas.append($p); // Añadimos el parrafo al contenedor de marcas
            };
        };

        // Creamos una funcion para detener el cronometro
        const detener = () => {
            // Creamos una coondicion la cual se encargara de preguntarle al usuario si desea detener el cronometro y si no lo confirma entonces no lo detenga
            if (!confirm("¿Detener?")) {
                return;
            };
            clearInterval(idInterval); // Deja de ejecutar la funcion que recarga cada 100 milisegundos el intervalo
            init(); // Llama a la funcion init
            marcas = []; // Elimina todas las marcas
            dibujarMarcas(); // Elimina las marcas
            diferenciaTemporal = 0; // Reinicia la linea temporal
        };

        // Creamos la funcion init la cual elimina el tiempo transcurrido y oculta botones.
        const init = () => {
            $tiempoTranscurrido.textContent = "00:00.0";
            ocultarElemento($btnPausar);
            ocultarElemento($btnMarca);
            ocultarElemento($btnDetener);
        };

        init(); // Llamamos a la funcion init al momento de recargar la pagina

        // Colocamos los listenitems
        $btnIniciar.onclick = iniciar;
        $btnMarca.onclick = ponerMarca;
        $btnPausar.onclick = pausar;
        $btnDetener.onclick = detener;
    }
)