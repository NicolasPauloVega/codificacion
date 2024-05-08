// Creamos un arreglo para almacenar los empleados
const list_employee = [];

// Creamos una clase para los empleados
class Employee {
    // Creamos un metodo constructor para identificar los valores que se desean mostrar
    constructor(name, last_name, years, position) {
        this.name = name;
        this.last_name = last_name;
        this.years = years;
        this.position = position;
    }

    // Creamos un metodo el cual tome como parametros los valores del constructor, cree una instancia y los añada al arreglo
    add_employee(name, last_name, years, position) {
        // Creamos la instancia
        const employee = new Employee(name, last_name, years, position);
        list_employee.push(employee);
    }
}

// Llamamos a los valores del DOM


function add_emplyees(add_employee) {
    
}