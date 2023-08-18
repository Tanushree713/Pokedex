import { useEffect, useState } from "react";
import axios from 'axios'
import './PokemonList.css'
import Pokemon from "../Pokemon/Pokemon";
function PokemonList() {
    const[pokemonlist, setPokemonList] = useState([])
    const[isLoading, setisLoading] = useState(true)
    const [pokedexURL, setPokedexURL] = useState ("https://pokeapi.co/api/v2/pokemon")
    const [nextURL, setNextURL] = useState('')
    const[prevURL, setPrevURL] = useState('')
    async function downloadPokemons() {
        setisLoading(true)
        const response = await axios.get(pokedexURL) //this downloads list of 20 pokemons
        const pokemonResults = response.data.results  //we get the array of pokemons from result  

        console.log(response.data)
        setNextURL(response.data.next)
        setPrevURL(response.data.previous)
        // iterating over the array of pokemans, and using their url, to create an array of promises       
        // that will download those 20 pokemons
        const pokemonResultPromise = pokemonResults.map((pokemon)=> axios.get(pokemon.url))
        // passing that promise array to axios.all
        const pokemonData = await axios.all(pokemonResultPromise) // array of 20 pokemon detailed data
        console.log(pokemonData)
        // now iterate on the data of each pokemon, and extract id, name, image and types
        const pokeListResult = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data
            return{
                id: pokemon.id,
                name: pokemon.name,
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                types: pokemon.types
            }
        })
        console.log(pokeListResult)
        setPokemonList(pokeListResult)
        setisLoading(false)
    }

    useEffect( () => {
        downloadPokemons()
    } ,[pokedexURL])

    return (
        <div className="pokemon-list-wrapper"> 
            <div className="pokemon-wrapper">
              {(isLoading) ? 'Loading....' :
                pokemonlist.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/>)
              }
            </div>
            <div className="controls">
                <button disabled = {prevURL == null} onClick={() => setPokedexURL(prevURL)}>Prev</button>
                <button disabled = {nextURL == null} onClick={() => setPokedexURL(nextURL)}>Next</button>
            </div>

        </div>
    )

}
export default PokemonList;