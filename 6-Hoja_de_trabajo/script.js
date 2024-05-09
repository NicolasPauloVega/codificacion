// Primero crearemos una clase llamada empleado el cual tiene las propiedades del nombre, el cargo y la edad
class Empleado {
    // Creamos un metodo contructor para poder crear instancias
    constructor(nombre, cargo, edad) {
        this.nombre = nombre;
        this.cargo = cargo;
        this.edad = edad;
    }
}

// Creamos una clase llamada gestor de empleados la cual almacena los empleados
class Gestor_empleado {
    // Creamos un metodo contructor el cual tiene como prioridad los empleados
    constructor() {
        // Creamos un arreglo
        this.empleados = [];
        // Creamos un indice para guardar al empleado que se este editando
        this.editar_indice = null;
    }

    // Creamos un metodo para agregar un nuevo empleado
    agregar_empleado(nombre, cargo, edad) {
        // Creamos una instancia para cargar al empleado
        const empleado = new Empleado(nombre, cargo, edad);
        // Añadimos el empleado al arreglo
        this.empleados.push(empleado);
    }

    // Creamos un metodo para mostrar al empleado
    mostrar_empleado() {
        // Tomamos el valor del div para mostrar los empleados
        const lista_empleados = document.getElementById("lista-empleados");
        lista_empleados.innerHTML = ''; // Limpiamos el contenedor de la lista de empleados
        
        // Creamos un ciclo para iterar sobre la lista de empleados
        this.empleados.forEach((empleado, index) => {
            // Ceramos un nuevo elemento en este caso un contenedor (div)
            const contenedor_empleado = document.createElement('div');
            // Añadimos al contenido un empleado
            contenedor_empleado.classList.add('empleado');
            // Añadimos al contenido un codigo html donde dice el nombre, edad y cargo del empleado acompañado de un boton para eliminar y otro para editar
            contenedor_empleado.innerHTML = `<strong>${empleado.nombre}</strong> - ${empleado.edad} - ${empleado.cargo}. <br> <button class="editar-boton" data-index="${index}">Editar</button> <button class="eliminar-boton" data-index="${index}">Eliminar</button>`;
            // Finlmente lo ñadimos a la lista de empleados
            lista_empleados.appendChild(contenedor_empleado);
        });

        // Creamos un evento para que cuando se de click en editar el boton funcione correctamente (tomando de referencia el indice)
        const editar_boton = document.querySelectorAll(".editar-boton");
        // iteramos sobre el boton de editar para poder encontrar su indice y mostrar en el contenedor
        editar_boton.forEach(boton => {
            boton.addEventListener('click', () => {
                const indice = boton.getAttribute('data-index');
                this.editar_empleado(indice);
            });
        });

        // Creamos un evento para que cuando se de click elimine el elemento correspondiente(tomando de referencia el indice)
        const eliminar_boton = document.querySelectorAll(".eliminar-boton");
        // iteramos sobre el boton de eliminar para poder encontrar su indice y eliminarlo en el contenedor
        eliminar_boton.forEach(button => {
            button.addEventListener('click', () => {
                const indice = button.getAttribute('data-index');
                this.eliminar_empleado(indice);
            });
        });
    }

    // Creamos un metodo para editar el empleado (tomando de base en indice)
    editar_empleado(indice) {
        // Establecemos el indice del empleado que se busca editar
        this.editar_indice = indice;

        // Vamos a obtener el valor del empleado que se desea buscar para editar
        const empleado = this.empleados[indice];

        // Establecer los valores de los campos de entrada del formulario con los valores existentes del empleado
        document.getElementById('nombre').value = empleado.nombre;
        document.getElementById('cargo').value = empleado.cargo;
        document.getElementById('edad').value = empleado.edad;

        // Ahora ocultaremos el boton de agregar y mostraremos los botones de actualizar o editar y el de cancelar por si no se desea editar ese empleado
        document.getElementById('editar-boton').style.display = 'inline';
        document.getElementById('cancelar-boton').style.display = 'inline';
        document.getElementById('agregar-boton').style.display = 'none';
    }

