let codigoActual = "";
let codigoEnviado = false;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("correo").addEventListener("input", function() {
    const correo = this.value;
    const icono = document.getElementById("validacionCorreo");
    const esValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
    icono.textContent = esValido ? "✅" : "❌";
  });
});

function enviarCodigo() {
  const correo = document.getElementById("correo").value;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    alert("Por favor, ingresa un correo válido.");
    return;
  }
  codigoActual = Math.floor(100000 + Math.random() * 900000).toString();
  codigoEnviado = true;
  alert(`Código de verificación: ${codigoActual}`);
}

function verificarCódigo() {
  const codigoIngresado = document.getElementById("codigo").value;
  if (!codigoEnviado) {
    alert("Primero debes enviar un código de verificación.");
    return false;
  }
  if (codigoActual !== codigoIngresado) {
    alert("El código de verificación es incorrecto.");
    return false;
  }
  alert("Se ha actualizado la contraseña correctamente.");
  document.getElementById("codigo").disabled = true;
  return true;
}
  
