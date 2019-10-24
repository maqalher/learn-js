document.querySelector('#generar-nombre').addEventListener('submit', cargarNombre);

// 
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
    //console.log(url);

    //Crear Fetch
    fetch(url)
        .then(function(res){
            //console.log(res.json());
            return res.json();
        })
        .then(function(data){
            let html = `<h2>Nombres Generados</h2>`;
            html += `<ul class="lista">`;
            data.forEach(function(nombre){
                html += `
                    <li>${nombre.name}</li>
                `;
            });
            html += `</ul>`;
            document.querySelector('#resultado').innerHTML = html;
        })
        .catch(function(error){
            console.log(error);
        });
       

    
}