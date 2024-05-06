// Guardamos una referencia de cada elemento del formulario
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Añadimos un evento el cual nos permita evitar el envio del formulario si no se cumple ningun campo
form.addEventListener('submit', e => {
    e.preventDefault(); // Se evita el envio del formulario

    // Invocamos a la funcion que sirve para validar los campos del formulario
    validateInputs();
});

// Crearemos una funcion la cual arrojara un error si un valor obligatorio no se cumple
const setError = (element, message) => {
    
};

// Creamos una funcion para los campos de entrada del formulario
const validateInputs = () => {
    const usernameValue = username.value.trim(); // Trim para eliminar espacios en cadenas de texto.
    const emailValue = email.value.trim();
    const password = password.value.trim();
    const password2 = password2.value.trim();
};