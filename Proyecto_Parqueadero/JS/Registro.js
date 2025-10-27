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

function validarPassword(password, inputId) {
    const tieneMayuscula = /[A-Z]/.test(password);
    const tieneMinuscula = /[a-z]/.test(password);
    const tieneNumero = /[0-9]/.test(password);
    const longitudMinima = password.length >= 8;
    
    const esValida = tieneMayuscula && tieneMinuscula && tieneNumero && longitudMinima;
    const icono = document.querySelector(`#${inputId}`).nextElementSibling;
    
    if (esValida) {
        icono.textContent = "✓";
        icono.className = "icono-validacion icono-valido";
    } else {
        icono.textContent = "✕";
        icono.className = "icono-validacion icono-invalido";
    }
    return esValida;
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