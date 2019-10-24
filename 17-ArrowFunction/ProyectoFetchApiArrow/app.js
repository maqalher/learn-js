document.getElementById('txtBtn').addEventListener('click', cargarTxt);
document.getElementById('jsonBtn').addEventListener('click', cargarJson);
document.getElementById('apiBtn').addEventListener('click', cargarApi);

function cargarTxt() {
    fetch('datos.txt')
        .then(res => res.text())
        .then(empleados => document.getElementById('resultado').innerHTML = empleados)
        .catch(error => console.log(error));
}

function cargarJson() {
    fetch('empleados.json')
        .then(res => res.json())
        .then(data => {
            let html = '';
            data.forEach(function(empleado){
                html += `
                    <li>${empleado.nombre} - ${empleado.puesto}</li>
                `;
            });
            document.getElementById('resultado').innerHTML = html;
        })
        .catch(error => console.log(error));
}

function cargarApi() {
    fetch('https:///picsum.photos/list')
        .then(res => res.json())
        .then(imagenes => {
            let html = '';

            imagenes.forEach(function(imagen){
                html += `
                    <li>
                        <a target="_blank" href="${imagen.post_url}">Ver Imagen</a> ${imagen.author}
                    </li>
                `;
            });
            document.getElementById('resultado').innerHTML = html;
        })
        .catch(error => console.log(error));
}