<script>
  import { goto } from '$app/navigation';
  import { supabase } from '$lib/supabaseClient'; 

  // Estado para controlar qué formulario se ve
  let vistaActual = 'login'; 

  // Variables para Login
  let loginCedula = '';
  let loginPassword = '';

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
  let pasoOlvido = 1;

  // --- FUNCIÓN PARA LIMPIAR CAMPOS AL CAMBIAR VISTA ---
  function cambiarVista(nuevaVista) {
    // Limpiar Login
    loginCedula = '';
    loginPassword = '';
    
    // Limpiar Registro
    regNombres = '';
    regApellidos = '';
    regFecha = '';
    regCedula = '';
    regPassword = '';
    regCorreo = '';
    
    // Limpiar Olvido
    olvidoCorreo = '';
    codigoVerificacion = '';
    nuevaPassword = '';
    pasoOlvido = 1;

    vistaActual = nuevaVista;
  }

  // --- 1. LÓGICA DE LOGIN CON BASE DE DATOS ---
  async function manejarLogin() {
    if (!loginCedula || !loginPassword) {
      alert("Por favor complete todos los campos");
      return;
    }

    try {
      const { data, error } = await supabase
        .from('Usuarios')
        .select('*')
        .eq('cedula', loginCedula)
        .eq('password', loginPassword)
        .single(); 

      if (error || !data) {
        alert("Cédula o contraseña incorrectos, o usuario no registrado.");  
        return;
      }

      const usuario = data;
      localStorage.setItem('usuarioActual', JSON.stringify(usuario));

      alert(`Bienvenido ${usuario.nombres} (${usuario.rol})`);

      if (usuario.rol === 'admin') {
         alert("Eres Admin (Redirigiendo a home por ahora)");
         goto('/home');
      } else {
         goto('/home');
      }

    } catch (err) {
      console.error(err);
      alert("Error de conexión con la base de datos.");
    }
  }

  // --- 2. LÓGICA DE REGISTRO CON ROL AUTOMÁTICO ---
  async function manejarRegistro() {
    if (!regNombres || !regApellidos || !regCedula || !regPassword || !regCorreo) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    let rolAsignado = '';
    const correo = regCorreo.toLowerCase().trim();
    const contraseña = regPassword;
    const cedula = regCedula.trim();

    if (cedula.length < 10 || !/^\d+$/.test(cedula)) {
        alert("La cédula debe tener al menos 10 dígitos numéricos.");
        return;  
    }
    
    if (correo.endsWith('@live.uleam.edu.ec')) {
        rolAsignado = 'alumno';
    } else if (correo.endsWith('@uleam.edu.ec')) {
        rolAsignado = 'maestro';
    } else {
        alert("Error: Debes usar un correo institucional (@live.uleam.edu.ec o @uleam.edu.ec)");
        return;
    }

    if (contraseña.length < 6 || contraseña.length > 20 || !/[A-Z]/.test(contraseña) || !/[a-z]/.test(contraseña) || !/[0-9]/.test(contraseña)) {
        alert("La contraseña debe tener entre 6 y 20 caracteres, incluyendo mayúsculas, minúsculas y números.");
        return;
    }


    try {
      const { data, error } = await supabase
        .from('Usuarios') 
        .insert([
          {
            cedula: regCedula,
            password: regPassword,
            nombres: regNombres,
            apellidos: regApellidos,
            fechaNac: regFecha,
            correo: regCorreo,
            rol: rolAsignado 
          }
        ]);

      if (error) {
        if (error.code === '23505') {
           alert("Error: Esa cédula o correo ya están registrados.");
        } else {
           alert("Error al registrar: " + error.message);
        }
      } else {
        alert(`¡Registro exitoso! Cuenta creada como: ${rolAsignado.toUpperCase()}`);
        cambiarVista('login');
      }

    } catch (err) {
      console.error(err);
      alert("Ocurrió un error inesperado.");
    }
  }

  // --- 3. LÓGICA DE OLVIDO ---
  async function enviarCodigo() {
    if (!olvidoCorreo.includes('@')) {
      alert("Por favor, ingrese un correo válido.");
      return;
    }

    const { data, error } = await supabase
      .from('Usuarios')
      .select('correo')
      .eq('correo', olvidoCorreo)
      .single();

    if (error || !data) {
      alert("Este correo no está registrado en el sistema.");
      return;
    }

    codigoGenerado = Math.floor(100000 + Math.random() * 900000).toString();
    alert(`CÓDIGO DE SEGURIDAD ULEAM: ${codigoGenerado}\n\nIngresa este código en la aplicación.`);
    pasoOlvido = 2; 
  }

  async function verificarYCambiar() {
    if (codigoVerificacion !== codigoGenerado) {
      alert("El código ingresado es incorrecto.");
      return;
    }

    if (nuevaPassword.length < 6) {
      alert("La nueva contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      const { error } = await supabase
        .from('Usuarios')
        .update({ password: nuevaPassword })
        .eq('correo', olvidoCorreo);

      if (error) {
        alert("Error al actualizar: " + error.message);
      } else {
        alert("¡Éxito! Tu contraseña ha sido actualizada. Ahora puedes iniciar sesión.");
        cambiarVista('login');
      }
    } catch (err) {
      alert("Error de conexión con el servidor.");
    }
  }
  let verPassword = false; 
</script>


<div class="login-wrapper">
  <div class="top">
    <button on:click={() => cambiarVista('login')}>
      <img src="/Imagenes/LogoUleam.png" alt="Logo Uleam">
    </button>
  </div>
  
  <div class="fondo"></div>
  <div class="base-blanca"></div>

  {#if vistaActual === 'login'}
    <div class="card">
      <div class="titulo">Parking ULEAM</div>
      <div class="form-group">
        <label for="cedula">Cédula</label>
        <input id="cedula" type="text" bind:value={loginCedula} placeholder="Ingresa tu cédula">
      </div>
      <div class="form-group">
        <label for="pass">Contraseña</label>
        <div class="input-password-container">
          <input 
            id="pass" 
            type={verPassword ? "text" : "password"} 
            bind:value={loginPassword} 
            placeholder="Ingresa tu contraseña"
          >
            <button 
              type="button" 
              class="toggle-password" 
              on:click={() => verPassword = !verPassword}
            >
              {verPassword ? "😳" : "😴"} </button>
          </div>
        </div>
      <button class="boton1" on:click={manejarLogin}>Iniciar Sesión</button>
      <div class="links">
        <button class="link-btn" on:click={() => cambiarVista('olvido')}>Olvidé mi contraseña</button>
        <p class="centrado">¿No tienes cuenta? <button class="link-btn" on:click={() => cambiarVista('registro')}>Regístrate</button></p>
      </div>
    </div>
  {/if}

  {#if vistaActual === 'registro'}
    <div class="card">
      <div class="card-registro">
        <div class="titulo">Registro</div>
        <div class="grid-form">
          <div class="form-group"><label>Nombres</label><input type="text" bind:value={regNombres} placeholder="Ej: Juan Andrés"></div>
          <div class="form-group"><label>Apellidos</label><input type="text" bind:value={regApellidos} placeholder="Ej: Pérez Loor"></div>
          <div class="form-group"><label>Cédula</label><input type="text" bind:value={regCedula} placeholder="Ej: 130..."></div>
          <div class="form-group"><label>Correo Institucional</label><input type="email" bind:value={regCorreo} placeholder="@live.uleam.edu.ec"></div>
          <div class="form-group">
            <label for="pass">Contraseña</label>
            <div class="input-password-container">
              <input 
                id="pass" 
                type={verPassword ? "text" : "password"} 
                bind:value={loginPassword} 
                placeholder="Ingresa tu contraseña"
              >
              <button 
                type="button" 
                class="toggle-password" 
                on:click={() => verPassword = !verPassword}
              >{verPassword ? "😳" : "😴"} </button>
            </div>
          </div>
        </div>
      </div>
      <button class="boton1" on:click={manejarRegistro}>Registrarse</button>
      <p class="centrado">¿Ya tienes cuenta? <button class="link-btn" on:click={() => cambiarVista('login')}>Inicia Sesión</button></p>
    </div>
  {/if}

  {#if vistaActual === 'olvido'}
    <div class="card">
      <div class="titulo">Recuperar Cuenta</div>
      {#if pasoOlvido === 1}
        <div class="form-group">
          <label for="correoRecup">Correo Electrónico</label>
          <input id="correoRecup" type="email" bind:value={olvidoCorreo} placeholder="Tu correo institucional">
        </div>
        <button class="boton1" on:click={enviarCodigo}>Enviar Código</button>
      {:else}
        <p class="centrado" style="margin-bottom:15px">Hemos enviado un código a: <strong>{olvidoCorreo}</strong></p>
        <div class="form-group">
            <label>Código de Verificación</label>
            <input type="text" bind:value={codigoVerificacion} placeholder="Ej: 123456">
        </div>
        <div class="form-group">
            <label>Nueva Contraseña</label>
            <input type="password" bind:value={nuevaPassword} placeholder="Nueva clave segura">
        </div>
        <button class="boton1" on:click={verificarYCambiar}>Cambiar Contraseña</button>
      {/if}
      <button class="link-btn cancelar" on:click={() => cambiarVista('login')}>Cancelar</button>
    </div>
  {/if}
</div>

<style>
  /* El CSS se mantiene exactamente igual a tu versión anterior */
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap');

  :global(body) {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    background-color: #ffffff;
    font-family: 'Poppins', sans-serif;
  }

  .login-wrapper {
    position: relative;
    width: 100vw;
    min-height: calc(100vh - 64px);
    margin-top: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .top {
    background: rgba(45, 45, 45, 0.95);
    backdrop-filter: blur(10px);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 65px;
    display: flex;
    align-items: center;
    z-index: 100;
    padding-left: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .top button {
    background: none;
    border: none;
    height: 60px;
    width: 140px;
    cursor: pointer;
    transition: transform 0.2s;
    box-shadow: none;
  }
  .top button:hover { transform: scale(1.02); }
  .top img { height: 100%; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2)); }

  .fondo {
    position: absolute;
    top: -100px; left: -5px; width: 105%; height: 70vh;
    background-image: url("/Imagenes/FondoUleam.jpg");
    background-size: cover;
    background-position: center;
    filter: blur(10px) brightness(0.9);
    z-index: 0;
  }

  .base-blanca {
    position: absolute;
    top: 50vh; left: 0; width: 100%; height: 50vh;
    background: #ffffff;
    box-shadow: 0 -15px 35px rgba(0, 0, 0, 0.1);
    z-index: 1;
  }

  .card {
    position: relative;
    z-index: 10;
    background: #ffffff;
    padding: 45px;
    border-radius: 20px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    width: 90%;
    max-width: 460px;
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.05);
  }

  .titulo {
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 25px;
    color: #1a202c;
    letter-spacing: -0.5px;
  }

  .form-group { margin-bottom: 15px; text-align: left; }
  
  .grid-form {
    max-height: 60vh;
    overflow-y: auto;
    padding-right: 5px; 
  }

  /* Contenedor para alinear el input y el botón */
  .input-password-container {
    position: relative;
    display: flex;
    align-items: center;
  }

  .toggle-password {
    position: absolute;
    right: 12px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    padding: 0;
    box-shadow: none; 
  }

  .toggle-password:hover {
    transform: scale(1.1);
  }

  .input-password-container input {
    padding-right: 45px;
  }

  label {
    display: block;
    font-size: 0.85rem;
    margin-bottom: 6px;
    color: #4a5568;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  input {
    width: 100%;
    padding: 14px 16px;
    background-color: #f7fafc;
    border: 2px solid #edf2f7;
    border-radius: 10px;
    box-sizing: border-box;
    font-size: 1rem;
    color: #2d3748;
    transition: all 0.3s ease;
  }

  input:focus {
    outline: none;
    background-color: #ffffff;
    border-color: #007bff;
    box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.15);
  }

  .boton1 {
    width: 100%;
    padding: 16px;
    background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
    color: white;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    font-size: 1.1rem;
    font-weight: 700;
    box-shadow: 0 10px 15px -3px rgba(0, 123, 255, 0.3);
    transition: all 0.3s ease;
    margin-top: 15px;
    margin-bottom: 15px;
  }

  .boton1:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 20px -5px rgba(0, 123, 255, 0.4);
    background: linear-gradient(135deg, #0088ff 0%, #0066cc 100%);
  }

  .links {
    /* Eliminamos cursor: pointer de aquí */
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: center; /* Asegura que el texto y p estén centrados */
  }

  
  .link-btn {
    background: none;
    border: none;
    color: #007bff;
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 600;
    transition: color 0.2s;
    box-shadow: none;
    padding: 0;
    cursor: pointer; 
    width: fit-content;
    margin: 0 auto;   
  }

  .link-btn:hover {
    color: #0056b3;
    text-decoration: underline;
  }

  .centrado { margin-top: 10px; font-size: 0.9rem; color: #718096; }
  .cancelar { color: #e53e3e; margin-top: 12px; display: block; width: 100%; text-align: center; }
  .cancelar:hover { color: #c53030; }
</style>