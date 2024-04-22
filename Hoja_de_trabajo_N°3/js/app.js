const caracteres = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[{]},<.>/?`~";

let btn = document.getElementById("btn-1");

btn.addEventListener("click", generate);


function generate() {
    let longitud = 10;
    var contraseña_aleatoria = "";
    for (let i = 0; i <= longitud; i++) {
        var aleatorio = Math.floor(Math.random() * caracteres.length);

        if (!contraseña_aleatoria.includes(aleatorio)) {
            contraseña_aleatoria += caracteres[aleatorio];
        }
    }
    document.getElementById("password").innerHTML = "La contraseña generada es " + contraseña_aleatoria;
}