setInterval(
    () => {
        var reloj = document.getElementById("reloj"); // Traemos todos los valores que hay en la clase llamada reloj
        
        var tiempo_actual = new Date(); // Tomamos El valor de la fecha actual e tiempo actual.

        // Tomamos la hora, los minutos y segundos de la fecha actual.
        var hora = tiempo_actual.getHours();
        var minutos = tiempo_actual.getMinutes();
        var segundos = tiempo_actual.getSeconds();

        // Cremos una condicion para agregar 1 cero al momento de llegar al numero sea menor que 10.

        if(hora < 10) {
            hora = `0${hora}`;
        }

        if(minutos < 10) {
            minutos = `0${minutos}`;
        }

        if(segundos < 10) {
            segundos = `0${segundos}`;
        }

        // Mostramos las horas, segundos y minutos actuales
        reloj.innerHTML = `${hora}:${minutos}:${segundos}`;
    }, 1000
);