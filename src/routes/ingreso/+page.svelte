<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

  onMount(() => {
    const usuarioSesion = localStorage.getItem('usuarioActual');
    if (!usuarioSesion) {
      goto('/', { replaceState: true });
    }
  });
    // --- 1. ESTADO GLOBAL ---
    
    // El array que maneja el estado de las 98 plazas (false = disponible)
    let plazasEstacionamiento = new Array(98).fill(false);
    
    // Contadores reactivos
    $: ocupados = plazasEstacionamiento.filter(Boolean).length;
    $: disponibles = plazasEstacionamiento.length - ocupados;
    
    // --- 2. ESTADO DEL MODAL DE REGISTRO DE PLAZA ---
    let mostrarModalPlaza = false;
    let plazaSeleccionada = null; // Guarda el número de plaza que se va a registrar
    
    // Variables del formulario (bind:value las conectará a los inputs)
    let inputNombre = '';
    let inputPlaca = '';
    
    // --- 3. ESTADO DEL MODAL DE REGISTRO DE VEHÍCULOS (TABLA) ---
    let mostrarModalRegistro = false;
    let tablaRegistroHTML = ''; // Contenido HTML de la tabla de registros
    
    // Configuración de las plazas (Copiado de Ingreso.js)
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

    // --- 4. LÓGICA DE DATOS Y ESTADO ---

    function cargarRegistros() {
        const registrosGuardados = localStorage.getItem('registroVehiculos');
        return registrosGuardados ? JSON.parse(registrosGuardados) : [];
    }

    function cargarDatosGuardados() {
        try {
            const registros = cargarRegistros();
            
            let nuevoEstadoPlazas = new Array(98).fill(false);
            
            registros.forEach(r => {
                if (!r.plaza) return;
                const match = String(r.plaza).match(/\d+/);
                if (!match) return;
                const num = parseInt(match[0], 10);
                if (num >= 1 && num <= 98) nuevoEstadoPlazas[num - 1] = true;
            });

            plazasEstacionamiento = nuevoEstadoPlazas; 
        } catch (error) {
            console.error('Error al cargar registros:', error);
        }
    }
    
    // Función para abrir el modal de registro de plaza cuando se hace clic en una plaza libre
    function openRegistroPlazaModal(numero) {
        if (plazasEstacionamiento[numero - 1]) {
            alert('Esta plaza ya está ocupada');
            return;
        }
        
        // Limpiar formulario antes de mostrar
        inputNombre = '';
        inputPlaca = '';
        
        plazaSeleccionada = numero;
        mostrarModalPlaza = true;
    }

    function cerrarModalPlaza() {
        mostrarModalPlaza = false;
    }
    
    function guardarRegistroLocal(registro) {
        const key = 'registroVehiculos';
        const raw = localStorage.getItem(key);
        const arr = raw ? JSON.parse(raw) : [];
        arr.push(registro);
        localStorage.setItem(key, JSON.stringify(arr));
    }
    
    function manejarRegistroPlaza(e) {
        e.preventDefault(); // Evita que SvelteKit recargue la página

        if (!inputNombre || !inputPlaca || !plazaSeleccionada) {
            alert("Por favor complete todos los campos.");
            return;
        }
        
        const hora = new Date().toLocaleString();
        
        const registro = { 
            nombre: inputNombre, 
            placa: inputPlaca, 
            plaza: String(plazaSeleccionada), 
            hora, 
            ts: Date.now() 
        };
        
        guardarRegistroLocal(registro);

        // 1. Actualizar el estado de la plaza (Svelte actualizará el mapa)
        plazasEstacionamiento[plazaSeleccionada - 1] = true; 
        // Nota: para que Svelte detecte el cambio en un array, se debe reasignar
        plazasEstacionamiento = plazasEstacionamiento; 
        
        alert(`Registro exitoso:\nPlaza: ${plazaSeleccionada}\nPlaca: ${inputPlaca}`);
        
        cerrarModalPlaza();
    }
    
    // --- Modal de Registro de Vehículos (Tabla) ---
    function generarTablaRegistro() {
      const registros = cargarRegistros();
      
      let tabla = `<table class="registro-table"><thead><tr>
        <th>#</th><th>Nombre</th><th>Placa</th><th>Plaza</th><th>Hora Ingreso</th>
      </tr></thead><tbody>`;

      registros.forEach((r, i) => {
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

    function mostrarRegistroVehiculos() {
      generarTablaRegistro();
      mostrarModalRegistro = true; 
    }
    
    // --- 5. CICLO DE VIDA Y NAVEGACIÓN ---

    onMount(() => {
        cargarDatosGuardados(); // Cargar estado de plazas al inicio
    });
    
    function volverHome() {
        goto('/home');
    }
</script>

<div class="container">
    <header>
        <h1>Ingreso - Parking ULEAM</h1>
    </header>

    <main class="main-layout">
        <div class="left-panel">
            <div class="info-box">
                <h3>Registrar vehículo</h3>
                </div>

            <div class="info-panel">
                <div>Espacios Disponibles: <span id="espaciosDisponibles">{disponibles}</span></div>
                <div>Espacios Ocupados: <span id="espaciosOcupados">{ocupados}</span></div>
            </div>

            <div class="footer-buttons">
                <button on:click={mostrarRegistroVehiculos} id="btnMostrarRegistro" class="btn small">Registro</button>
                <button on:click={volverHome} id="btnVolverHome" class="btn small danger">Volver a Inicio</button>
            </div>
        </div>

        <div class="map-container">
            <img id="mapImage" src="/Imagenes/EsquemaPark.png" alt="Estacionamiento" />
            
            <div id="estacionamiento" class="overlay">
                
                {#each filas as row}
                    {@const count = row.count}
                    {@const marginLeft = row.marginLeft || 2.5}
                    {@const plazaHeightPct = row.plazaHeight || 6}
                    {@const widthFactor = row.widthFactor || 0.9}
                    {@const spacing = (100 - (row.marginLeft || 2.5) - (row.marginRight || 2.5)) / count}
                    
                    {#each Array(count) as _, i}
                        {@const numero = row.start + i}
                        {@const leftPct = (row.marginLeft || 2.5) + i * spacing + spacing * (row.innerOffset || 0.05) + (row.shiftPct || 0)}
                        {@const widthPct = spacing * widthFactor} 
                        {@const topPct = row.top}
                        
                        <div 
                            class="plaza" 
                            class:ocupada={plazasEstacionamiento[numero - 1]}
                            style="left: {leftPct}%; top: {topPct}%; width: {widthPct}%; height: {plazaHeightPct}%;"
                            data-numero={numero}
                            on:click={() => openRegistroPlazaModal(numero)}
                        >
                            {numero}
                        </div>
                    {/each}
                {/each}
            </div>
        </div>
    </main>
</div>

{#if mostrarModalPlaza}
    <div id="modalPlaza" class="modal">
        <div class="modal-content">
            <span id="closeModalPlaza" class="close" on:click={cerrarModalPlaza}>&times;</span>
            <h3>Registro en Plaza <span id="plazaNumeroDisplay">{plazaSeleccionada}</span></h3>
            
            <form on:submit|preventDefault={manejarRegistroPlaza} class="form-registro">
                <div>
                    <label for="inputNombre">Nombre del propietario</label>
                    <input id="inputNombre" bind:value={inputNombre} type="text" required />
                </div>

                <div>
                    <label for="inputPlaca">Placa del vehículo</label>
                    <input id="inputPlaca" bind:value={inputPlaca} type="text" required />
                </div>

                <div class="form-actions">
                    <button type="button" on:click={cerrarModalPlaza} class="btn small">Cancelar</button>
                    <button type="submit" class="btn small ingreso">Registrar</button>
                </div>
            </form>
        </div>
    </div>
{/if}

{#if mostrarModalRegistro}
    <div id="modalRegistro" class="modal">
        <div class="modal-content2">
            <span class="close" on:click={() => mostrarModalRegistro = false}>&times;</span>
            <h3>Registro de Vehículos</h3>
            <div class="table-wrapper">
                {@html tablaRegistroHTML}
            </div>
        </div>
    </div>
{/if}

<style>

</style>