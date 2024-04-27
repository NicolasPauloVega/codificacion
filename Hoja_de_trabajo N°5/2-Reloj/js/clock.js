//Se crea una funcion llamada "currentTime()" la cual nos ayudará mostrar la hora en la pagina.
function currentTime() {
    //Creamo una variable let que nos permite capturar la hora y la fecha actual.
    let date = new Date();
    //Creamos 3 variables let "hh,mm,ss" que nos permite tomar la hora, los minutos y los segundos de la fecha actual.
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    // Creamos una condicion para horas la cual si el numero es menor que 10 entonces se concatena un "0" esto nos permite que el numero no sea superior a 2 digitos y se aplica para la variable hh o hora.
    hh = (hh < 10) ? "0" + hh : hh;

    // Creamos una condicion para minutos la cual si el numero es menor que 10 entonces se concatena un "0" esto nos permite que el numero no sea superior a 2 digitos y se aplica para la variable mm o minutos.
    mm = (mm < 10) ? "0" + mm : mm;

    // Creamos una condicion para segundos la cual si el numero es menor que 10 entonces se concatena un "0" esto nos permite que el numero no sea superior a 2 digitos y se aplica para la variable ss o segundos.
    ss = (ss < 10) ? "0" + ss : ss;

    //Creamos una varibale la cual almacena una cadena de texto con el formato de hora,minutos y segundos (h:m:s)
    let time = hh + ":" + mm + ":" + ss;

    //Creamos una variable la cual busca el valor del html que tenga el id "watch"
    let watch = document.querySelector("#watch");

    //Finalmente actualizamos el contenido del html "watch" y lo mostramos en la pagina tomando los valores de la variable "time"
    watch.innerHTML = time;
}

//Utilizamos la funcion setInterval para actualizar la funcion "currentTime()" cada segundo.
setInterval(currentTime, 1000);