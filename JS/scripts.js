// Obtener elementos del DOM
const fechaInput = document.getElementById('fecha');
const horaSelect = document.getElementById('hora');

// Obtener la fecha actual
const hoy = new Date();
const dd = String(hoy.getDate()).padStart(2, '0');
const mm = String(hoy.getMonth() + 1).padStart(2, '0');
const yyyy = hoy.getFullYear();
const fechaHoy = yyyy + '-' + mm + '-' + dd;

// Establecer la fecha mínima como hoy
fechaInput.min = fechaHoy;

// Calcular la fecha máxima como hoy más 3 meses
const fechaMax = new Date(hoy.getTime() + (90 * 24 * 60 * 60 * 1000));
const maxdd = String(fechaMax.getDate()).padStart(2, '0');
const maxmm = String(fechaMax.getMonth() + 1).padStart(2, '0');
const maxyyyy = fechaMax.getFullYear();
const fechaMaxima = maxyyyy + '-' + maxmm + '-' + maxdd;
fechaInput.max = fechaMaxima;

// Generar las opciones de hora de 8 a 15 con intervalo de 1 hora
for (let hora = 8; hora <= 15; hora++) {
    const option = document.createElement('option');
    option.value = hora;
    option.textContent = `${hora}:00`;
    horaSelect.appendChild(option);
}

// Manejar evento de cambio de fecha
fechaInput.addEventListener('change', actualizarHoras);

// Actualizar las horas disponibles según la fecha seleccionada
function actualizarHoras() {
    const fechaSeleccionada = new Date(fechaInput.value);
    const diaSemana = fechaSeleccionada.getDay(); // 0 (domingo) a 6 (sábado)

    // Si es lunes a viernes
    if (diaSemana >= 1 && diaSemana <= 5) {
        // Limpiar opciones anteriores
        horaSelect.innerHTML = '<option value="">Selecciona una hora</option>';

        // Agregar opciones de hora de 8 a 15 con intervalo de 1 hora
        for (let hora = 8; hora <= 15; hora++) {
            const option = document.createElement('option');
            option.value = hora;
            option.textContent = `${hora}:00`;
            horaSelect.appendChild(option);
        }
    } else {
        // Si es sábado o domingo, no hay turnos disponibles
        horaSelect.innerHTML = '<option value="">No hay turnos disponibles</option>';
    }
}

// Manejar evento de confirmar turno
const confirmarButton = document.getElementById('confirmar');
confirmarButton.addEventListener('click', confirmarTurno);

// Función para confirmar el turno
function confirmarTurno() {
    const fechaSeleccionada = fechaInput.value;
    const horaSeleccionada = horaSelect.value;

    if (fechaSeleccionada && horaSeleccionada) {
        alert(`Has seleccionado un turno para el ${fechaS