    // Creamos un metodo para actualizar el empleado
    actualizar_empleado() {
        // Obtenemos el índice del empleado en edición
        const indice = this.editar_indice;

        // Obtenemos los nuevos valores de los campos del formulario
        const nuevoCargo = document.getElementById('cargo').value;

        // Actualizamos solo el campo de cargo del empleado en la lista
        this.empleados[indice].cargo = nuevoCargo;

        // Limpiamos los campos del formulario
        document.getElementById('nombre').value = '';
        document.getElementById('cargo').value = '';
        document.getElementById('edad').value = '';

        // Restauramos el estado inicial de edición
        this.editar_indice = null;

        // Mostramos nuevamente la lista de empleados actualizada
        this.mostrar_empleado();

        // Mostramos y ocultamos los botones de agregar y editar
        document.getElementById('agregar-boton').style.display = 'inline';
        document.getElementById('editar-boton').style.display = 'none';
        document.getElementById('cancelar-boton').style.display = 'none';
    }

    // Creamos un metodo el cual se encargara de eliminar el empleado indice
    eliminar_empleado(indice) {
        // Elimina al empleado utilizando el indice seleccionado
        this.empleados.splice(indice, 1);
        // Mostramos la lista de empleados
        this.mostrar_empleado();
    }
}

// Crearemos una instancia la cual nos permita interactuar con la lista de empleados
const gestor_empleado = new Gestor_empleado();

// Ahora crearemos un evento para el formulario
document.getElementById('formulario-empleado').addEventListener('submit', function(e) {
    // Evitamos que la pagina se recarge al momento de enviar el formulario
    e.preventDefault();

    // Ahora vamos a utilizar de referencia los campos de entrada del formulario
    const ingresar_nombre = document.getElementById('nombre');
    const ingresar_cargo = document.getElementById('cargo');
    const ingresar_edad = document.getElementById('edad');

    // Ahora vamos a obtener los valores de los campos y los limpia si llegan a tener espacios entre si o al final
    const nombre = ingresar_nombre.value.trim();
    const cargo = ingresar_cargo.value.trim();
    const edad = parseInt(ingresar_edad.value);

    // Ahora vamos a comprobar si se ingresaron valores correctamente
    if (nombre && cargo && !isNaN(edad)) {
        // Si no se esta editando algun empleado entonces llamamos al metodo que agrega empleados de la clase que nos ayuda a gestionar los empleados
        if (gestor_empleado.editar_indice === null) {
            gestor_empleado.agregar_empleado(nombre, cargo, edad); // Cambié el orden de los parámetros aquí
        } else {
            // Si no se esta agregando sino que editando entonces se llama al metodo que actualiza o edita del gestor de empleados
            gestor_empleado.editar_empleado(gestor_empleado.editar_indice); // No es necesario pasar los parámetros aquí
        }
        // Despues de agregar o editar un empleado llamamos al metodo para mostrar la lista de los empleados actualizada
        gestor_empleado.mostrar_empleado();
        // Limpiamos todos los campos del formulario para poder ingresar nuevos datos
        document.getElementById('nombre').value = '';
        document.getElementById('cargo').value = '';
        document.getElementById('edad').value = '';
    } else {
        // Si algun campo no esta lleno o esta vacio arrojara un mensaje de error
        alert('Por favor Ingresa un nombre, una edad o un cargo para el empleado.');
    }
});

// Ahroa vamos a crear un evento para el boton de cancelar
document.getElementById('cancelar-boton').addEventListener('click', function() {
    // Vamos a decirle al programa que al indice al cual se le dio editar (basado en el indice) le diga que ya no edite al empleado
    gestor_empleado.editar_indice = null;
    // Limpiamos los valores del campo del formulario
    document.getElementById('nombre').value = '';
    document.getElementById('cargo').value = '';
    document.getElementById('edad').value = '';
    // Mostramos y ocultamos los botones de actualizar, agregar y cancelar
    document.getElementById('agregar-boton').style.display = 'inline'; // Boton de agregar
    document.getElementById('editar-boton').style.display = 'none'; // Boton de editar
    document.getElementById('cancelar-boton').style.display = 'none'; // Boton de cancelar
});
