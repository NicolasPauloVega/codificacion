// Importar el modulo 'http' para crear un cliente HTTP
const { error } = require('console');
const http = require('http');

// Opciones de conexión al servidor HTTP
const options = {
    hostname: 'localhost', // Nombre del host del servidor al que nos conectaremos
    port: 8080, // Puerto del servidor al que nos conectaremos
    path: '/', // Ruta en el servidor a la que haremos la solucitud
    method: 'GET' // Método de solucitud que utilizaremos (en este caso, una solicitud GET)
};

// Realizar una solicitud HTTP GET al servidor
const request = http.request(options, (res) => {
    let data = ''; // Varible para almacenar los datos recibidos del servidor

    // Almacenar los datos recibidos en una cadena buffer de datos
    res.on('data', (chunk) => {
        data += chunk; // Agregar los datos recibidos al final de la cadena
    });

    // Cuando se completa la recepcion de datos, mostrarlos en la consola
    res.on('end', () => {
        console.log('Message received from the server:', data); // Mostrar los datos recibidos en la consola
    });
});

// Mensaje errores en la solicitud
request.on('error', (err) => {
    console.error('Application error:', err); // Mostrar errores de solicitud en la consola
});

// Finalizar la solicitud
request.end(); //Indicar que hemos terminado de configurar la solicitud y enviarla al servidor