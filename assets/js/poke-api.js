//objetos e funções de manipulação da poke api

const pokeApi = {}



function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] =  types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}


//pega os detalhes dos pokemons
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}



pokeApi.getPokemons = (offset = 0, limit = 6) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)

        // Jeito reduzido para criar um fetch api
        .then((response) => response.json()) //recebe o retorno da promise e transforma para json
        .then((jsonBody) => jsonBody.results) //recebe o primeiro then convertido e busca results na api
        //vai no servidor, busca a lista pokemons, converteu para json, pega a lista dentro do json e transforma em uma nova lista (uma lista de promise) de detalhes do pokemon
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        //lista de promessas, espera a lista ser resolvida
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)

        // .catch((error) => console.error(error))

}









