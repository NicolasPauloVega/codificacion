//Vamos a crear una funcion llamada PI_Decimales(){}
function PI_Decimales() {
    //Creamos una variable la cual va a almacenar el resultado de PI.
    //Usamos el metodo "toFixed(2);" para poder escoger la cantidad de decimales que se desean.
    var resultado = Math.PI.toFixed(2);
    //Lo que hacemos aqui es mostrar en pantalla el resultado de la variable.
    document.getElementById("resultado").innerHTML = "El valor de Pi con solo 2 decimales es: "+resultado;
}