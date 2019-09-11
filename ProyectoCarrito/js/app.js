// Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

// Listeners

cargarEventListeners();

function cargarEventListeners(){
    // Dispara cuando se presiona "Agregar Carrito"
    cursos.addEventListener('click', comprarCurso);

    // Cuando se elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Al vaciar carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    // Al cargar el documento, mostrar LocalStorage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}


// Funciones
//Funcion que añade el curso al carrito
function comprarCurso(e){
    e.preventDefault();
    // Delegation para agregar carrito
    if(e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement;
        //Enviamos el curso seleccionado para tomar sus datos
        leerDatosCurso(curso);
    }
}

// Lee los datos del curso
function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }
    
    insertarCarrito(infoCurso);
}

// Muestra el curso seleccionado en el carrito
function insertarCarrito(curso) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width=100>
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
    `;
    listaCursos.appendChild(row);

    guardarCursoLocalStorage(curso);
}

function eliminarCurso(e) {
    e.preventDefault();

    let curso,
        cursoID;
    if(e.target.classList.contains('borrar-curso')) {
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoID = curso.querySelector('a').getAttribute('data-id');
        console.log(cursoID);
    }

    //Eliminar curso de local storge
    eliminarCursoLocalStorage(cursoID);
}

//Elimina los cursoso del carrito
function vaciarCarrito(e) {
    //forma lenta 
    //listaCursos.innerHTML = ``;
    // forma rapida (recomendada)
    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);
    }
    
    vaciarLocalStorage();

    return false;
}

//Alamacena cursos en el carrito a LocalStotage
function guardarCursoLocalStorage(curso) {  
    let cursos;

    // Toma el valor de un arreglo con datos de LS o vacio
    cursos =  obtenerCursosLocalStorage();

    // El curso seleccionado se agrega al carrito
    cursos.push(curso);

    //Se agrega a localStorage
    localStorage.setItem('cursos', JSON.stringify(cursos));
    
}

//Comprueba que haya elementos en LocalStorage
function obtenerCursosLocalStorage() {
    let cursosLS;

    // comprobamos si hay algo en localStorage
    if(localStorage.getItem('cursos') === null){
        cursosLS = [];
    }else {
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }

    return cursosLS;
}

//Imprimer los cursos de local storage en el carrito
function leerLocalStorage () {
    let cursosLS;

    cursosLS = obtenerCursosLocalStorage();

    cursosLS.forEach(function(curso){
        //construir el templete
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width=100>
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
        `;
        listaCursos.appendChild(row);
    });
}


// Elimina el curso por el ID en local storage
function eliminarCursoLocalStorage(curso) {
    let cursosLS;
    // Obtnenmos el arreglo de cursos
    cursosLS = obtenerCursosLocalStorage();
    //Itermos comparando el ID del curso borrado con los del LS
    cursosLS.forEach(function(cursoLS, index){
        if(cursoLS.id === curso){
            cursosLS.splice(index, 1);
        }
    });
    //Añadimos el arreglo actual a storage
    localStorage.setItem('cursos', JSON.stringify(cursosLS));
}

// ELimina todo los cursos de local storage
function vaciarLocalStorage() {
    localStorage.clear();
}