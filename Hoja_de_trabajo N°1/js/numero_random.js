function number_random(min, max) {
    //asignamos una cantidad maxima y minima para realizar el calculo.
    min = 1;
    max = 1000;

    //creamos un arreglo que almacenen los numeros
    var numero = [];
    //Ponemos un numero por defecto
    var numero_defecto = 100;

    //Se crea un siglo que va a comprobar si la longitud del arreglo es menor o igual al numero que se trae por defecto
    while (numero.length <= numero_defecto) {
        //Va a agregar al arreglo numeros aleatorios del 1 al 1000. (Math.floor numeros enteros)
        var num = Math.floor(0 || 1001 * Math.random());
        //Vamos a crear una condicion que compruebe si el numero del array (numero) no esta repetido si no esta repetido lo muestra si esta repetido no lo muestra.
        //!numero.includes(num) es una expresion que comprueba si un numero esta en el arreglo.
        if (!numero.includes(num)) {
            //Agregamos el numero al arreglo.
            numero.push(num);
        }
    }

    //Mostramos el resultado que se desea en la pantalla
    document.getElementById("resultado").innerHTML = "Numeros: <br>" + numero.join(" ");
}
