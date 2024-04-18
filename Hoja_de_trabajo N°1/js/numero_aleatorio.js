function aleatorio(min, max) {
    //Establecemos los valores minimos y maximos.
    min = 1;
    max = 100;

    //Creamos una variable que almacene los valores de valor numerico que venga del input
    var numero = parseInt( document.getElementById("nro1").value );
    var array = []; //Creamos un arreglo que almacena los numeros aleatorios.

    //Creamos un siclo que se ejecute siempre y cuando la longitud del array sea menor que el numero colocado por el usuario.
    while (array.length < numero) {
        array.push(Math.floor(101*Math.random()));//Genera numeros enteros (Math.floor redondea al numero entero mas sercano) aleatorios entre el 0 y el 100
        document.getElementById("resultado").innerHTML="El resultado de los numeros escogidos de manera aleatoria son: " + array; //Mostramos el resultado deseado en pantalla.
    }
}
