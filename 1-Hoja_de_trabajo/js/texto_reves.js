function reversa() {
    //Creamos una variable que almacene el texto que se pone el input
    var texto = document.getElementById("texto").value;

    //guardamos todo en un array llamado almacen que guarda el valor de la variable anterior
    var almacen = [texto];

    //Se crea una constante que revertira todo los valores de la variable texto (string)
    //Se utilizan 3 metodos los cuales son el split que divide cada caracter de la cadena de texto de manera individual.
    //Se utiliza el metodo reverse para revertir todos los valores o el orden del array
    //Se utiliza el metodo join para unir cada caracter del array
    const reverse = almacen[0].split("").reverse().join("");

    //Mostramos en pantalla todo lo que se hizo
    document.getElementById("texto-resultado").innerHTML = 'El texto "' + texto + '" Tiene el siguiente resultado si se escribe de manera inversa o al revés "' + reverse + '".';
}