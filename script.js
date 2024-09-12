document.addEventListener('DOMContentLoaded', function() {
    // Establecer restricciones de fecha
    const today = new Date();
    const currentMonth = today.getMonth();
    const nextMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Obtener el primer y último día del mes actual y del siguiente mes
    const firstDayCurrentMonth = new Date(currentYear, currentMonth, 1);
    const lastDayCurrentMonth = new Date(currentYear, currentMonth + 1, 0);
    const firstDayNextMonth = new Date(currentYear, nextMonth, 1);
    const lastDayNextMonth = new Date(currentYear, nextMonth + 1, 0);

    const minDate = `${firstDayCurrentMonth.toISOString().split('T')[0]}`;
    const maxDate = `${lastDayNextMonth.toISOString().split('T')[0]}`;

    // Configurar los atributos min y max en el campo de fecha
    const dateInput = document.getElementById('date');
    dateInput.setAttribute('min', minDate);
    dateInput.setAttribute('max', maxDate);

    // Manejadores de eventos para los botones
    document.getElementById('surprise-btn').addEventListener('click', function() {
        var surprise = document.getElementById('surprise');
        if (surprise.classList.contains('hidden')) {
            surprise.classList.remove('hidden');
            setTimeout(function() {
                surprise.classList.add('hidden');
            }, 5000); // 5 segundos
        } else {
            surprise.classList.add('hidden');
        }
    });

    document.getElementById('schedule-btn').addEventListener('click', function() {
        var schedule = document.getElementById('schedule');
        if (schedule.classList.contains('hidden')) {
            schedule.classList.remove('hidden');
        } else {
            schedule.classList.add('hidden');
        }
    });

    document.getElementById('schedule-form').addEventListener('submit', function(event) {
        event.preventDefault();

        // Obtener valores de la fecha y la hora
        var date = document.getElementById('date').value;
        var time = document.getElementById('time').value;
        
        // Mostrar alerta personalizada
        showCustomAlert(`¿Estás segura de que deseas programar la cita para el ${date} a las ${time}?`, function(isConfirmed) {
            if (isConfirmed) {
                var confirmation = document.getElementById('confirmation');
                confirmation.textContent = `¡Muy bién Sofi! Cita programada para el ${date} a las ${time}! Por favor, mandar captura de la fecha a Fran!`;
                confirmation.classList.remove('hidden');
                
                // Deshabilitar los campos de entrada y el botón de envío
                document.getElementById('date').disabled = true;
                document.getElementById('time').disabled = true;
                document.querySelector('#schedule-form button[type="submit"]').disabled = true;
            } else {
                // Restablecer el formulario para volver a elegir
                document.getElementById('schedule-form').reset();
            }
        });
    });

    function showCustomAlert(message, callback) {
        var alert = document.getElementById('custom-alert');
        var alertMessage = document.getElementById('alert-message');
        var alertYes = document.getElementById('alert-yes');
        var alertNo = document.getElementById('alert-no');

        alertMessage.textContent = message;
        alert.classList.remove('hidden');

        alertYes.addEventListener('click', function() {
            alert.classList.add('hidden');
            if (callback) callback(true);
        });

        alertNo.addEventListener('click', function() {
            alert.classList.add('hidden');
            if (callback) callback(false);
        });
    }
});
