import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './PokemonDetails.css'

function PokemonDetails({pokemonName}) {
    const {id} = useParams()
    const [pokemon, setPokemon] = useState({})
    async function downloadPokemon() {
        try{
          
            let response ;
            if(pokemonName){
                 response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            }
            else{
                response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`) ;
            }
            
            setPokemon({
                name: response.data.name,
                image: response.data.sprites.other.dream_world.front_default,
                weight: response.data.weight,
                height: response.data.height,
                types: response.data.types.map((t) => t.type.name)
           })
        }
    
        catch(err){
            console.log("Something went wrong");
        }
    }
    useEffect(() => {
        downloadPokemon()
    },[])

    return(
        <div className="pokemon-details-wrapper"> 
            <img className="pokemon-details-image" src={pokemon.image}/>
            <div className="pokemon-details-name"> <span>{pokemon.name}</span></div>
            <div className="pokemon-details-name">Height: {pokemon.height}</div>
            <div className="pokemon-details-name">Weight: {pokemon.weight}</div>
            <div className="pokemon-details-types">
             { pokemon.types && pokemon.types.map((t) => <div key={t}> {t} </div>)}
            </div>
        </div>
    )
} 

export default PokemonDetails;