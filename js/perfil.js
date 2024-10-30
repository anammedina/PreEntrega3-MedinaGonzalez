let perfiles = JSON.parse(localStorage.getItem('perfiles')) || {};
let perfilActual = null;

const perfilSelect = document.getElementById('perfilSelect');
const nuevoPerfilInput = document.getElementById('nuevoPerfil');
const crearPerfilBtn = document.getElementById('crearPerfilBtn');

perfilSelect.addEventListener('change', function () {
    perfilActual = perfilSelect.value;
    if (perfilActual === "nuevo") {
        nuevoPerfilInput.style.display = "block";
        crearPerfilBtn.style.display = "block";
    } else {
        nuevoPerfilInput.style.display = "none";
        crearPerfilBtn.style.display = "none";
        cargarGastosDelPerfil(perfilActual);
        actualizarGrafico();
        actualizarTotalGastos();
    }
});

crearPerfilBtn.addEventListener('click', function () {
    const nuevoPerfil = nuevoPerfilInput.value.trim();
    if (nuevoPerfil && !perfiles[nuevoPerfil]) {
        perfiles[nuevoPerfil] = { gastos: [], totalPorCategoria: {} };
        localStorage.setItem('perfiles', JSON.stringify(perfiles));
        agregarPerfilAlSelect(nuevoPerfil);
        perfilSelect.value = nuevoPerfil;
        perfilActual = nuevoPerfil;
        nuevoPerfilInput.value = '';
        nuevoPerfilInput.style.display = "none";
        crearPerfilBtn.style.display = "none";
        cargarGastosDelPerfil(perfilActual);
        actualizarGrafico();
        actualizarTotalGastos();
    }
});

function cargarPerfiles() {
    const defaultOption = document.createElement('option');
    defaultOption.text = "Seleccionar";
    defaultOption.selected = true;
    defaultOption.disabled = true;
    perfilSelect.add(defaultOption);

    const nuevoPerfilOption = document.createElement('option');
    nuevoPerfilOption.value = "nuevo";
    nuevoPerfilOption.text = "Crear Nuevo Perfil";
    perfilSelect.add(nuevoPerfilOption);

    for (const perfil in perfiles) {
        agregarPerfilAlSelect(perfil);
    }
}

function agregarPerfilAlSelect(perfil) {
    const option = document.createElement('option');
    option.value = perfil;
    option.textContent = perfil;
    perfilSelect.appendChild(option);
}

function cargarGastosDelPerfil(perfil) {
    const gastos = perfiles[perfil].gastos;
    tablaGastosBody.innerHTML = ''; // Limpiar tabla
    gastos.forEach(agregarGastoTabla);

    // Agrega la fila de totales nuevamente al final
    const totalFila = document.getElementById('total-fila');
    const totalUsdFila = document.getElementById('total-usd-fila');
    if (totalFila && totalUsdFila) {
        tablaGastosBody.appendChild(totalFila);
        tablaGastosBody.appendChild(totalUsdFila);
    }

    actualizarTotalGastos();
}

cargarPerfiles();
