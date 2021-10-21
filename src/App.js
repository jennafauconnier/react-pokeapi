import { useState, useEffect } from 'react';
import './App.css';
import PokemonCard from './components/PokemonCard';
import PokemonThumb from './components/PokemonThumb';


function App() {

  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');

  const getAllPokemons = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();

    setLoadMore(data.next)
  

    function createPokemonObject (result) {
      result.forEach( async (pokemon) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        const data = await res.json();

        setAllPokemons(currentList => [...currentList, data]);
      })
    }
    createPokemonObject(data.results);
    await console.log(allPokemons);
  }

  useEffect(() => {
    getAllPokemons();
  }, [])



  return (
    <div className="app-container">
      <h1>Pokemon Evolution</h1>
      <div className="pokemon-container">
        <div className="all-containers">
          {allPokemons.map((pokemonStats, index) => 
            <PokemonThumb
            key={index} 
            id={pokemonStats.id}
            name={pokemonStats.name}
            image={pokemonStats.sprites.other.dream_world.front_default}
            type={pokemonStats.types[0].type.name}
            />
          )}
        </div>
        <button className="load-more" onClick={() => getAllPokemons()}>Load More</button>
      </div>
    </div>
  );
}

export default App;
