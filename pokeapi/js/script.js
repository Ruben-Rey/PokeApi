let container = document.getElementById("container");

const apiUrl = "https://pokeapi.co/api/v2/pokemon/";

container.addEventListener("click", function(event){
    const clickCard = event.target.closest(".card");
    if (clickCard){
        const pokemonId = clickCard.dataset.id; 
        getPokemonDetails(pokemonId);
    }
})

function getPokemonDetails(id){
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${id}/`;

    fetch(apiUrl)
        .then( (respuesta) => respuesta.json())
        .then( (data) =>{
            const modalContent = createModalContent(data);
            showModal(modalContent);
        })
        .catch(error => {
            console.log('Error', error);
        });
}

function createModalContent(pokemon) {
    const name = pokemon.name;
    const img = pokemon.sprites.other.home.front_default;
    const hp = pokemon.stats[0].base_stat;
    const attack = pokemon.stats[1].base_stat;
    const defense = pokemon.stats[2].base_stat;
    const typeColors = getTypeColor(pokemon.types[0].type.name)
    
    const content = `
        <div class="modal-card" style="background-color: ${typeColors}">
            <p>${hp}</p>
            <img class="imgPoke" src="${img}" alt="${name}">
            <h1> ${name} </h1>
            <div class="stats">
                <p> Attack <br>
                   ${attack}</p>
                <p> Defense <br>${defense}</p>
                <p> Hp <br> ${hp}</p>
            </div>
            
        </div>
    `;
    
    return content;

}

function showModal(content) {
    const modalOverlay = document.createElement("div");
    modalOverlay.className = "modal-overlay";
    
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = content;
    
    modalOverlay.appendChild(modal);
    document.body.appendChild(modalOverlay);
    
    modalOverlay.addEventListener("click", function(event) {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });
}

// Función para cerrar la ventana emergente
function closeModal() {
    const modalOverlay = document.querySelector(".modal-overlay");
    modalOverlay.remove();
}

function getPoke(url){
    fetch(url)
        .then( (respuesta) =>{
            return respuesta.json();
        })
        .then( (data) =>{
            let results = data.results; 
            showPokemon(results);
        } )
}

function showPokemon(array){
    array.map( (element) =>{
        fetch(element.url)
            .then( (respuesta) => {
                return respuesta.json();
            })
            .then( (data) =>{
                createCard(data);
            })
    })
}

function createCard(pokemon){
    let name = pokemon.name;
    let img = pokemon.sprites.other.home.front_default;
    let id = pokemon.id;

    let card = document.createElement("div");
    card.className = "card";
    card.dataset.id = pokemon.id;

    let content = `
        <p>${name}</p>
        <img class="imgPoke" src="${img}" alt="${name}">
        <p>${id}</p>
        `;

    card.innerHTML = content;
    container.appendChild(card);
}

const typeColors = {
    grass: "#4CAF50",   // Verde
    fire: "#FF5722",    // Naranja
    water: "#2196F3",   // Azul
    poison: "#2196F3",
    water: "#02C2E5",
    bug: "#85E502",
    normal: "#F59CFB",

};

function getTypeColor(type) {
    return typeColors[type] || "#000000"; // Negro como valor predeterminado
}




getPoke(apiUrl);