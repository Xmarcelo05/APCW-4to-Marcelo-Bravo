<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    
    // 1. ESTADO REACTIVO (Reemplaza variables globales y document.getElementById)
    
    // Array que maneja el estado de las plazas (false = disponible, true = ocupado)
    // El Array va de 0 a 97 (para plazas 1 a 98)
    let plazasEstacionamiento = new Array(98).fill(false); 
    let registrosVehiculos = []; // Almacena el contenido del localStorage
    
    // Estado del contador (se actualiza automáticamente)
    $: ocupados = plazasEstacionamiento.filter(Boolean).length;
    $: disponibles = plazasEstacionamiento.length - ocupados;
    
    // Estado del Modal de Registro
    let mostrarModalRegistro = false;
    let tablaRegistroHTML = ''; // El contenido de la tabla de vehículos
    
    // Datos de configuración de las plazas (copiados de Home.js)
    const filas = [
      { 
        start: 1, count: 26, 
        top: 2.5, marginLeft: 9.4, marginRight: 0.4, 
        plazaHeight: 13, widthFactor: 0.8, innerOffset: 0, shiftPct: 0 
      },
      { 
        start: 27, count: 23, 
        top: 33.8, marginLeft: 9.4, marginRight: 11, 
        plazaHeight: 13, widthFactor: 0.8, innerOffset: 0.05, shiftPct: 0 
      },
      { 
        start: 50, count: 23, 
        top: 54, marginLeft: 9.4, marginRight: 11, 
        plazaHeight: 13, widthFactor: 0.8, innerOffset: 0.05, shiftPct: 0 
      },
      { 
        start: 73, count: 26, 
        top: 84.5, marginLeft: 9.25, marginRight: 0.4, 
        plazaHeight: 13, widthFactor: 0.8, innerOffset: 0.05, shiftPct: 0 
      }
    ];

    // --- 2. LÓGICA DE CARGA Y ACTUALIZACIÓN ---
    
    function cargarRegistros() {
      // Tu código original usa localStorage. Lo mantenemos por ahora.
      const registrosGuardados = localStorage.getItem('registroVehiculos');
      return registrosGuardados ? JSON.parse(registrosGuardados) : [];
    }

    // Carga datos desde localStorage y marca plazas ocupadas
    function cargarDatosGuardados() {
      try {
        registrosVehiculos = cargarRegistros();
        
        // Reset del array de plazas
        let nuevoEstadoPlazas = new Array(98).fill(false);
        
        registrosVehiculos.forEach(r => {
          if (!r.plaza) return;
          const match = String(r.plaza).match(/\d+/);
          if (!match) return;
          const num = parseInt(match[0], 10);
          if (num >= 1 && num <= 98) nuevoEstadoPlazas[num - 1] = true;
        });

        // Actualizamos la variable de estado. Svelte se encargará de refrescar la UI.
        plazasEstacionamiento = nuevoEstadoPlazas; 
        
      } catch (error) {
        console.error('Error al cargar registros:', error);
      }
    }
    
    // Función para generar la tabla de vehículos ocupados
    function generarTablaRegistro() {
      // Aquí se genera el HTML de la tabla tal como lo hacía tu JS original
      let tabla = `<table class="registro-table"><thead><tr>
        <th>#</th><th>Nombre</th><th>Placa</th><th>Plaza</th><th>Hora Ingreso</th>
      </tr></thead><tbody>`;

      registrosVehiculos.forEach((r, i) => {
        tabla += `<tr>
          <td>${i + 1}</td>
          <td>${r.nombre || ''}</td>
          <td>${r.placa || ''}</td>
          <td>${r.plaza || ''}</td>
          <td>${r.hora || ''}</td>
        </tr>`;
      });

      tabla += `</tbody></table>`;
      tablaRegistroHTML = tabla;
    }
    
    // Muestra el modal de registro de vehículos
    function mostrarRegistroVehiculos() {
      generarTablaRegistro();
      mostrarModalRegistro = true; // Svelte muestra el modal al cambiar esta variable
    }
    
    // Navegación (reemplaza window.location.href)
    function cerrarSesion() {
        // Podrías limpiar localStorage aquí si fuera necesario
        goto('/'); // Redirige a la página de Login
    }

    function irAIngreso() {
        goto('/ingreso');
    }

    function irASalida() {
        goto('/salida');
    }
    
    // 3. CICLO DE VIDA (Reemplaza document.addEventListener('DOMContentLoaded'))
    onMount(() => {
      cargarDatosGuardados(); // Carga los datos al iniciar la página
      // Svelte no necesita listeners extra para los botones, se manejan con on:click
    });
    
</script>

<div class="container">
    <header>
        <h1>Parking ULEAM</h1>
    </header>

    <main class="main-layout">
        <div class="left-panel">
            <div class="buttons-row">
                <button on:click={irAIngreso} class="btn ingreso">
                    <img src="/Imagenes/Ingreso.png" alt="Ingreso">
                    <span>INGRESO</span>
                </button>
                <button on:click={irASalida} class="btn salida">
                    <img src="/Imagenes/Salida.png" alt="Salida">
                    <span>SALIDA</span>
                </button>
            </div>

            <div class="info-panel">
                <div>Espacios Disponibles: <span id="espaciosDisponibles">{disponibles}</span></div>
                <div>Espacios Ocupados: <span id="espaciosOcupados">{ocupados}</span></div>
            </div>

            <div class="footer-buttons">
                <button on:click={mostrarRegistroVehiculos} class="btn small">Registro</button>
                <button on:click={cerrarSesion} class="btn small danger">Cerrar Sesión</button>
            </div>
        </div>

        <div class="map-container">
            <img id="mapImage" src="/Imagenes/EsquemaPark.png" alt="Estacionamiento" />
            
            <div id="estacionamiento" class="overlay">
                
                {#each filas as row}
                    {@const count = row.count}
                    {@const marginLeft = row.marginLeft || 2.5}
                    {@const marginRight = row.marginRight || 2.5}
                    {@const plazaHeightPct = row.plazaHeight || 6}
                    {@const widthFactor = row.widthFactor || 0.9}
                    {@const innerOffset = row.innerOffset || 0.05}
                    {@const shiftPct = row.shiftPct || 0}
                    {@const spacing = (100 - marginLeft - marginRight) / count}
                    
                    {#each Array(count) as _, i}
                        {@const numero = row.start + i}
                        {@const leftPct = marginLeft + i * spacing + spacing * innerOffset + shiftPct}
                        {@const widthPct = spacing * widthFactor} 
                        {@const topPct = row.top}
                        
                        <div 
                            class="plaza" 
                            class:ocupada={plazasEstacionamiento[numero - 1]}
                            style="left: {leftPct}%; top: {topPct}%; width: {widthPct}%; height: {plazaHeightPct}%;"
                            data-numero={numero}
                        >
                            {numero}
                        </div>
                    {/each}
                {/each}
            </div>
        </div>
    </main>
</div>

{#if mostrarModalRegistro}
    <div id="modalRegistro" class="modal">
        <div class="modal-content">
            <span class="close" on:click={() => mostrarModalRegistro = false}>&times;</span>
            <h3>Registro de Vehículos</h3>
            <div class="table-wrapper">
                {@html tablaRegistroHTML}
            </div>
        </div>
    </div>
{/if}

<style>
    /* Si tienes estilos específicos de Home.css que no son globales, pégalos aquí */
    /* Ej: estilos para .left-panel, .map-container, etc. */
</style>