let contar = 0;
let bnt = document.getElementById("btn-1");
let btn1 = document.getElementById("btn-2");
var conteo = document.getElementById("resultado");

bnt.addEventListener("click", printClick);

function printClick(){
    contar ++;
    document.getElementById("conteo").innerHTML = contar;
}

btn1.addEventListener("click", printClick1);

function printClick1() {
    contar = 0;
    document.getElementById("conteo").innerHTML = contar;
}