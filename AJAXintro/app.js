/*document.getElementById('cargar').addEventListener('click', cargarDatos);

function cargarDatos(){
    // Crear el objeto xmlhttprequest
    const xhr = new XMLHttpRequest();

    //Abrir una conexion
    xhr.open('GET', 'datos.txt', true);

    //Una vez que carga
    xhr.onload = function(){
        // 200:Correcto | 403:Prohibido | 404:No encontrado
        if(this.status === 200){
            document.getElementById('listado').innerHTML = `<h1>${this.responseText}</h1>`;
        }
    }

    //Envia el request
    xhr.send();
}*/

//Forma antigua
document.getElementById('cargar').addEventListener('click', cargarDatos);

function cargarDatos(){
    // Crear el objeto xmlhttprequest
    const xhr = new XMLHttpRequest();

    //Abrir una conexion
    xhr.open('GET', 'datos.txt', true);

    xhr.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            console.log(this.responseText);
        }
    }

    /* 
        //Reaady Status
        0: No inicializado
        1: Conexion establecida
        2: Recibido
        3: Procesando
        4: Respuesta Lista
    */

    //Envia el request
    xhr.send();
}