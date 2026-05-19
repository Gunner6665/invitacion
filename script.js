// ============================================================
//  TRANSICIÓN ANIMADA ENTRE PÁGINAS
// ============================================================
function navigateTo(url) {
    document.body.classList.add('page-exit');
    setTimeout(() => { window.location.href = url; }, 500);
}

// ============================================================
//  HELPERS DE MODALES
// ============================================================

function showModal(id) {
    document.getElementById(id).style.display = 'flex';
}

function hideModal(id) {
    document.getElementById(id).style.display = 'none';
}

function showExito(nombre) {
    document.getElementById('modalExitoTitulo').textContent = '¡Gracias, ' + nombre + '!';
    document.getElementById('modalExitoTexto').textContent = 'Tu asistencia fue confirmada correctamente 🎉';
    showModal('modalExito');
}

function showError(msg) {
    document.getElementById('modalErrorTexto').textContent = msg;
    showModal('modalError');
}

// ============================================================
//  ENVIO DE CORREO CON EMAILJS
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

    if (typeof emailjs !== 'undefined' && document.getElementById('confirmBtn')) {
        emailjs.init("EYdnr2v63lN1la-8d");

        const btnConfirmar = document.getElementById('confirmBtn');

        // Abrir modal de nombre al hacer click en "Confirmar Asistencia"
        btnConfirmar.addEventListener('click', () => {
            document.getElementById('inputNombre').value = '';
            showModal('modalNombre');
            setTimeout(() => document.getElementById('inputNombre').focus(), 300);
        });

        // Cancelar
        document.getElementById('modalCancelar').addEventListener('click', () => {
            hideModal('modalNombre');
        });

        // Cerrar modal de éxito y redirigir
        document.getElementById('modalExitoBtn').addEventListener('click', () => {
            hideModal('modalExito');
            window.location.href = "pageb.html";
        });

        // Cerrar modal de error
        document.getElementById('modalErrorBtn').addEventListener('click', () => {
            hideModal('modalError');
        });

        // Confirmar con el botón del modal
        document.getElementById('modalConfirmar').addEventListener('click', enviarConfirmacion);

        // También confirmar presionando Enter en el input
        document.getElementById('inputNombre').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') enviarConfirmacion();
        });

        function enviarConfirmacion() {
            const nombre = document.getElementById('inputNombre').value.trim();

            if (nombre === '') {
                showError('Debes ingresar tu nombre para confirmar tu asistencia.');
                return;
            }

            hideModal('modalNombre');

            const templateParams = {
                message: nombre + " confirmó asistencia a la revelación de género 🎉"
            };

            emailjs.send("service_owk9la7", "template_bbhzefd", templateParams)
                .then(function (response) {
                    showExito(nombre);
                    console.log("Correo enviado", response);
                })
                .catch(function (error) {
                    showError('Hubo un problema al enviar tu confirmación. Por favor intenta de nuevo.');
                    console.log(error);
                });
        }
    }
});