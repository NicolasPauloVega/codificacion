//Creamos una variable que tome de referencio el contenedor (div) con la clase clock pues sera donde se encontrara el reloj
const clock = document.querySelector(".clock");

//Vamos a crear una funcion llamada tick.
function tick() {
    //Creamos una variable la cual nos permita llamar al contructor new date
    const now = new Date();

    //variable para almacenar la hora
    const hour = now.getHours();
    //variable para almacenar los minutos
    const minute = now.getMinutes();
    //variable para almacenar los segundos
    const second = now.getSeconds();

    //console.log(hour,minute,second); //se comprueba si funciona

    //Creamos una etiqueta html (<span>) la cual almacena los valores de las variables hour, minute y second
    const html = `<span>${hour}</span> : <span>${minute}</span> : <span>${second}</span>`;
    
    //Finalmente lo mostramos en el contenedor.
    clock.innerHTML = html;
}

//Usamos el metodo serInterval para poder llamar la funcion.
setInterval(tick, 1000); //Colocamos como primer paramatro la funcion tick y como segundo para metro 1000 que representan los milisigundos lo que se hace es que se repita la funcion cada segundo.
