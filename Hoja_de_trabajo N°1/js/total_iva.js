function resultado(n1, n2=0.9) {
    let calculo = n1 * (1+n2);
    document.getElementById("total").innerHTML = "El total por el producto es de "+calculo;
}