let perfilActual = null;  // Variable global para el perfil seleccionado

function seleccionarPerfil() {
    let hayPerfiles = false;

    for (let perfil in perfiles) {
        if (perfiles[perfil]) {
            hayPerfiles = true;
            break;
        }
    }

    if (!hayPerfiles) {
        let nuevoPerfil = prompt("No tienes perfiles. Por favor, crea uno:");
        perfiles[nuevoPerfil] = { gastos: [], totalPorCategoria: {} }; // Inicializa el nuevo perfil
        perfilActual = nuevoPerfil;  // Asigna el nuevo perfil como el perfil actual
        alert(`Perfil '${nuevoPerfil}' creado.`);
    } else {
        let perfilSeleccionado = prompt("Seleccione un perfil existente o escribe uno nuevo:");

        if (!perfiles[perfilSeleccionado]) {
            perfiles[perfilSeleccionado] = { gastos: [], totalPorCategoria: {} };
            perfilActual = perfilSeleccionado;  // Asigna el perfil seleccionado como el perfil actual
            alert(`Perfil '${perfilSeleccionado}' creado.`);
        } else {
            perfilActual = perfilSeleccionado;  // Asigna el perfil existente como el perfil actual
            alert(`Accediste al perfil '${perfilSeleccionado}'.`);
        }
    }
}
