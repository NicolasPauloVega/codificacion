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

// Crearemos una funcion la cual arrojara un error si un valor esta vacio
const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
};

// Creamos una funcion la cual crea un suceso al completar el campo
const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

// Creamos una funcion para validar el correo
const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Creamos una funcion para los campos de entrada del formulario
const validateInputs = () => {
    const usernameValue = username.value.trim(); // Trim para eliminar espacios en cadenas de texto.
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    // Creamos un condicion pra validar si los campos estan completos
    if (usernameValue === '') {
        setError(username, 'Username is required')
    } else {
        setSuccess(username);
    }

    if (emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }

    if (passwordValue === '') {
        setError(password, 'Password is requerid');
    } else if (passwordValue.length < 8) {
        setError(password, 'Password must be at least 8 character');
    } else {
        setSuccess(password);
    }

    if (password2Value === '') {
        setError(password2, 'Please confirm your password');
    } else if (password2Value !== passwordValue) {
        setError(password2, "Passwords dosen't macth");
    } else {
        setSuccess(password2);
    }
};