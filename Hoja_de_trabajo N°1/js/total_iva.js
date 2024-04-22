function calcular(nro1, nro2) {
    nro1 = parseInt( document.getElementById("nro1").value );
    nro2 = parseFloat( document.getElementById("nro2").value );

    var iva = nro2 / 100;

    if (nro2 > 0) {
        var calculo = nro1 * iva;
    } else {
        var calculo = nro1 * 0.19;
    }

    document.getElementById("total").innerHTML = "El total por el producto es de $" + calculo.toFixed(2);
}