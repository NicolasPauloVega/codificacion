// Importamos las bibliotecas que necesitamos
const express = require('express'); // Framework para manejar el servidor
const bodyParser = require('body-parser'); // Para manejar datos enviados en peticiones
const fs = require('fs'); // Para trabajar con archivos
const app = express(); // Creamos la aplicación del servidor
const PORT = 3000; // Definimos el puerto en el que correrá el servidor

// Permitimos que el servidor entienda datos en formato JSON
app.use(bodyParser.json());
// Permitimos el acceso a los archivos en la carpeta "public"
app.use(express.static('public'));

// Ruta para obtener las tareas
app.get('/api/tareas', (req, res) => {
  // Leemos el archivo de tareas
  fs.readFile('tareas.json', 'utf8', (err, data) => {
    if (err) {
      // Si hay un error al leer, respondemos con un error
      return res.status(500).send('Error al leer las tareas');
    }
    // Enviamos las tareas como respuesta
    res.send(JSON.parse(data));
  });
});

// Ruta para crear una nueva tarea
app.post('/api/tareas', (req, res) => {
  // Leemos el archivo de tareas
  fs.readFile('tareas.json', 'utf8', (err, data) => {
    if (err) {
      // Si hay un error al leer, respondemos con un error
      return res.status(500).send('Error al leer las tareas');
    }
    const tareas = JSON.parse(data); // Convertimos las tareas a un objeto
    const nuevaTarea = req.body; // Obtenemos la nueva tarea enviada
    tareas.push(nuevaTarea); // Añadimos la nueva tarea a la lista
    // Guardamos las tareas actualizadas en el archivo
    fs.writeFile('tareas.json', JSON.stringify(tareas, null, 2), (err) => {
      if (err) {
        // Si hay un error al guardar, respondemos con un error
        return res.status(500).send('Error al guardar la tarea');
      }
      // Enviamos la nueva tarea como respuesta
      res.send(nuevaTarea);
    });
  });
});

// Ruta para actualizar una tarea
app.put('/api/tareas/:id', (req, res) => {
  // Leemos el archivo de tareas
  fs.readFile('tareas.json', 'utf8', (err, data) => {
    if (err) {
      // Si hay un error al leer, respondemos con un error
      return res.status(500).send('Error al leer las tareas');
    }
    const tareas = JSON.parse(data); // Convertimos las tareas a un objeto
    const id = req.params.id; // Obtenemos el id de la tarea a actualizar
    const tareaActualizada = req.body; // Obtenemos los datos actualizados de la tarea
    const index = tareas.findIndex(t => t.id === id); // Buscamos la tarea por id
    if (index === -1) {
      // Si no encontramos la tarea, respondemos con un error
      return res.status(404).send('Tarea no encontrada');
    }
    tareas[index] = tareaActualizada; // Actualizamos la tarea
    // Guardamos las tareas actualizadas en el archivo
    fs.writeFile('tareas.json', JSON.stringify(tareas, null, 2), (err) => {
      if (err) {
        // Si hay un error al guardar, respondemos con un error
        return res.status(500).send('Error al actualizar la tarea');
      }
      // Enviamos la tarea actualizada como respuesta
      res.send(tareaActualizada);
    });
  });
});

// Ruta para borrar una tarea
app.delete('/api/tareas/:id', (req, res) => {
  // Leemos el archivo de tareas
  fs.readFile('tareas.json', 'utf8', (err, data) => {
    if (err) {
      // Si hay un error al leer, respondemos con un error
      return res.status(500).send('Error al leer las tareas');
    }
    let tareas = JSON.parse(data); // Convertimos las tareas a un objeto
    const id = req.params.id; // Obtenemos el id de la tarea a borrar
    tareas = tareas.filter(t => t.id !== id); // Quitamos la tarea de la lista
    // Guardamos las tareas actualizadas en el archivo
    fs.writeFile('tareas.json', JSON.stringify(tareas, null, 2), (err) => {
      if (err) {
        // Si hay un error al guardar, respondemos con un error
        return res.status(500).send('Error al borrar la tarea');
      }
      // Enviamos un mensaje de confirmación
      res.send({ message: 'Tarea borrada' });
    });
  });
});

// Iniciamos el servidor y escuchamos en el puerto definido
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});