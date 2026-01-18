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
    
    // Array que maneja el estado de las 98 plazas
    let plazasEstacionamiento = new Array(98).fill(false);
    let registrosVehiculos = []; // Contiene el registro actual de localStorage
    
    // Contadores reactivos
    $: ocupados = plazasEstacionamiento.filter(Boolean).length;
    $: disponibles = plazasEstacionamiento.length - ocupados;
    
    // --- 2. ESTADO PARA MODALES Y FLUJO DE SALIDA ---
    
    let mostrarModalConfirmacion = false; // Controla el modal de verificación de placa
    let mostrarPanelResultado = false; // Controla el panel de resultado/cobro
    
    let plazaSeleccionada = null; // Plaza que se está procesando (número)
    let inputPlacaConfirmacion = ''; // Placa ingresada en el modal
    let registroSeleccionado = null; // El objeto del vehículo que saldrá
    
    const tarifaPorHora = 1.5; // Copiado de Salida.js

    // Configuración de las plazas (Copiado de Salida.js)
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

    // --- 3. LÓGICA DE DATOS Y ESTADO ---

    function cargarRegistros() {
        const raw = localStorage.getItem('registroVehiculos');
        return raw ? JSON.parse(raw) : [];
    }
    
    function cargarDatosGuardados() {
        try {
            registrosVehiculos = cargarRegistros();
            
            let nuevoEstadoPlazas = new Array(98).fill(false);
            
            registrosVehiculos.forEach(r => {
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
    
    // Buscar el registro de vehículo para una plaza específica
    function buscarRegistroPorPlaza(numeroPlaza) {
        return registrosVehiculos.find(r => String(r.plaza) === String(numeroPlaza));
    }

    // --- 4. FLUJO DE EVENTOS ---
    
    // 4.1 Click en el mapa: Abre el modal de confirmación
    function manejarClickPlaza(numero) {
        if (plazasEstacionamiento[numero - 1]) {
            // Plaza Ocupada: Inicia proceso de salida
            plazaSeleccionada = numero;
            inputPlacaConfirmacion = ''; // Limpiar campo
            mostrarPanelResultado = false; // Ocultar panel de resultado anterior
            mostrarModalConfirmacion = true; 
        } else {
            alert('Esta plaza está disponible. Solo puede registrar salida de plazas ocupadas.');
        }
    }
    
    function cerrarModalConfirmacion() {
        mostrarModalConfirmacion = false;
        plazaSeleccionada = null;
    }
    
    // 4.2 Envío del formulario en el Modal: Verifica la placa
    function manejarVerificacionPlaca(e) {
        e.preventDefault(); // Detener el envío nativo del formulario
        
        const placaIngresada = inputPlacaConfirmacion.trim().toLowerCase();
        
        if (!placaIngresada) {
            alert('Por favor ingrese la placa del vehículo.');
            return;
        }

        const registro = buscarRegistroPorPlaza(plazaSeleccionada);
        
        if (!registro) {
            alert('Error: No se encontró un registro activo para esta plaza.');
            cerrarModalConfirmacion();
            return;
        }

        const placaRegistrada = (registro.placa || '').trim().toLowerCase();
        
        if (placaIngresada === placaRegistrada) {
            // Éxito en la verificación
            cerrarModalConfirmacion();
            registroSeleccionado = registro;
            mostrarPanelResultado = true;
        } else {
            alert('La placa ingresada no coincide con el registro de esta plaza. Verifique.');
        }
    }
    
    // 4.3 Click en Confirmar Salida
    function confirmarSalida() {
        if (!registroSeleccionado) return;
        
        const arr = cargarRegistros();
        // Buscamos el índice por 'ts' (timestamp) y placa para mayor seguridad
        const idx = arr.findIndex(r => r.ts == registroSeleccionado.ts && r.placa == registroSeleccionado.placa);
        
        if (idx >= 0) {
            arr.splice(idx, 1); // Elimina el registro
            localStorage.setItem('registroVehiculos', JSON.stringify(arr));
            
            alert('Salida registrada exitosamente.'); 
            
            // 1. Resetear el estado de la plaza (Svelte lo actualiza automáticamente)
            plazasEstacionamiento[Number(registroSeleccionado.plaza) - 1] = false;
            plazasEstacionamiento = plazasEstacionamiento; 
            
            // 2. Ocultar el panel de resultado
            mostrarPanelResultado = false;
            registroSeleccionado = null;
        } else {
            alert('Error al procesar la salida (Registro no encontrado en localStorage).');
        }
    }

    // 5. NAVEGACIÓN Y CICLO DE VIDA
    onMount(() => {
      cargarDatosGuardados();
    });
    
    function volverHome() {
        goto('/home');
    }
</script>

<div class="container">
    <header>
        <h1>Salida - Parking ULEAM</h1>
    </header>

    <main class="main-layout">
        <div class="left-panel">
            <div class="info-box">
                <h3>Registrar salida</h3>
                <p>Seleccione una plaza ocupada en el mapa o busque por placa para procesar la salida.</p>
            </div>

            <div class="info-panel">
                <div>Espacios Disponibles: <span id="espaciosDisponibles">{disponibles}</span></div>
                <div>Espacios Ocupados: <span id="espaciosOcupados">{ocupados}</span></div>
            </div>
            
            {#if mostrarPanelResultado && registroSeleccionado}
                <div id="resultadoSalida" class="info-panel resultado-salida">
                    <div>Nombre: <span id="resNombre">{registroSeleccionado.nombre}</span></div>
                    <div>Placa: <span id="resPlaca">{registroSeleccionado.placa}</span></div>
                    <div>Plaza: <span id="resPlaza">{registroSeleccionado.plaza}</span></div>
                    <div>Hora Ingreso: <span id="resHora">{registroSeleccionado.hora}</span></div>
                    
                    <div style="margin-top:10px">
                        <button on:click={confirmarSalida} class="btn small danger">Confirmar Salida</button>
                    </div>
                </div>
            {/if}

            <div class="footer-buttons">
                <button on:click={volverHome} class="btn small danger">Volver a Inicio</button>
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
                            on:click={() => manejarClickPlaza(numero)}
                        >
                            {numero}
                        </div>
                    {/each}
                {/each}
            </div>
        </div>
    </main>
</div>

{#if mostrarModalConfirmacion}
    <div id="modalConfirmacion" class="modal">
        <div class="modal-content">
            <span class="close" on:click={cerrarModalConfirmacion}>&times;</span>
            <h3>Confirmar Salida - Plaza <span id="plazaNumeroModal">{plazaSeleccionada}</span></h3>
            
            <form on:submit|preventDefault={manejarVerificacionPlaca} class="form-registro">
                <p style="margin-bottom: 14px; color: #4b5563;">Por favor, ingrese la placa del vehículo para confirmar la salida:</p>
                <div>
                    <label for="inputPlacaConfirmacion">Placa del vehículo</label>
                    <input bind:value={inputPlacaConfirmacion} type="text" placeholder="Ej: ABC-1234" required />
                </div>

                <div class="form-actions">
                    <button type="button" on:click={cerrarModalConfirmacion} class="btn small">Cancelar</button>
                    <button type="submit" class="btn small ingreso">Verificar</button>
                </div>
            </form>
        </div>
    </div>
{/if}

<style>

    .resultado-salida {
        border-left: 5px solid #dc3545;
        padding-left: 15px;
    }
</style>