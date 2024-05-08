       // Definición de las clases Libro y Usuario

        // Clase para representar un libro
        class Libro {
            constructor(titulo, autor, paginas) {
                this.titulo = titulo;
                this.autor = autor;
                this.paginas = paginas;
            }
        }

        // Clase para representar un usuario
        class Usuario {
            constructor(nombre, edad) {
                this.nombre = nombre;
                this.edad = edad;
                this.librosPrestados = [];
            }

            // Método para tomar prestado un libro
            tomarPrestadoLibro(libro) {
                this.librosPrestados.push(libro);
            }

            // Método para devolver un libro
            devolverLibro(libro) {
                const index = this.librosPrestados.findIndex(l => l.titulo === libro.titulo);
                if (index > -1) {
                    this.librosPrestados.splice(index, 1);
                }
            }
        }

        // Obtener los elementos del DOM
        const libroTitulo = document.getElementById("libro-titulo");
        const libroAutor = document.getElementById("libro-autor");
        const libroPaginas = document.getElementById("libro-paginas");
        const usuarioNombre = document.getElementById("usuario-nombre");
        const usuarioEdad = document.getElementById("usuario-edad");
        const usuarioLibros = document.getElementById("usuario-libros");

        // Crear una instancia de Usuario
        const usuario1 = new Usuario("", 0);

        // Función para agregar un libro prestado al usuario
        function agregarLibro() {
            const titulo = libroTitulo.value;
            const autor = libroAutor.value;
            const paginas = parseInt(libroPaginas.value);

            // Validar datos de entrada
            if (!titulo || !autor || isNaN(paginas)) {
                alert('Por favor, complete todos los campos.');
                return;
            }

            //  
            const libro = new Libro(titulo, autor, paginas);
            usuario1.tomarPrestadoLibro(libro);

            // Limpiar los campos de entrada
            libroTitulo.value = "";
            libroAutor.value = "";
            libroPaginas.value = "";

            // Actualizar la lista de libros prestados
            actualizarListaLibros();
        }

        // Función para actualizar la lista de libros prestados
        function actualizarListaLibros() {
            usuarioLibros.innerHTML = "";

            // Recorrer la lista de libros prestados y mostrarlos en la lista del usuario
            usuario1.librosPrestados.forEach(libro => {
                const li = document.createElement("li");
                li.textContent = `${libro.titulo} - ${libro.autor} (${libro.paginas} páginas)`;

                // Crear botón para devolver libro
                const button = document.createElement("button");
                button.textContent = "Devolver";
                button.addEventListener("click", () => {
                    usuario1.devolverLibro(libro);
                    actualizarListaLibros();
                });

                li.appendChild(button);
                usuarioLibros.appendChild(li);
            });
        }

        // Capturar información del usuario y actualizar el objeto usuario
        function capturarInformacionUsuario() {
            const nombre = usuarioNombre.value;
            const edad = parseInt(usuarioEdad.value);

            // Validar los datos de entrada
            if (!nombre || isNaN(edad)) {
                alert('Por favor, complete todos los campos.');
                return;
            }

            // Actualizar los datos del usuario
            usuario1.nombre = nombre;
            usuario1.edad = edad;
        }

        // Inicializar el programa
        function iniciarPrograma() {
            // Capturar información del usuario
            capturarInformacionUsuario();

            // Crear botones adicionales para funciones específicas
            const botonTomarPrestado = document.createElement("button");
            botonTomarPrestado.textContent = "Tomar Prestado";
            botonTomarPrestado.addEventListener("click", () => {
                const titulo = prompt("Ingrese el título del libro:");
                const autor = prompt("Ingrese el autor del libro:");
                const paginas = parseInt(prompt("Ingrese el número de páginas del libro:"));

                // Validar los datos de entrada
                if (!titulo || !autor || isNaN(paginas)) {
                    alert('Por favor, complete todos los campos.');
                    return;
                }

                // Crear una instancia de Libro
                const libro = new Libro(titulo, autor, paginas);
                usuario1.tomarPrestadoLibro(libro);

                // Actualizar la lista de libros prestados
                actualizarListaLibros();
            });
            document.body.appendChild(botonTomarPrestado);

            const botonDevolver = document.createElement("button");
            botonDevolver.textContent = "Devolver Libro";
            botonDevolver.addEventListener("click", () => {
                const titulo = prompt("Ingrese el título del libro a devolver:");
                
                // Buscar el libro a devolver
                const libroEncontrado = usuario1.librosPrestados.find(libro => libro.titulo === titulo);
                
                if (libroEncontrado) {
                    usuario1.devolverLibro(libroEncontrado);
                    actualizarListaLibros();
                } else {
                    alert("No se encontró el libro en la lista de libros prestados.");
                }
            });
            document.body.appendChild(botonDevolver);

            const botonMostrarInfo = document.createElement("button");
            botonMostrarInfo.textContent = "Mostrar Información del Usuario";
            botonMostrarInfo.addEventListener("click", () => {
                alert(`Nombre: ${usuario1.nombre}\nEdad: ${usuario1.edad}\nLibros Prestados: ${usuario1.librosPrestados.length}`);
            });
            document.body.appendChild(botonMostrarInfo);
        }

        // Llamar a la función de inicialización al cargar la página
        window.addEventListener("load", iniciarPrograma);