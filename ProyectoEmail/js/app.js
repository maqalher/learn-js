// variables
const email = document.getElementById('email');
const asunto = document.getElementById('asunto');
const mensaje = document.getElementById('mensaje');
const btnEnviar = document.getElementById('enviar');
const formularioEnviar = document.getElementById('enviar-mail');
const resetBtn = document.getElementById('resetBtn');

// event Listener
eventListener();

function eventListener() {
    // Inicio de la aplicacion y deshabilitar submit
    document.addEventListener('DOMContentLoaded', inicioApp);

    // Campos del formulario

    email.addEventListener('blur', validarCampo);
    asunto.addEventListener('blur', validarCampo);
    mensaje.addEventListener('blur', validarCampo);

    // Boton de enviar en el submit
    formularioEnviar.addEventListener('submit', enviarEamil);

    // Boton de reset
    resetBtn.addEventListener('click', resetFormulario);
}

// funciones

function inicioApp() {
    // deshabilitar el envio
    btnEnviar.disabled = true;
}

// Valida que el campo tenga algo escrito

function validarCampo() {
    // Se valida la longuitud del texto y que no este vacio
    validarLonguitud(this);

    // Validar unicamente el email
    if (this.type === 'email') {
        validaEmail(this);
    }

    let errores = document.querySelectorAll('.error');

    if (email.value !== '' && asunto.value !== '' && mensaje.value !== '') {
        if (errores.length === 0) {
            btnEnviar.disabled = false;
        }
    }
}

// Verifica la longuitud del texto en los campos
function validarLonguitud(campo) {

    if (campo.value.length > 0) {
        campo.style.borderBottomColor = "green";
        campo.classList.remove('error');
    } else {
        campo.style.borderBottomColor = "red";
        campo.classList.add('error');
    }
}

function validaEmail(campo) {
    const mensaje = campo.value;
    if (mensaje.indexOf('@') !== -1) {
        campo.style.borderBottomColor = "green";
        campo.classList.remove('error');
    } else {
        campo.style.borderBottomColor = "red";
        campo.classList.add('error');
    }
}

// Cundo se envia el correo
function enviarEamil(e) {
    // Spinner al presionar Enviar
    const spinnerGif = document.querySelector('#spinner');
    spinnerGif.style.display = 'block';

    // Gif que envia email
    const enviado = document.createElement('img');
    enviado.src = 'img/mail.gif';
    enviado.style.display = 'block';

    // Ocultar Spinner y mostrar gif de enviado

    setTimeout(function() {
        spinnerGif.style.display = 'none';

        document.querySelector('#loaders').appendChild(enviado);

        setTimeout(function() {
            enviado.remove();
            formularioEnviar.reset();
        }, 5000);
    }, 3000);

    e.preventDefault();
}

// Resetear el formulario
function resetFormulario(e) {
    e.preventDefault();
    formularioEnviar.reset();
}