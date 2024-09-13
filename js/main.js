// Calculadora para el manejo de finanzas personales

// Datos que se van a pedir siempre: 
//      Categoria del gasto (de una lista predeterminada)
//        Descripcion
//        Monto
//        Fecha


//Eventualmente me gustaría que, sabiendo mi ingreso calcule el % de gasto de cada categoría... pero un paso a la vez


//Uso arrays aunque no lo vimos aún... ji

let gastos = [];
let index = 0;


while (true) {

    function ingrese_gasto() {
        class Gasto {
            constructor(categoria, descripcion, monto, fecha) {
                this.categoria = categoria
                this.descripcion = descripcion
                this.monto = monto
                this.fecha = fecha

            }
        }

        //Pedir los gastos
        let categoria = prompt("Ingrese la categoría del gasto"); //Después voy a querer que esto sea de una lista predeterminada
        let descripcion = prompt("Ingrese una descrpcion del gasto");
        let monto
        while (true) {
            monto = Number(prompt("Ingrese el monto del gasto"));
            if (!isNaN(monto)) {
                break;
            } else {
                alert("Por favor, ingrese un número válido para el monto");
            }

        }

        let fecha = prompt("Ingrese la fecha del gasto (formato DD-MM-AAAA") //Tendría que validar esto también...

        return new Gasto(categoria, descripcion, monto, fecha)

    }

    gastos[index] = ingrese_gasto();
    index++;


    if (!confirm('Agregar otro gasto?')) {
        break
    }

}

console.table(gastos);

