//Ojo acceder a una clase te retorna una colecciòn de elementos
const contentCard = document.getElementById("content-card");
const pokeUrl = "https://pokeapi.co/api/v2/pokemon/";

// Consumir al api pokemon
function getApiPoke(url){
    fetch(url)
        .then( (response)=> response.json())
        .then( (data) =>{
            let results = data.results;
            iterarPoke(results);
        })
}

//Iteramos el arreglo de pokemones
function iterarPoke(results){
    
    results.map( (item) =>{
        fetch( item.url )
            .then( (response) => response.json())
            .then( (data) =>{
                createCard(data);
            } )
    })
    
}

function createCard(data){
    let img = data.sprites.other.home.front_default;
    let name = data.name;

    let card = document.createElement("div");
    // asignando la clase al DIV
    card.className = "card";

    card.dataset.id = data.id;

    let content = `
        <h2>${name}</h2>
        <img class="card-img" src="${img}" alt="">
    `;

    // inserta elementos HTML
    card.innerHTML = content;
    // inserta un solo elemento HTML
    contentCard.appendChild(card);
}

getApiPoke(pokeUrl);


// ***************Creando el Modal***************

contentCard.addEventListener("click", function(event){
    const clickCard = event.target.closest(".card");

    if(clickCard){
        const pokemonId = clickCard.dataset.id;
        getPokeDetails(pokemonId );
    }

});

function getPokeDetails(pokemonId){
    fetch(pokeUrl + pokemonId) //"https://pokeapi.co/api/v2/pokemon/ + 1/"
        .then( (response) => response.json())
        .then( (data) => {
            const modalContent = createModal(data);
            showModal(modalContent);
        })
}


function showModal(content){
    // este es el fondo que esta alredor del DIV modal(pantalla emergente)
    const modalBackground = document.createElement("div");
    modalBackground.className = "modal-background";

    const modal = document.createElement("div");
    modal.className = "modal";

    // insertando el cuerpo de etiquetas HTML VAR CONTENT
    modal.innerHTML = content;

    modalBackground.appendChild(modal);
    document.body.appendChild(modalBackground);

    modalBackground.addEventListener("click", function( event ){
        if (event.target === modalBackground){
            closeModal();
        }
    })
}

function createModal(data){

    //Obteniedo los valores de los atributos
    const name = data.name;
    const img = data.sprites.other.home.front_default;
    const id = data.id;
    const vida = data.stats[0].base_stat;
    const attack = data.stats[1].base_stat;
    const defense = data.stats[2].base_stat;


    const content = `
    <h2>${name}</h2>
    <p></p>
    <img class="card-img" src="${img}" alt="">
    <div class="stats">
        <p>Attack <br> ${attack}</p>

        <p>Defense <br>${defense}
        </p>

        <p>HP <br> ${vida}
        </p>
    </div>
    `;
    return content; 
}

// Función para cerrar la ventana emergente
function closeModal() {
    const modalBackground = document.querySelector(".modal-background");
    modalBackground.remove();
}
