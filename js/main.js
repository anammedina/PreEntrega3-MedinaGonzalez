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
const totalGastosElemento = document.getElementById('total-gastos');
const totalGastosUsdElemento = document.getElementById('total-gastos-usd');

class Gasto {
    constructor(categoria, descripcion, monto, fecha) {
        this.categoria = categoria;
        this.descripcion = descripcion;
        this.monto = monto;
        this.fecha = fecha;
    }
}

function inicializarGrafico() {
    const data = [{
        values: [1],
        labels: ['Sin gastos'],
        type: 'pie'
    }];

    const layout = {
        title: 'Distribución de Gastos por Categoría',
        height: 400,
        width: 500
    };

    Plotly.newPlot('graficoGastos', data, layout);
}

function actualizarGrafico() {
    if (!perfiles[perfilActual]) {
        return; 
    }

    const totalesPorCategoria = perfiles[perfilActual].totalPorCategoria;

    const labels = [];
    const values = [];

    for (const categoria in totalesPorCategoria) {
        labels.push(categoria);
        values.push(totalesPorCategoria[categoria]);
    }

    if (values.length === 0) {
        labels.push('Sin gastos');
        values.push(1);
    }

    const data = [{
        values: values,
        labels: labels,
        type: 'pie'
    }];

    const layout = {
        title: 'Distribución de Gastos por Categoría',
        height: 400,
        width: 500
    };

    Plotly.react('graficoGastos', data, layout);
}

function calcularTotalGastos() {
    if (!perfiles[perfilActual]) {
        return 0;
    }
    const gastos = perfiles[perfilActual].gastos;
    return gastos.reduce((total, gasto) => total + gasto.monto, 0);
}

async function actualizarTotalGastos() {
    const total = calcularTotalGastos();
    totalGastosElemento.innerHTML = `<strong>$${total.toLocaleString()}</strong>`;


    if (tasaDeCambio === null) {
        tasaDeCambio = await obtenerCotizacionUSD();  
    }
    const totalUsd = tasaDeCambio ? total / tasaDeCambio : null;

    if (totalUsd !== null) {
        totalGastosUsdElemento.innerHTML = `<strong>$${totalUsd.toLocaleString()} USD</strong>`;
    } else {
        totalGastosUsdElemento.innerHTML = '<strong>USD no disponible</strong>';
    }

    // Fila de totales en pesos
    let totalFila = document.getElementById('total-fila');
    if (!totalFila) {
        totalFila = document.createElement('tr');
        totalFila.id = 'total-fila';
        totalFila.innerHTML = `
            <td colspan="2"></td>
            <td id="total-gastos"><strong>$${total.toLocaleString()}</strong></td>
            <td>Total</td>
        `;
        tablaGastosBody.appendChild(totalFila);
    } else {
        totalFila.querySelector('#total-gastos').innerHTML = `<strong>$${total.toLocaleString()}</strong>`;
    }

    // Fila de totales en USD
    let totalUsdFila = document.getElementById('total-usd-fila');
    if (!totalUsdFila) {
        totalUsdFila = document.createElement('tr');
        totalUsdFila.id = 'total-usd-fila';
        totalUsdFila.innerHTML = `
            <td colspan="2"></td>
            <td id="total-gastos-usd"><strong>$${totalUsd ? totalUsd.toLocaleString() : "USD no disponible"}</strong></td>
            <td>Total en USD</td>
        `;
        tablaGastosBody.appendChild(totalUsdFila);
    } else {
        totalUsdFila.querySelector('#total-gastos-usd').innerHTML = `<strong>$${totalUsd ? totalUsd.toLocaleString() : "USD no disponible"}</strong>`;
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

    actualizarGrafico();
    actualizarTotalGastos();
    resetearFormulario();
}

function agregarGastoTabla(gasto) {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${gasto.categoria}</td>
      <td>${gasto.descripcion}</td>
      <td>$${gasto.monto.toLocaleString()}</td>
      <td>${gasto.fecha}</td>
    `;
    tablaGastosBody.insertBefore(fila, document.getElementById('total-fila')); // Insertar antes de la fila de totales
}

function resetearFormulario() {
    formulario.categoriaNumber.value = 'Seleccionar';
    formulario.descripcion.value = '';
    formulario.monto.value = '';
    formulario.fecha.value = '';
}

function limpiarTabla() {
    tablaGastosBody.innerHTML = '';
}

function mostrarGastos() {
    limpiarTabla();
    if (perfiles[perfilActual]) {
        perfiles[perfilActual].gastos.forEach(gasto => {
            agregarGastoTabla(gasto);
        });
    }
    actualizarTotalGastos();  
}

function cambiarPerfil(nuevoPerfil) {
    perfilActual = nuevoPerfil;
    mostrarGastos();
    actualizarGrafico();
    actualizarTotalGastos();
}

async function main() {
    await obtenerCotizacionUSD();
    inicializarGrafico();
    mostrarGastos();

    botonAgregarGasto.addEventListener('click', ingrese_gasto);
}

main();
