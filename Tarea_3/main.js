const form = document.getElementById("formulario");

form.addEventListener("submit", function(event) {
    // Obtener valores
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const cedula = document.getElementById("cedula").value.trim();
    const fecha = document.getElementById("fecha").value;
    const region = document.getElementById("region").value;
    const usuario = document.getElementById("usuario").value.trim();
    const correo = document.getElementById("correo").value.trim();

    // Validación de Nombres
    if(nombre === "") {
        alert("El nombre es obligatorio");
        event.preventDefault();
        return;
    }

    // Validación de Apellidos
    if(apellido === "") {
        alert("El apellido es obligatorio");
        event.preventDefault();
        return;
    }

    // Validación de Cédula (no vacío y solo números)
    if(cedula === "" || !/^\d+$/.test(cedula)) {
        alert("La cédula es obligatoria y solo puede contener números");
        event.preventDefault();
        return;
    }

    // Validación de Fecha
    if(fecha === "") {
        alert("La fecha de nacimiento es obligatoria");
        event.preventDefault();
        return;
    }

    // Validación de Región
    if(region === "") {
        alert("Debe seleccionar una región");
        event.preventDefault();
        return;
    }

    // Validación de Nombre de Invocador
    if(usuario === "") {
        alert("El nombre de invocador es obligatorio");
        event.preventDefault();
        return;
    }

    // Validación de Correo
    if(correo === "" || !correo.includes("@")) {
        alert("El correo no es válido");
        event.preventDefault();
        return;
    }

    // Si pasa todas las validaciones
    alert("Formulario enviado correctamente. ¡Buena suerte en el torneo!");
});
