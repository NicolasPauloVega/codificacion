// Definición de la clase Calculator
class Calculator {
    // Constructor que inicializa los elementos de los operandos y llama a clear()
    constructor(operand1Element, operand2Element){
        this.operand1Element = operand1Element; // Almacena el elemento del primer operando
        this.operand2Element = operand2Element; // Almacena el elemento del segundo operando
        this.clear(); // Llama al método clear() para inicializar la calculadora
    }

    // Método para limpiar los operandos y el operador, y actualizar la interfaz de usuario
    clear() {
        this.operand1 = 0; // Establece el primer operando en 0
        this.operand2 = 0; // Establece el segundo operando en 0
        this.operator = ''; // Borra el operador actual
        this.updateUI(); // Actualiza la interfaz de usuario
    }

    // Método para actualizar la interfaz de usuario con los valores de los operandos
    updateUI() {
        this.operand1Element.innerHTML = this.operand1 + this.operator; // Actualiza el primer operando en la interfaz de usuario
        this.operand2Element.innerHTML = this.operand2; // Actualiza el segundo operando en la interfaz de usuario
    }

    // Método para añadir un número al segundo operando, evitando duplicar el punto decimal
    appendNumber(number) {
        if (number === "." && this.operand2.includes('.')) return; // Evita agregar un segundo punto decimal
        this.operand2 = this.operand2 === 0 ? number : this.operand2.toString() + number; // Añade el número al segundo operando
        this.updateUI(); // Actualiza la interfaz de usuario
    }

    // Método para eliminar el último dígito del segundo operando
    delete() {
        if(this.operand2 === 0) return; // Si el segundo operando es 0, no hace nada
        this.operand2 = +this.operand2.toString().slice(0, -1); // Elimina el último dígito del segundo operando
        this.updateUI(); // Actualiza la interfaz de usuario
    }

    // Método para manejar la selección de una operación matemática
    operation(operator) {
        if(this.operator){ // Si ya hay un operador seleccionado, realiza el cálculo
            this.calc();
        }
        this.operator = operator; // Almacena el operador seleccionado
        this.operand1 = +this.operand2 === 0 ? this.operand1 : this.operand2; // Actualiza el primer operando si hay un segundo operando
        this.operand2 = 0; // Restablece el segundo operando
        this.updateUI(); // Actualiza la interfaz de usuario
    }

    // Método para realizar el cálculo basado en la operación seleccionada
    calc() {
        switch(this.operator) { // Realiza la operación según el operador seleccionado
            case "+":
                this.operand1 = +this.operand1 + +this.operand2; // Suma
            break;

            case "-":
                this.operand1 = +this.operand1 - +this.operand2; // Resta
            break;

            case "x":
                this.operand1 = +this.operand1 * +this.operand2; // Multiplicación
            break;

            case "%":
                this.operand1 = +this.operand1 / +this.operand2; // División
            break;
        }
        this.operator = ""; // Borra el operador
        this.operand2 = 0; // Restablece el segundo operando
        this.updateUI(); // Actualiza la interfaz de usuario
    }
}

// Selecciona los elementos de la interfaz de usuario necesarios
const operand1Element = document.querySelector("[data-operand-1]"); // Elemento del primer operando
const operand2Element = document.querySelector("[data-operand-2]"); // Elemento del segundo operando

// Crea una instancia de Calculator con los elementos de la interfaz de usuario
const calculator = new Calculator(operand1Element, operand2Element);

// Agrega un event listener para limpiar la calculadora cuando se hace clic en el botón "AC"
const clearButton = document.querySelector("[data-clear]");
clearButton.addEventListener("click", () => {
    calculator.clear();
});

// Agrega event listeners para los botones de números, que llaman al método appendNumber de la calculadora
const numberButtons = document.querySelectorAll("[data-number]");
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerHTML);
    });
});

// Agrega un event listener para eliminar el último dígito cuando se hace clic en el botón "←"
const deleteButton = document.querySelector("[data-delete]");
deleteButton.addEventListener("click", () => {
    calculator.delete();
});

// Agrega event listeners para los botones de operaciones matemáticas, que llaman al método operation de la calculadora
const operationButtons = document.querySelectorAll("[data-operation]");
operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.operation(button.innerHTML);
    });
});

// Agrega un event listener para calcular el resultado cuando se hace clic en el botón "="
const equalsButton = document.querySelector("[data-equals]");
equalsButton.addEventListener("click", () => {
    calculator.calc();
});
