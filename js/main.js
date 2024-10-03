let gastos = [];
let index = 0;

const categorias = ['supermercado', 'medico', 'transporte', 'salidas', 'viajes', 'varios'];

let perfiles = {}

class Gasto {
    constructor(categoria, descripcion, monto, fecha) {
        this.categoria = categoria;
        this.descripcion = descripcion;
        this.monto = monto;
        this.fecha = fecha;
    }
}



function ingrese_gasto() {
    let categoria;
    while (true) {
        categoria = prompt("Ingrese la categoría del gasto").toLowerCase();
        if (categorias.includes(categoria)) {
            break;
        } else {
            alert("Categoría no válida. Las opciones son: " + categorias.join(', ') + '.');
        }
    }

    let descripcion = prompt("Ingrese una descripción del gasto");

    let monto;
    while (true) {
        monto = Number(prompt("Ingrese el monto del gasto"));
        if (!isNaN(monto) && monto > 0) {
            break;
        } else {
            alert("Por favor, ingrese un número válido para el monto");
        }
    }

    let fecha = prompt("Ingrese la fecha del gasto (formato DD-MM-AAAA)");

    const gasto = new Gasto(categoria, descripcion, monto, fecha);
    perfiles[perfilActual].gastos.push(gasto);

    if (!perfiles[perfilActual].totalPorCategoria[categoria]) {
        perfiles[perfilActual].totalPorCategoria[categoria] = 0;
    }
   
    perfiles[perfilActual].totalPorCategoria[categoria] += monto;

}

function main() {
    seleccionarPerfil();  

    let continuar = true;
    while (continuar) {
        ingrese_gasto(); 

        continuar = confirm("¿Desea agregar otro gasto a este perfil?");
    }

    console.table(perfiles);
}

main();

//MEJORAR COMO TRAE LOS RESULTADOS