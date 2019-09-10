// Variables
const listaTweets = document.getElementById('lista-tweets');

// Event Listeners

eventListeners();

function eventListeners(){
    // Cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);

    // Borrar Tweets
    listaTweets.addEventListener('click', borrarTweet);

    // Contenido Cargado
    document.addEventListener('DOMContentLoaded', localStorageListo); // Document Ready
}

// Funciones

//Añadir tweet del formulario
function agregarTweet(e){
    e.preventDefault();

    // Leer el valor del textarea
    const tweet = document.getElementById('tweet').value;
    // Crear el boton de eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';

    // Crear elemento y añadirle el contenido a la lista
    const li = document.createElement('li');
    li.innerText = tweet;
    // Añadir el boton borrar al tweet
    li.appendChild(botonBorrar);
    // Añadir el tweet a la lista
    listaTweets.appendChild(li);
    //console.log(tweet);

    // Añadir a local Storage
    agreagarTweetLocalStorage(tweet);
}

// Elimina el tweet del DOM
function borrarTweet(e){
    e.preventDefault();
    if(e.target.className === 'borrar-tweet'){
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);
    }
}

// Agrega tweet a local Storage
function agreagarTweetLocalStorage(tweet){
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    // Añadir el nuevo tweet
    tweets.push(tweet);
    // Convertir de string a arreglo para local storage
    localStorage.setItem('tweets', JSON.stringify(tweets));
}


// Comprobar que hay elementos en localstorage, retorna un arreglo
function obtenerTweetsLocalStorage() {
    let tweets;
    // Revisamos los valores de local storage
    if(localStorage.getItem('tweets') === null){
        tweets = [];
    }else{
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }

    return tweets;
}

// Mostrar datos de LocalStroage en la lista
function localStorageListo(){
    let tweets;

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet){
        // Crear el boton de eliminar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';

        // Crear elemento y añadirle el contenido a la lista
        const li = document.createElement('li');
        li.innerText = tweet;
        // Añadir el boton borrar al tweet
        li.appendChild(botonBorrar);
        // Añadir el tweet a la lista
        listaTweets.appendChild(li);
    })
}

// Eliminar tweet de local storage
function borrarTweetLocalStorage(tweet){
    let tweets, tweetBorrar;
    // Elimina la x del tweet
    tweetBorrar = tweet.substring(0, tweet.length -1);

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet, index){
        if(tweetBorrar === tweet){
            tweets.splice(index, 1);
        }
    });

    localStorage.setItem('tweets', JSON.stringify(tweets));
}