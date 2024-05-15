// Importar el modulo 'http' para crear un servidor HTTP
const http = require('http');

// Importar el modulo 'fs' para leer el archivo
const fs = require('fs');

// Creamos el servidor HTTP
const server = http.createServer((req, res) => {
    console.log('order received'); //Imprimir un mensaje en la consola cuando reciba una solicitud

    // Leer el contenido del archivo 'mensaje.txt'
    re.readFile('message.txt', (err, data) => {
        if (err){ // Verificar si ocurrio un error al leer el archivo
            // Enviar el mensaje de error si ocurrio un error al leer el archivo
            res.writeHead(500, {'content-Type': 'text/plain'});
            // Configurar el encabezado de la respuesta con el codigo de estado 500 (Error interno del servidor)
            res.end('Error reading the file');
            // Enviar el mensaje de error como cuerpo de la respuesta
            console.error('Error reading the file:',err); // Imprimir el error en la consola
        } else {
            // Enviar el contenido del archivo como respuesta HTTP si no ocurrió ningun error
            res.writeHead(200, {'content-Type': 'text/plain'});
            // Cofigurar el encabezado de la respuesta con el 
        }
    })
})