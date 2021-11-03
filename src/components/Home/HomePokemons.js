import React from 'react';
import './HomePokemons.css'
import { useState, useEffect } from 'react';
import PokemonDetails from '../PokemonDetails/PokemonDetails';



function HomePokemons () {

    const [allPokemons, setAllPokemons] = useState([]);
    const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=77');
  
    const getAllPokemons = async () => {
      const res = await fetch(loadMore);
      const data = await res.json();
  
      setLoadMore(data.next)
      console.log(loadMore)
    
  
      function createPokemonObject (result) {
        result.forEach( async (pokemon) => {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
          const data = await res.json();
          const dataSort = (arr) => [...arr, data].sort((a, b) => a.id > b.id ? 1 : -1)
          setAllPokemons(currentList => dataSort(currentList));
        })
      }
      createPokemonObject(data.results);
    }
  
    useEffect(() => {
      getAllPokemons();
    }, [])



    return (
      <div className="pokemons-container">
        <h1>Pokemon Evolution</h1>
        <div className="pokemon-container">
          <div className="all-containers">
            {/* <SearchBar /> */}
            {allPokemons.map((pokemonStats, index) => 
            <PokemonDetails
            key={index}
            id={pokemonStats.id}
            name={pokemonStats.name}
            image={pokemonStats.sprites.other.dream_world.front_default}
            type={pokemonStats.types[0].type.name}
            weight={pokemonStats.weight}
            />
          )}
          </div>
          <button className="load-more" onClick={() => getAllPokemons()}>Load More</button>
      </div>
    </div>  
    )
}

export default HomePokemons;