// Crearemos una funcion para poder obtener la fecha actual
function obtener_fecha() {
    // Obtenenmos la fecha actual
    let fecha_actual = new Date();

    // Creamos una variable la cual nos permita obtener todos los dias de la semana
    let dias_semana = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "viernes", "Sabado"];
    let nombre_dia = dias_semana[fecha_actual.getDay()];

    // Obtenemos el dia mediante el numero del mismo
    let numero_dia = fecha_actual.getDate();

    // Creamos una variable la cual nos permita obtener todos los meses del año
    let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let nombre_mes = meses[fecha_actual.getMonth()];

    // Creamos una variable la cual nos permita obtener el año actual
    let anno = fecha_actual.getFullYear();

    // Creamos una variable que almacene lo que se desea mostrar.
    let fecha = `${nombre_dia} - ${numero_dia} de ${nombre_mes} del ${anno}`;

    // Retornamos el valor de la fecha actual
    return fecha;
}

// Creamos una funcion para mostrar la fecha en la pantalla
function mostrar_fecha() {
    // Creamos una variable la cual tome los valores del id "fecha"
    let contenedor_fecha = document.getElementById("fecha");

    // Creamos una variable la cual obtenga todos los valores de la funcion para obtener la fecha
    let obtenerFecha = obtener_fecha();

    // Mostramos el contenido que se desea en la pagina
    contenedor_fecha.textContent = obtenerFecha;
}

// Llamamos a la funcion para mostrar lo que deseamos en la variable
mostrar_fecha();