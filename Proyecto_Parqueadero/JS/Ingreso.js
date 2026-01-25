let plazasEstacionamiento = new Array(98).fill(false);

const filas = [
  { start: 1, count: 26, top: 2.4, marginLeft: 9.4, marginRight: 0.4, plazaHeight: 13, widthFactor: 0.8, innerOffset: 0, shiftPct: 0 },
  { start: 27, count: 23, top: 32.8, marginLeft: 9.25, marginRight: 11, plazaHeight: 13, widthFactor: 0.8, innerOffset: 0.05, shiftPct: 0 },
  { start: 50, count: 23, top: 53, marginLeft: 9.28, marginRight: 11, plazaHeight: 13, widthFactor: 0.8, innerOffset: 0.05, shiftPct: 0 },
  { start: 73, count: 26, top:82, marginLeft: 9.25, marginRight: 0.4, plazaHeight: 13, widthFactor: 0.8, innerOffset: 0.05, shiftPct: 0 }
];

function crearPlazasSobreImagen() {
  const estacionamiento = document.getElementById('estacionamiento');
  if (!estacionamiento) return;
  estacionamiento.innerHTML = '';

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

      div.addEventListener('click', () => {
        const n = Number(div.dataset.numero);
   
        if (!plazasEstacionamiento[n - 1]) {
          openRegistroPlazaModal(n);
        } else {
          alert('Esta plaza ya está ocupada');
        }
      });

      estacionamiento.appendChild(div);
    }
  });
}

function actualizarPlazaVisual(numeroPlaza, ocupado) {
  const estacionamiento = document.getElementById('estacionamiento');
  if (!estacionamiento) return;
  const el = estacionamiento.querySelector(`.plaza[data-numero="${numeroPlaza}"]`);
  if (!el) return;
  if (ocupado) el.classList.add('ocupada'); else el.classList.remove('ocupada');
}

function actualizarContadores() {
  const espaciosDisponiblesElement = document.getElementById('espaciosDisponibles');
  const espaciosOcupadosElement = document.getElementById('espaciosOcupados');
  if (!espaciosDisponiblesElement || !espaciosOcupadosElement) return;
  const ocupados = plazasEstacionamiento.filter(Boolean).length;
  const disponibles = plazasEstacionamiento.length - ocupados;
  espaciosOcupadosElement.textContent = ocupados;
  espaciosDisponiblesElement.textContent = disponibles;
}

function cargarDatosGuardados() {
  try {
    // Intentar cargar registros del localStorage
    const registrosGuardados = localStorage.getItem('registroVehiculos');
    const registros = registrosGuardados ? JSON.parse(registrosGuardados) : [];

    plazasEstacionamiento = new Array(98).fill(false);
    registros.forEach(r => {
      if (!r.plaza) return;
      const match = String(r.plaza).match(/\d+/);
      if (!match) return;
      const num = parseInt(match[0], 10);
      if (num >= 1 && num <= 98) plazasEstacionamiento[num - 1] = true;
    });

    for (let i = 1; i <= 98; i++) {
      actualizarPlazaVisual(i, plazasEstacionamiento[i - 1]);
    }

    actualizarContadores();
  } catch (error) {
    console.error('Error al cargar usuarios.json:', error);
  }
}

// Función para mostrar todos los registros (solo cuando se hace clic en el botón Registro)
function mostrarRegistroVehiculos() {
  try {
    // Leer registros del localStorage
    const local = localStorage.getItem('registroVehiculos');
    const registros = local ? JSON.parse(local) : [];

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
    const registroVehiculos = document.getElementById('registroVehiculos');
    if (registroVehiculos) registroVehiculos.innerHTML = tabla;
    const modal = document.getElementById('modalRegistro');
    if (modal) modal.classList.remove('hidden');
  } catch (error) {
    console.error('Error al mostrar registro:', error);
    const registroVehiculos = document.getElementById('registroVehiculos');
    if (registroVehiculos) registroVehiculos.innerHTML = '<p>Error al cargar los datos</p>';
    const modal = document.getElementById('modalRegistro');
    if (modal) modal.classList.remove('hidden');
  }
}

// --- Modal de registro por plaza ---
function openRegistroPlazaModal(numero) {
  const modal = document.getElementById('modalPlaza');
  if (!modal) return;
  const display = document.getElementById('plazaNumeroDisplay');
  const inputPlazaNumero = document.getElementById('inputPlazaNumero');
  if (display) display.textContent = numero;
  if (inputPlazaNumero) inputPlazaNumero.value = numero;
  // limpiar campos
  const nombreEl = document.getElementById('inputNombre');
  const placaEl = document.getElementById('inputPlaca');
  if (nombreEl) nombreEl.value = '';
  if (placaEl) placaEl.value = '';
  modal.classList.remove('hidden');
}

function cerrarModalPlaza() {
  const modal = document.getElementById('modalPlaza');
  if (!modal) return;
  modal.classList.add('hidden');
}

function guardarRegistroLocal(registro) {
  const key = 'registroVehiculos';
  const raw = localStorage.getItem(key);
  const arr = raw ? JSON.parse(raw) : [];
  arr.push(registro);
  localStorage.setItem(key, JSON.stringify(arr));
  
  // Actualizar UI después de guardar
  actualizarContadores();
  
  // Mostrar confirmación con los datos del registro actual
  const mensaje = `Registro exitoso:\n\n` +
    `Plaza: ${registro.plaza}\n` +
    `Nombre: ${registro.nombre}\n` +
    `Placa: ${registro.placa}\n` +
    `Hora: ${registro.hora}`;
  alert(mensaje);
}

document.addEventListener('DOMContentLoaded', () => {
  // listeners del modal de plaza
  const form = document.getElementById('formRegistroPlaza');
  const btnCancelar = document.getElementById('btnCancelarRegistro');
  const closePlaza = document.getElementById('closeModalPlaza');

  if (btnCancelar) btnCancelar.addEventListener('click', cerrarModalPlaza);
  if (closePlaza) closePlaza.addEventListener('click', cerrarModalPlaza);

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('inputNombre')?.value || '';
      const placa = document.getElementById('inputPlaca')?.value || '';
      const plaza = document.getElementById('inputPlazaNumero')?.value || '';
      const hora = new Date().toLocaleString();

      if (!plaza) return;

      // marcar plaza ocupada
      const n = Number(plaza);
      plazasEstacionamiento[n - 1] = true;
      actualizarPlazaVisual(n, true);
      actualizarContadores();

      // guardar registro en localStorage
  const registro = { nombre, placa, plaza: String(plaza), hora, ts: Date.now() };
  guardarRegistroLocal(registro);

      cerrarModalPlaza();
    });
  }
});

document.addEventListener('DOMContentLoaded', async () => {
  crearPlazasSobreImagen();
  await cargarDatosGuardados();
  actualizarContadores();

  const btnMostrarRegistro = document.getElementById('btnMostrarRegistro');
  const btnVolverHome = document.getElementById('btnVolverHome');
  const modal = document.getElementById('modalRegistro');
  const closeModal = modal ? modal.querySelector('.close') : null;

  if (btnMostrarRegistro) btnMostrarRegistro.addEventListener('click', mostrarRegistroVehiculos);
  if (btnVolverHome) btnVolverHome.addEventListener('click', () => { window.location.href = 'Home.html'; });
  if (closeModal) closeModal.addEventListener('click', () => modal.classList.add('hidden'));
  if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.add('hidden'); });
});
