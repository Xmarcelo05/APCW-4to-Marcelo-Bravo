let plazasEstacionamiento = new Array(98).fill(false);
let registrosVehiculos = [];

const filas = [
  { start: 1, count: 26, top: 2.4, marginLeft: 9.5, marginRight: 0.4, plazaHeight: 13, widthFactor: 0.8, innerOffset: 0, shiftPct: 0 },
  { start: 27, count: 23, top: 34, marginLeft: 9.3, marginRight: 11, plazaHeight: 13, widthFactor: 0.8, innerOffset: 0.05, shiftPct: 0 },
  { start: 50, count: 23, top: 54, marginLeft: 9.3, marginRight: 11, plazaHeight: 13, widthFactor: 0.8, innerOffset: 0.05, shiftPct: 0 },
  { start: 73, count: 26, top:84.9, marginLeft: 9.25, marginRight: 0.4, plazaHeight: 13, widthFactor: 0.8, innerOffset: 0.05, shiftPct: 0 }
];

let registroSeleccionado = null;
const tarifaPorHora = 1.5;

function cargarRegistros() {
  const raw = localStorage.getItem('registroVehiculos');
  return raw ? JSON.parse(raw) : [];
}

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
        if (plazasEstacionamiento[n - 1]) {
          abrirModalConfirmacion(n);
        } else {
          alert('Esta plaza está disponible. Solo puede registrar salida de plazas ocupadas.');
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
    registrosVehiculos = cargarRegistros();
    plazasEstacionamiento = new Array(98).fill(false);
    
    registrosVehiculos.forEach(r => {
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
    console.error('Error al cargar registros:', error);
  }
}

function abrirModalConfirmacion(numeroPlaza) {
  const modal = document.getElementById('modalConfirmacion');
  const plazaNumeroModal = document.getElementById('plazaNumeroModal');
  const inputPlacaConfirmacion = document.getElementById('inputPlacaConfirmacion');
  
  if (!modal) return;
  
  if (plazaNumeroModal) plazaNumeroModal.textContent = numeroPlaza;
  if (inputPlacaConfirmacion) inputPlacaConfirmacion.value = '';
  
  modal.dataset.plazaNumero = numeroPlaza;
  modal.classList.remove('hidden');
}

function cerrarModalConfirmacion() {
  const modal = document.getElementById('modalConfirmacion');
  if (modal) modal.classList.add('hidden');
}

function buscarRegistroPorPlaza(numeroPlaza) {
  return registrosVehiculos.find(r => String(r.plaza) === String(numeroPlaza));
}

function mostrarResultadoSalida(registro) {
  const resultadoPanel = document.getElementById('resultadoSalida');
  const resNombre = document.getElementById('resNombre');
  const resPlaca = document.getElementById('resPlaca');
  const resPlaza = document.getElementById('resPlaza');
  const resHora = document.getElementById('resHora');

  if (!resultadoPanel) return;

  registroSeleccionado = registro;
  if (resNombre) resNombre.textContent = registro.nombre || '';
  if (resPlaca) resPlaca.textContent = registro.placa || '';
  if (resPlaza) resPlaza.textContent = registro.plaza || '';
  if (resHora) resHora.textContent = registro.hora || '';
  
  
  resultadoPanel.style.display = 'block';
}

function confirmarSalida() {
  if (!registroSeleccionado) return;
  
  const arr = cargarRegistros();
  const idx = arr.findIndex(r => r.ts == registroSeleccionado.ts && r.placa == registroSeleccionado.placa);
  
  if (idx >= 0) {
    const total = document.getElementById('resTotal')?.textContent || '';
    arr.splice(idx, 1);
    localStorage.setItem('registroVehiculos', JSON.stringify(arr));
    alert('Salida registrada exitosamente. Total: ' + total);
    
    const resultadoPanel = document.getElementById('resultadoSalida');
    if (resultadoPanel) resultadoPanel.style.display = 'none';
    
    registroSeleccionado = null;
    cargarDatosGuardados();
  } else {
    alert('Error al procesar la salida.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  crearPlazasSobreImagen();
  cargarDatosGuardados();

  const formConfirmacion = document.getElementById('formConfirmacionSalida');
  const btnCancelarConfirmacion = document.getElementById('btnCancelarConfirmacion');
  const closeModalConfirmacion = document.getElementById('closeModalConfirmacion');
  const btnConfirmarSalida = document.getElementById('btnConfirmarSalida');
  const modal = document.getElementById('modalConfirmacion');
  const btnVolverHome = document.getElementById('btnVolverHome');

  if (btnCancelarConfirmacion) {
    btnCancelarConfirmacion.addEventListener('click', cerrarModalConfirmacion);
  }

  if (closeModalConfirmacion) {
    closeModalConfirmacion.addEventListener('click', cerrarModalConfirmacion);
  }

  if (formConfirmacion) {
    formConfirmacion.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const inputPlacaConfirmacion = document.getElementById('inputPlacaConfirmacion');
      const placaIngresada = (inputPlacaConfirmacion?.value || '').trim().toLowerCase();
      const numeroPlaza = modal?.dataset.plazaNumero;
      
      if (!placaIngresada) {
        alert('Por favor ingrese la placa del vehículo.');
        return;
      }

      const registro = buscarRegistroPorPlaza(numeroPlaza);
      
      if (!registro) {
        alert('No se encontró un registro para esta plaza.');
        cerrarModalConfirmacion();
        return;
      }

      const placaRegistrada = (registro.placa || '').trim().toLowerCase();
      
      if (placaIngresada === placaRegistrada || placaIngresada.replace(/\s+/g,'') === placaRegistrada.replace(/\s+/g,'')) {
        cerrarModalConfirmacion();
        mostrarResultadoSalida(registro);
      } else {
        alert('La placa ingresada no coincide con el registro de esta plaza. Por favor verifique.');
      }
    });
  }

  if (btnConfirmarSalida) {
    btnConfirmarSalida.addEventListener('click', confirmarSalida);
  }
  if (btnVolverHome) btnVolverHome.addEventListener('click', () => { window.location.href = 'Home.html'; });
});
