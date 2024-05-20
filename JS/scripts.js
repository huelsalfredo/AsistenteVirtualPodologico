
// Función para formatear la fecha en YYYY-MM-DD
function formatDate(date) {
    let day = ("0" + date.getDate()).slice(-2);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let year = date.getFullYear();
    return `${year}-${month}-${day}`;
}

// Lista de días festivos (formato YYYY-MM-DD)
const holidays = [
    "2024-01-01", "2024-04-02", "2024-05-01", "2024-05-25", // Añade aquí todos los días festivos
    "2024-07-09", "2024-12-25" // Ejemplo de días festivos
];

// Establecer límites para el campo de fecha
document.addEventListener('DOMContentLoaded', (event) => {
    let fechaInput = document.getElementById('fecha');
    let fechaError = document.getElementById('fecha-error');
    let today = new Date();
    let minDate = new Date(today);
    minDate.setDate(minDate.getDate() + 1);
    let maxDate = new Date(today);
    maxDate.setMonth(maxDate.getMonth() + 3);

    fechaInput.min = formatDate(minDate);
    fechaInput.max = formatDate(maxDate);

    // Deshabilitar días no permitidos (domingos y festivos)
    fechaInput.addEventListener('input', function() {
        let selectedDate = new Date(this.value + 'T00:00:00'); // Asegurar que la hora sea a medianoche UTC
        let dayOfWeek = selectedDate.getUTCDay(); // 0 (domingo) - 6 (sábado)
        let formattedDate = formatDate(selectedDate);

        if (dayOfWeek === 0) {
            fechaError.textContent = "La fecha seleccionada es un domingo. Por favor, elige otro día.";
            fechaError.style.display = "block";
            this.setCustomValidity("La fecha seleccionada es un domingo.");
        } else if (holidays.includes(formattedDate)) {
            fechaError.textContent = "La fecha seleccionada es un día feriado. Por favor, elige otro día.";
            fechaError.style.display = "block";
            this.setCustomValidity("La fecha seleccionada es un día feriado.");
        } else {
            fechaError.style.display = "none";
            this.setCustomValidity("");
        }
    });
});

// Manejar el envío del formulario
document.getElementById('turnoForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío normal del formulario

    let fecha = document.getElementById('fecha').value;
    let hora = document.getElementById('hora').value;

    // Redirigir a login.html con los parámetros de fecha y hora
    window.location.href = `login.html?fecha=${fecha}&hora=${hora}`;
});
