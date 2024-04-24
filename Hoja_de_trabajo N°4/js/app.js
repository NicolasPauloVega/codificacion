// Creamos un objeto llamado TaskManager para administrar las tareas.
const TaskManager = {
    // Creamos un arreglo para almacenar las tareas.
    tasks: [],
    
    // Función para agregar una nueva tarea al arreglo.
    addTask(taskName) {
        // Creamos un objeto que representa la tarea con su nombre y un estado de completado inicialmente falso.
        const Task = {
            name: taskName,
            complete: false
        }

        // Agregamos la nueva tarea al arreglo de tareas.
        this.tasks.push(Task)

        // Después de agregar la tarea, limpiamos el campo de entrada para futuras tareas.
        document.getElementById("enter-task").value = '';

        // Llamamos a la función render para mostrar la lista actualizada de tareas.
        this.render();
    },

    // Función para mostrar la lista de tareas en pantalla.
    render(){
        // Obtenemos el contenedor donde se mostrarán las tareas.
        let container = document.getElementById("list-task");

        // Limpiamos el contenedor antes de renderizar las tareas para evitar duplicados.
        container.innerHTML = '';

        // Iteramos sobre las tareas y las mostramos una por una en la lista.
        this.tasks.forEach(Task => {
            // Creamos un elemento de lista para cada tarea.
            const elements = document.createElement('li');

            // Mostramos el nombre de la tarea en el elemento de lista.
            elements.textContent = Task.name;

            // Agregamos la tarea a la lista.
            container.appendChild(elements);
        })

    }
};

// Obtenemos el formulario donde el usuario ingresará nuevas tareas.
const taskForm = document.getElementsByName("task-form");

// Iteramos sobre los formularios (en caso de haber más de uno).
taskForm.forEach(form => {
    // Agregamos un evento de escucha para cuando se envíe el formulario.
    form.addEventListener("submit", function(event) {
        // Evitamos que el formulario se envíe y recargue la página.
        event.preventDefault();

        // Obtenemos el nombre de la tarea ingresado por el usuario.
        const taskName = document.getElementById("enter-task").value;

        // Agregamos la tarea al TaskManager para su gestión.
        TaskManager.addTask(taskName);
    });
});
