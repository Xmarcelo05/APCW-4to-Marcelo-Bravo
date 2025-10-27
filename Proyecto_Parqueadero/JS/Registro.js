function validarCorreo(correo, inputId) {
    const esValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
    const icono = document.querySelector(`#${inputId}`).nextElementSibling;
    
    if (esValido) {
        icono.textContent = "✓";
        icono.className = "icono-validacion icono-valido";
    } else {
        icono.textContent = "✕";
        icono.className = "icono-validacion icono-invalido";
    }
    return esValido;
}

function validarCedula(cedula) {
    // Implementar validación de cédula ecuatoriana
    const esValida = /^[0-9]{10}$/.test(cedula);
    const icono = document.getElementById("registroCedula").nextElementSibling;
    
    if (esValida) {
        icono.textContent = "✓";
        icono.className = "icono-validacion icono-valido";
    } else {
        icono.textContent = "✕";
        icono.className = "icono-validacion icono-invalido";
    }
    return esValida;
}

async function registrarUsuario() {
    const nombres = document.getElementById("registroNombres").value.trim();
    const apellidos = document.getElementById("registroApellidos").value.trim();
    const fechaNac = document.getElementById("registroFechaNac").value;
    const cedula = document.getElementById("registroCedula").value.trim();
    const password = document.getElementById("registroPassword").value;
    const correo = document.getElementById("registroCorreo").value.trim();
    
    if (!nombres || !apellidos || !fechaNac || !cedula || !password || !correo) {
        alert("Por favor, complete todos los campos");
        return;
    }
    
    if (!validarCedula(cedula)) {
        alert("La cédula no es válida");
        return;
    }
    
    if (!validarPassword(password, "registroPassword")) {
        alert("La contraseña debe contener al menos una mayúscula, una minúscula, un número y 8 caracteres");
        return;
    }
    
    if (!validarCorreo(correo, "registroCorreo")) {
        alert("El correo electrónico no es válido");
        return;
    }
    
    // Simular registro: validar campos pero NO guardar en disco ni en localStorage
    try {
        // Aquí solo simulamos el registro; no se guardan datos.
        alert("Usuario registrado con éxito");
        mostrarLogin();
        limpiarCampos();
    } catch (error) {
        console.error('Error durante el registro:', error);
        alert("Error de registro"); 
    }
}