// Estado global del estacionamiento
let plazasEstacionamiento = new Array(98).fill(false); // false = disponible, true = ocupado

// Referencias DOM
const estacionamiento = document.getElementById('estacionamiento');
const espaciosDisponiblesElement = document.getElementById('espaciosDisponibles');
const espaciosOcupadosElement = document.getElementById('espaciosOcupados');
const modal = document.getElementById('modalRegistro');
const btnRegistro = document.getElementById('btnRegistro');
const btnCerrarSesion = document.getElementById('btnCerrarSesion');
const closeModal = document.querySelector('.close');
const registroVehiculos = document.getElementById('registroVehiculos');

document.addEventListener('DOMContentLoaded', async () => {
  crearPlazasSobreImagen();
  await cargarDatosGuardados(); // marca plazas ocupadas según usuarios.json
  actualizarContadores();
});

const filas = [
  { start: 1, count: 26, top: 2.4, marginLeft: 9.4, marginRight: 0.4, plazaHeight: 13, widthFactor: 0.8, innerOffset: 0, shiftPct: 0 },
  { start: 27, count: 23, top: 32.5, marginLeft: 9.25, marginRight: 11, plazaHeight: 13, widthFactor: 0.8, innerOffset: 0.05, shiftPct: 0 },
  { start: 50, count: 23, top: 52.8, marginLeft: 9.3, marginRight: 11, plazaHeight: 13, widthFactor: 0.8, innerOffset: 0.05, shiftPct: 0 },
  { start: 73, count: 26, top:82, marginLeft: 9.25, marginRight: 0.4, plazaHeight: 13, widthFactor: 0.8, innerOffset: 0.05, shiftPct: 0 }
];

function crearPlazasSobreImagen() {
  estacionamiento.innerHTML = '';

  // Para cada fila usamos sus márgenes y tamaños específicos (si no vienen, usamos valores por defecto)
  filas.forEach(row => {
    const count = row.count;
    const marginLeft = (typeof row.marginLeft === 'number') ? row.marginLeft : 2.5;
    const marginRight = (typeof row.marginRight === 'number') ? row.marginRight : 2.5;
    const plazaHeightPct = (typeof row.plazaHeight === 'number') ? row.plazaHeight : 6;
    const widthFactor = (typeof row.widthFactor === 'number') ? row.widthFactor : 0.9;
    const innerOffset = (typeof row.innerOffset === 'number') ? row.innerOffset : 0.05;
    const shiftPct = (typeof row.shiftPct === 'number') ? row.shiftPct : 0;

    const spacing = (100 - marginLeft - marginRight) / count;
    for (let i = 0; i < count; i++) {
      const numero = row.start + i;

      const leftPct = marginLeft + i * spacing + spacing * innerOffset + shiftPct;
      const widthPct = spacing * widthFactor; 
      const topPct = row.top;

      const div = document.createElement('div');
      div.className = 'plaza';
      div.style.left = `${leftPct}%`;
      div.style.top = `${topPct}%`;
      div.style.width = `${widthPct}%`;
      div.style.height = `${plazaHeightPct}%`;
      div.dataset.numero = numero;
      div.textContent = numero;

      // En Home solo mostramos el estado, sin interacción
      div.style.cursor = 'default';

      estacionamiento.appendChild(div);
    }
  });
}

function actualizarPlazaVisual(numeroPlaza, ocupado) {
  const el = estacionamiento.querySelector(`.plaza[data-numero="${numeroPlaza}"]`);
  if (!el) return;
  if (ocupado) el.classList.add('ocupada'); else el.classList.remove('ocupada');
}

function actualizarContadores() {
  const ocupados = plazasEstacionamiento.filter(Boolean).length;
  const disponibles = plazasEstacionamiento.length - ocupados;
  espaciosOcupadosElement.textContent = ocupados;
  espaciosDisponiblesElement.textContent = disponibles;
}

// carga datos desde localStorage y marca plazas ocupadas
function cargarDatosGuardados() {
  try {
    // Leer registros del localStorage
    const registrosGuardados = localStorage.getItem('registroVehiculos');
    const registros = registrosGuardados ? JSON.parse(registrosGuardados) : [];

    // Reset
    plazasEstacionamiento = new Array(98).fill(false);

    // Marcar plazas ocupadas según los registros
    registros.forEach(r => {
      if (!r.plaza) return;
      const match = String(r.plaza).match(/\d+/);
      if (!match) return;
      const num = parseInt(match[0], 10);
      if (num >= 1 && num <= 98) plazasEstacionamiento[num - 1] = true;
    });

    // Actualiza visual
    for (let i = 1; i <= 98; i++) {
      actualizarPlazaVisual(i, plazasEstacionamiento[i - 1]);
    }

    actualizarContadores();
  } catch (error) {
    console.error('Error al cargar usuarios.json:', error);
  }
}

// Mostrar modal con tabla usando localStorage
function mostrarRegistroVehiculos() {
  try {
    // Leer registros del localStorage
    const registrosGuardados = localStorage.getItem('registroVehiculos');
    const registros = registrosGuardados ? JSON.parse(registrosGuardados) : [];

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
    registroVehiculos.innerHTML = tabla;
    modal.classList.remove('hidden');
  } catch (error) {
    console.error('Error al mostrar registro:', error);
    registroVehiculos.innerHTML = '<p>Error al cargar los datos</p>';
    modal.classList.remove('hidden');
  }
}

// Lógica para manejar el registro de vehículos
const parkingSpots = document.querySelectorAll('.parking-spots .spot');
const registroPanel = document.getElementById('registroPanel');
const btnRegistrar = document.getElementById('btnRegistrar');
const btnVolver = document.getElementById('btnVolver');


if (parkingSpots && parkingSpots.length) {
  parkingSpots.forEach(spot => {
    spot.addEventListener('click', () => {
      const spotNumber = spot.dataset.spotNumber; 
      if (registroPanel) registroPanel.style.display = 'block';
    });
  });
}

if (btnRegistrar) {
  btnRegistrar.addEventListener('click', () => {
    const nombreEl = document.getElementById('nombre');
    const placaEl = document.getElementById('placa');
    const nombre = nombreEl ? nombreEl.value : '';
    const placa = placaEl ? placaEl.value : '';
    console.log(`Registrado: ${nombre}, Placa: ${placa}`);
    if (registroPanel) registroPanel.style.display = 'none'; // Ocultar el panel después de registrar
  });
}

if (btnVolver) {
  btnVolver.addEventListener('click', () => {
    window.location.href = 'Home.html'; // Volver a la página de inicio
  });
}

// listeners modal y botones
btnRegistro.addEventListener('click', mostrarRegistroVehiculos);
btnCerrarSesion.addEventListener('click', () => {
  // cerrar sesión -> redirigir a login
  window.location.href = 'Login.html';
});
closeModal.addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.add('hidden'); });

// Cargar plazas al entrar a Ingreso.html
document.addEventListener('DOMContentLoaded', async () => {
  crearPlazasSobreImagen();
  await cargarDatosGuardados(); // marca plazas ocupadas según usuarios.json
  actualizarContadores();
});

// Lógica para cargar plazas en Ingreso.html
async function cargarPlazasIngreso() {
  crearPlazasSobreImagen();
  await cargarDatosGuardados(); // marca plazas ocupadas según usuarios.json
  actualizarContadores();
}