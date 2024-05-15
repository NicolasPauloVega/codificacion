// Importar Express.js
const express = require('express');

// Crear una aplicacion Express
const app = express();

// Definir el puerto en el que se ejecutará el servidor
const port = 3000;

// Ruta raíz
app.get('/', (req, res) => {
    // Responder con un mensaje de saludo
    res.send('¡Hello world for Express.js!');
});

// Ruta de ejemplo con parámetros
app.get('/greeting/:name', (req, res) => {
    // Obtener el parámetro 'nombre' de la URL
    const name = req.params.name;
    // responder con un mensaje personalizado usando el párametro
    res.send(`¡Hello, ${name}!`);
});

// Manejador de errores para rutas no encontradas
app.use((req, res, next) => {
    // Responder con un mensaje de error y un codigo de estado 404
    res.status(404).send('Route not found');
});

// Iniciar el servidor y escuchar en el puerto especificado
app.listen(port, () => {
    // Imprimir un mensaje en la consola cuando el servidor se inicie correctamente
    console.log(`Express.js server listening on port ${port}`);
});