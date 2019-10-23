document.querySelector('#generar-nombre').addEventListener('submit', cargarNombre);

// LLamadoa a Ajax e imprimir Resultados
function cargarNombre(e) {
    e.preventDefault();

    //Leer las variables
    const origen = document.getElementById('origen');
    const origenSeleccionado = origen.options[origen.selectedIndex].value;

    const genero = document.getElementById('genero');
    const generoSeleccionado = genero.options[genero.selectedIndex].value;

    const cantidad = document.getElementById('numero').value;
   
    let url = '';
    url += 'http://uinames.com/api/?';

    //Si hay origen agregalo a la URL
    if(origenSeleccionado !== '') {
        url += `region=${origenSeleccionado}&`;
    }
    //Si hay un genero agregalo a la URL
    if(generoSeleccionado !== '') {
        url += `gender=${generoSeleccionado}&`;
    }
    if(cantidad !== '') {
        url += `amount=${cantidad}`;
    }
    console.log(url);

    //Conectar con Ajax
    //Iniciar XMLHttpRequest
    const xhr = new XMLHttpRequest();
    //Abrimos la conexion
    xhr.open('GET', url, true);
    //Datos e impresion del templete
    xhr.onload = function() {
        if(this.status === 200){
            const nombres = JSON.parse(this.responseText);
            //Generar el HTML
            let htmlNombres = "<h2>Nombres Generados</h2>";

            htmlNombres += '<ul class="lista">';

            //Imprimir cada nombre
            nombres.forEach(function(nombre){
                htmlNombres += `
                    <li>${nombre.name}</li>
                `;
            });

            htmlNombres += '</ul>';

            document.getElementById('resultado').innerHTML = htmlNombres;
        }
    }
    //Eviamos el request
    xhr.send();
}