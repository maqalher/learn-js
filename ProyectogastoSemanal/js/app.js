// Variables
const presupuestoUsuario = prompt('¿Cual es tu presupuesto semanal?');
const formulario = document.getElementById('agregar-gasto')
let cantidadPresupuesto;

// Clases
//Clase de Presupuesto
class Presupuesto {
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }

    //Metodo para ir restando del presupuesto actual
    presupeustoRestante(cantidad = 0){
        return this.cantidad -= Number(cantidad);
    }
}

// Clase de Interfaz maneja todo lo relacionado a el HTML
class Interfaz{
    insertarPresupuesto(cantidad){
        const presupuestoSpan = document.querySelector('span#total');
        const restanteSpan = document.querySelector('span#restante');

        // Insertar Html
        presupuestoSpan.innerHTML = `${cantidad}`;
        restanteSpan.innerHTML = `${cantidad}`;
    }

    imprimirMensaje(mesnaje, tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');
        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-succes');
        }

        divMensaje.appendChild(document.createTextNode(mesnaje));
        //insertar en el DOM
        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        //Quitar el alert despues de 3 segundo
        setTimeout(function(){
            document.querySelector('.primario .alert').remove();
            formulario.reset();
        }, 3000);
    }
}


//Event Listener
document.addEventListener('DOMContentLoaded', function(){

    if(presupuestoUsuario === null || presupuestoUsuario === ''){
        window.location.reload();
    }else{
        // Instanciar un presupuesto
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
        // Instanciar la clase de interfaz ui-> user interface
        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
    }


});

formulario.addEventListener('submit', function(e){
    e.preventDefault();

    //Leer del formulario de Gastos
    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto = document.querySelector('#cantidad').value;

    // instanciar la interfaz
    const ui = new Interfaz();

    //Comprobar que los campos no esten vacios
    if(nombreGasto === '' || cantidad === ''){
        // 2 parametros: mesnaje y tipo
        ui.imprimirMensaje('Hubo un error', 'error');
    }else{
        console.log('el gasto se agrego')
    }
});

