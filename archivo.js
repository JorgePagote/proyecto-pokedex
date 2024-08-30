const botonBuscar = document.getElementById("btn-buscar")
const nombrePokemonInput = document.getElementById("nombrePokemon")
const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";


function displayPokemonInfo(pokemon) {

    pokemonInfoDiv.innerHTML = ""
    

    //Se usasn comillas invertidas para embebir HTML directamente
    pokemonInfoDiv.innerHTML = `
        <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
        <p>Weigth: ${pokemon.weight}</p>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        
    `
    
}


function fetchPokemonData(nombrePokemon) {
    //defino la URL de la pokeapi para buscar a mi pokemon
    let URL = `https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`

    //Hacemos la solicitud usando fetch
    fetch(URL)
    .then(res => {
       //Verificar si la respuesta es exitosa
        if(res.status != 200){
            throw new Error("Pokemon no encontrado");
        }
        return res.json()
    })
    .then(data =>{
        //Mostrar la información del pokemon
        displayPokemonInfo(data)
    })
    .catch(error => {
        //Mostramos un mensaje de error si no encontramon al pokemon
        pokemonInfoDiv.textContent = error.message
    })
}

//Añadimos un evento al botón de búsqueda para hacer la petición a la api
botonBuscar.addEventListener("click", () => {
    //trim(): Validación que remueve los espacios sobrantes antes y al final del texto
    //toLowerCase(): Validación para hacer la búsqueda en minúsculas independientemente de cómo lo escriba el usuario
    const nombrePokemon = nombrePokemonInput.value.trim().toLowerCase() 
    
    if(nombrePokemon){
        //Si el usuario coloca por lo menos un caracter en el input,
        //realizo la petición a la api
        nombrePokemonInput.value = ""
        fetchPokemonData(nombrePokemon) //Función que hace la solicitud a la api
    }else{
        //Sino, mando un mensaje de advertencia
        pokemonInfoDiv.textContent = "Por favor, ingresa un nombre de pokemon"
    }
    

})














for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
}

function mostrarPokemon(poke) {

    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }


    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}kg</p>
            </div>
        </div>
    `;
    listaPokemon.append(div);
}

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if(botonId === "ver-todos") {
                    mostrarPokemon(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarPokemon(data);
                    }
                }

            })
    }
}))



