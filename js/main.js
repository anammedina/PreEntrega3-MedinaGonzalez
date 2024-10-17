const categorias = {
    1: "Supermercado",
    2: "Médico",
    3: "Transporte",
    4: "Salidas",
    5: "Viajes",
    6: "Varios"
};



const formulario = {
    categoriaNumber: document.getElementById('inputGroupSelect01'),
    descripcion: document.getElementById('descripcion'),
    monto: document.getElementById('monto'),
    fecha: document.getElementById('fecha')
};

const botonAgregarGasto = document.getElementById('btn-agregar-gasto');
const tablaGastosBody = document.querySelector('#tabla-gastos tbody');

class Gasto {
    constructor(categoria, descripcion, monto, fecha) {
        this.categoria = categoria;
        this.descripcion = descripcion;
        this.monto = monto;
        this.fecha = fecha;
    }
}

function ingrese_gasto() {
    const categoriaNumber = formulario.categoriaNumber.value;
    const descripcion = formulario.descripcion.value;
    const monto = Number(formulario.monto.value); 
    const fecha = formulario.fecha.value;


    if (categoriaNumber === "seleccionar" || !descripcion || monto <= 0 || !fecha) {
        alert("Por favor, completa todos los campos correctamente.");
        return;
    }

    const categoria = categorias[categoriaNumber];
    const gasto = new Gasto(categoria, descripcion, monto, fecha);
    perfiles[perfilActual].gastos.push(gasto);


    if (!perfiles[perfilActual].totalPorCategoria[categoria]) {
        perfiles[perfilActual].totalPorCategoria[categoria] = 0;
    }
    perfiles[perfilActual].totalPorCategoria[categoria] += monto;

    agregarGastoTabla(gasto);


    localStorage.setItem('perfiles', JSON.stringify(perfiles));

    resetearFormulario();
}

function agregarGastoTabla(gasto) {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${gasto.categoria}</td>
      <td>${gasto.descripcion}</td>
      <td>$${gasto.monto.toFixed(2)}</td>
      <td>${gasto.fecha}</td>
    `;
    console.log("Añadiendo fila:", fila);
    tablaGastosBody.appendChild(fila);
}

function resetearFormulario() {
    formulario.categoriaNumber.value = 'Seleccionar'; 
    formulario.descripcion.value = '';
    formulario.monto.value = '';
    formulario.fecha.value = '';
}

// Mostrar gastos al iniciar
function mostrarGastos() {
    tablaGastosBody.innerHTML = ''; 
    if (perfiles[perfilActual]) {
        perfiles[perfilActual].gastos.forEach(gasto => {
            agregarGastoTabla(gasto);
        });
    }
}

function main() {

    botonAgregarGasto.addEventListener('click', ingrese_gasto);
}

main();