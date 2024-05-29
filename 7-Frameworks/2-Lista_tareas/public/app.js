// Esperamos a que el contenido de la página esté cargado
document.addEventListener('DOMContentLoaded', () => {
  const tareasList = document.getElementById('tareasList'); // Obtenemos el elemento de la lista de tareas
  const tareaForm = document.getElementById('tareaForm'); // Obtenemos el formulario de tareas
  const tareaInput = document.getElementById('tareaInput'); // Obtenemos el campo de texto para la nueva tarea

  // Función para obtener y mostrar las tareas
  const obtenerTareas = async () => {
    const res = await fetch('/api/tareas'); // Pedimos las tareas al servidor
    const tareas = await res.json(); // Convertimos la respuesta a JSON
    tareasList.innerHTML = ''; // Limpiamos la lista de tareas en la página
    tareas.forEach(tarea => {
      const li = document.createElement('li'); // Creamos un nuevo elemento de lista
      li.textContent = tarea.texto; // Ponemos el texto de la tarea

      // Creamos el botón de eliminar
      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = 'Eliminar'; // Ponemos el texto del botón
      btnEliminar.onclick = async () => {
        await fetch(`/api/tareas/${tarea.id}`, {
          method: 'DELETE' // Indicamos que queremos borrar la tarea
        });
        obtenerTareas(); // Actualizamos la lista de tareas
      };

      // Creamos el botón de editar
      const btnEditar = document.createElement('button');
      btnEditar.textContent = 'Editar'; // Ponemos el texto del botón
      btnEditar.onclick = () => {
        const nuevoTexto = prompt('Editar tarea:', tarea.texto); // Pedimos el nuevo texto
        if (nuevoTexto) {
          const tareaActualizada = { id: tarea.id, texto: nuevoTexto }; // Creamos el objeto con la tarea actualizada
          fetch(`/api/tareas/${tarea.id}`, {
            method: 'PUT', // Indicamos que queremos actualizar la tarea
            headers: {
              'Content-Type': 'application/json' // Indicamos que enviamos datos en formato JSON
            },
            body: JSON.stringify(tareaActualizada) // Enviamos la tarea actualizada
          }).then(() => obtenerTareas()); // Actualizamos la lista de tareas
        }
      };

      li.appendChild(btnEliminar); // Añadimos el botón de eliminar a la tarea
      li.appendChild(btnEditar); // Añadimos el botón de editar a la tarea
      tareasList.appendChild(li); // Añadimos la tarea a la lista en la página
    });
  };

  // Función para agregar una nueva tarea
  tareaForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevenimos el comportamiento por defecto del formulario
    const nuevaTarea = { id: Date.now().toString(), texto: tareaInput.value }; // Creamos la nueva tarea
    await fetch('/api/tareas', {
      method: 'POST', // Indicamos que queremos crear una nueva tarea
      headers: {
        'Content-Type': 'application/json' // Indicamos que enviamos datos en formato JSON
      },
      body: JSON.stringify(nuevaTarea) // Enviamos la nueva tarea
    });
    tareaInput.value = ''; // Limpiamos el campo de texto
    obtenerTareas(); // Actualizamos la lista de tareas
  });

  obtenerTareas(); // Llamamos a la función para obtener y mostrar las tareas al cargar la página
});