let perfilActual = null;
let perfiles = JSON.parse(localStorage.getItem('perfiles')) || {};  

const perfilSelect = document.getElementById('perfilSelect');
const nuevoPerfilInput = document.getElementById('nuevoPerfil');
const crearPerfilBtn = document.getElementById('crearPerfilBtn');

function cargarPerfiles() {
    perfilSelect.innerHTML = '<option selected disabled>Seleccionar</option>';
    Object.keys(perfiles).forEach(perfil => {
        const option = document.createElement('option');
        option.value = perfil;
        option.textContent = perfil;
        perfilSelect.appendChild(option);
    });

    const crearPerfilOption = document.createElement('option');
    crearPerfilOption.value = "nuevo";
    crearPerfilOption.textContent = "Crear nuevo perfil";
    perfilSelect.appendChild(crearPerfilOption);
}

perfilSelect.addEventListener('change', () => {
    if (perfilSelect.value === "nuevo") {
        // Campo para nuevo perfil
        nuevoPerfilInput.style.display = 'block';
        crearPerfilBtn.style.display = 'block';
    } else {

        perfilActual = perfilSelect.value;
        nuevoPerfilInput.style.display = 'none';
        crearPerfilBtn.style.display = 'none';
        mostrarGastos(); 
    }
});

// Crear nuevo perfil
crearPerfilBtn.addEventListener('click', () => {
    const nuevoPerfil = nuevoPerfilInput.value.trim();
    if (nuevoPerfil && !perfiles[nuevoPerfil]) {
        perfiles[nuevoPerfil] = { gastos: [], totalPorCategoria: {} };
        perfilActual = nuevoPerfil;

        localStorage.setItem('perfiles', JSON.stringify(perfiles));

        cargarPerfiles();

        perfilSelect.value = nuevoPerfil;

        nuevoPerfilInput.style.display = 'none';
        crearPerfilBtn.style.display = 'none';
    } else {
        alert("El nombre de perfil no es válido o ya existe.");
    }
});

cargarPerfiles();