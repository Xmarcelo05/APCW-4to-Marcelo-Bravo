function limpiarCampos() {
  try {
    // Limpiar campos de login
    document.getElementById("loginUsuario").value = "";
    document.getElementById("loginPassword").value = "";

    // Limpiar campos de registro
    document.getElementById("registroNombres").value = "";
    document.getElementById("registroApellidos").value = "";
    document.getElementById("registroFechaNac").value = "";
    document.getElementById("registroCedula").value = "";
    document.getElementById("registroPassword").value = "";
    document.getElementById("registroCorreo").value = "";

    // Limpiar campos de olvido contraseña
    document.getElementById("correo").value = "";
    document.getElementById("codigo").value = "";
    document.getElementById("nuevaPassword").value = "";
    document.getElementById("confirmarPassword").value = "";
    document.getElementById("validacionCorreo").textContent = "";

    // Limpiar mensajes de error
    const errorMsg = document.getElementById("error-message");
    if (errorMsg) errorMsg.style.display = "none";
  } catch (error) {
    console.log("Algunos campos no existen en la vista actual");
  }
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

function mostrarRegistro() {
  limpiarCampos();
  document.getElementById("login").style.display = "none";
  document.getElementById("registro").style.display = "block";
  document.getElementById("olvido_contraseña").style.display = "none";
}

function mostrarLogin() {
  limpiarCampos();
  document.getElementById("registro").style.display = "none";
  document.getElementById("login").style.display = "block";
  document.getElementById("olvido_contraseña").style.display = "none";
}

function mostrarOlvidoContrasena() {
  limpiarCampos();
  document.getElementById("registro").style.display = "none";
  document.getElementById("login").style.display = "none";
  document.getElementById("olvido_contraseña").style.display = "block";
}

async function datosCorrectos() {
    const cedula = document.getElementById("loginUsuario").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    
    if (!cedula || !password) {
        alert("Por favor, complete todos los campos");
        return false;
    }
    
  try {
    
    const resp = await fetch('../usuarios.json');
    if (!resp.ok) {
      throw new Error('No se pudo cargar usuarios.json');
    }
    const usuarios = await resp.json();
    const usuarioEncontrado = (Array.isArray(usuarios) ? usuarios : []).find(u => u.cedula === cedula && u.password === password);
    if (usuarioEncontrado) return true;
    alert('Cédula o contraseña incorrectos');
    return false;
  } catch (error) {
    console.error('Error al validar credenciales:', error);
    alert('Error al validar las credenciales');
    return false;
  }
}
