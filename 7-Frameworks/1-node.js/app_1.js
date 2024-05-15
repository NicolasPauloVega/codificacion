// Importar el modulo 'fs' para trabajar con el sistema de archivos
const fs = require('fs');

// Mensaje que se recibira en el archivo
const message = '¡hello world from Node.js!';

// Ruta y nombre del archivo a crear
const file_path = 'message.txt';

// Escribir el mensaje del archivo
fs.writeFile(file_path, message, (err) => {
    if (err) {
        console.error('Error when writing to the file', err);
    } else {
        console.log(`file ${file_path} created and message written: "${message}"`);
    }
});
