const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonList = document.getElementById('pokemonList');
const limit = 5;
let offset = 0;


const maxRecords = 11;

//retorna os tipos dos pokemons em formato json, busca os tipos diretamente da api
function convertPokemonTypesToLi(pokemonTypes) {
    return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)
}

function convertPokemonToHtml(pokemon) {
    return `
    <li class="pokemon ${pokemon.type}">

                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                     <ol class="types">
                      <!-- de forma dinamica, trás o tipo do pokemon atraves do js fetch api -->
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                     </ol>   

                    <!-- busca imagens dos pokemons diretamente da api -->
                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
            </li>
    `
}




function loadPokemonItens(offset, limit) {

    //puxa um pokemon por vez da api
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        //forma reduzida do codigo comentado logo abaixo
        const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}">

                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                     <ol class="types">
                      <!-- de forma dinamica, trás o tipo do pokemon atraves do js fetch api -->
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                     </ol>   

                    <!-- busca imagens dos pokemons diretamente da api -->
                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
            </li>
        `).join('')
        pokemonList.innerHTML += newHtml


        //transforma um pokemon no nome dele
        // const novaLista = pokemons.map((pokemon) => {
        //     return convertPokemonToHtml(pokemon)
        // })

        // const novoHtml = novaLista.join('')
        // pokemonList.innerHTML += novoHtml


    })
}



//forma inteira, NÃO REDUZIDA
//     const listItens = []

//     for (let i = 0; i < pokemons.length; i++) {
//         const pokemon = pokemons[i];
//         listItens.push(convertPokemonToHtml(pokemon))
//         //          concatenando com a lista
//     }
//     console.log(listItens)
// })

//sucesso
// .then(function (response) {
//     response.json().then(function (responseBody) {
//         console.log(responseBody)
//     }); //retorna o objeto convertido para JSON
// })

// //fracasso
// .catch(function (error) {
//     console.log(error);
// })
// //independente de dar certo ou errado
// .finally(function () {
//     console.log('Requisição concluída!')

// })

loadPokemonItens(offset, limit)


// limitador de pokemons que são chamados
loadMoreButton.addEventListener('click', () => {
    offset += limit 

    const qtdRecordsNexPage = offset + limit

    if (qtdRecordsNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        //pega o Button pai e o remove
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } 
    else{
        loadPokemonItens(offset, limit)
    }

})