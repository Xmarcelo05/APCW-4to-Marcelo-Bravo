<script>
  import { goto } from '$app/navigation';

  // Estado para controlar qué formulario se ve: 'login', 'registro', 'olvido'
  let vistaActual = 'login'; 

  // Variables para Login
  let loginCedula = '';
  let loginPassword = '';
  let errorLogin = '';

  // Variables para Registro
  let regNombres = '';
  let regApellidos = '';
  let regFecha = '';
  let regCedula = '';
  let regPassword = '';
  let regCorreo = '';
  
  // Variables para Olvido Contraseña
  let olvidoCorreo = '';
  let codigoVerificacion = '';
  let codigoGenerado = '';
  let nuevaPassword = '';
  let pasoOlvido = 1; // 1: pedir correo, 2: pedir código

  // --- LÓGICA DE LOGIN ---
  async function manejarLogin() {
    if (!loginCedula || !loginPassword) {
      alert("Por favor complete todos los campos");
      return;
    }

    try {
      // Leemos el archivo JSON desde la carpeta static
      const response = await fetch('/usuarios.json');
      if (!response.ok) throw new Error("No se pudo cargar la base de usuarios");
      
      const usuarios = await response.json();
      
      // Buscamos coincidencia
      const usuarioValido = usuarios.find(u => u.cedula === loginCedula && u.password === loginPassword);

      if (usuarioValido) {
        // Redirigir al Home usando el enrutador de Svelte
        goto('/home');
      } else {
        alert("Cédula o contraseña incorrectos");
      }
    } catch (error) {
      console.error(error);
      alert("Error al conectar con el sistema de usuarios.");
    }
  }

  // --- LÓGICA DE REGISTRO (Simulada) ---
  function manejarRegistro() {
    // Validaciones simples
    if (!regNombres || !regCedula || !regPassword) {
      alert("Complete los campos obligatorios");
      return;
    }
    // Aquí podrías validar regex de correo/password igual que antes
    alert("Usuario registrado con éxito (Simulación)");
    vistaActual = 'login'; // Volver al login
  }

  // --- LÓGICA DE OLVIDO CONTRASEÑA ---
  function enviarCodigo() {
    if (!olvidoCorreo.includes('@')) {
      alert("Correo inválido");
      return;
    }
    codigoGenerado = Math.floor(100000 + Math.random() * 900000).toString();
    alert(`Tu código simulado es: ${codigoGenerado}`); // Mostramos el código en alert para probar
    pasoOlvido = 2;
  }

  function verificarYCambiar() {
    if (codigoVerificacion !== codigoGenerado) {
      alert("Código incorrecto");
      return;
    }
    alert("Contraseña actualizada correctamente");
    vistaActual = 'login';
    pasoOlvido = 1;
  }
</script>

<div class="login-wrapper">
  
  {#if vistaActual === 'login'}
    <div class="card">
      <div class="titulo-parking">Parking ULEAM</div>
      <div class="form-group">
        <label>Cédula</label>
        <input type="text" bind:value={loginCedula} placeholder="Ingrese su cédula">
      </div>
      <div class="form-group">
        <label>Contraseña</label>
        <input type="password" bind:value={loginPassword} placeholder="Ingrese su contraseña">
      </div>
      
      <button on:click={manejarLogin}>Iniciar Sesión</button>
      
      <div class="links">
        <button class="link-btn" on:click={() => { vistaActual = 'olvido'; pasoOlvido = 1; }}>Olvidé mi contraseña</button>
        <p>¿No tienes cuenta? <button class="link-btn" on:click={() => vistaActual = 'registro'}>Regístrate</button></p>
      </div>
    </div>
  {/if}

  {#if vistaActual === 'registro'}
    <div class="card registro-card">
      <div class="titulo-parking">Registro</div>
      
      <input type="text" bind:value={regNombres} placeholder="Nombres">
      <input type="text" bind:value={regApellidos} placeholder="Apellidos">
      <input type="date" bind:value={regFecha}>
      <input type="text" bind:value={regCedula} placeholder="Cédula">
      <input type="password" bind:value={regPassword} placeholder="Contraseña">
      <input type="email" bind:value={regCorreo} placeholder="Correo">
      
      <button on:click={manejarRegistro}>Registrarse</button>
      <p>¿Ya tienes cuenta? <button class="link-btn" on:click={() => vistaActual = 'login'}>Inicia Sesión</button></p>
    </div>
  {/if}

  {#if vistaActual === 'olvido'}
    <div class="card">
      <div class="titulo-parking">Recuperar</div>
      
      {#if pasoOlvido === 1}
        <input type="email" bind:value={olvidoCorreo} placeholder="Correo Electrónico">
        <button on:click={enviarCodigo}>Enviar Código</button>
      {:else}
        <p>Código enviado a: {olvidoCorreo}</p>
        <input type="text" bind:value={codigoVerificacion} placeholder="Ingrese Código">
        <input type="password" bind:value={nuevaPassword} placeholder="Nueva Contraseña">
        <button on:click={verificarYCambiar}>Cambiar Contraseña</button>
      {/if}

      <button class="link-btn cancelar" on:click={() => vistaActual = 'login'}>Cancelar</button>
    </div>
  {/if}

</div>

<style>
  /* ESTILOS ESPECÍFICOS DE ESTA PÁGINA */
  /* Nota: Los estilos globales irán en app.css, aquí solo pongo estructura básica para centrar */
  
  .login-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f0f2f5; /* Color de fondo suave */
    font-family: Arial, sans-serif;
  }

  .card {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    width: 100%;
    max-width: 400px;
    text-align: center;
  }

  .titulo-parking {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    color: #333;
  }

  .form-group {
    margin-bottom: 1rem;
    text-align: left;
  }

  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box; /* Importante para que no se deforme */
  }

  button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
  }

  button:hover {
    background-color: #0056b3;
  }

  .link-btn {
    background: none;
    border: none;
    color: #007bff;
    cursor: pointer;
    text-decoration: underline;
    font-size: 0.9rem;
    width: auto;
    padding: 0;
  }
  
  .cancelar {
    margin-top: 10px;
    color: #666;
    text-decoration: none;
  }
</style>