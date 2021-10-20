import { useState } from 'react';
import './App.css';
import PokeballGif from './pokeball.gif';

function App() {

  const [isLoading, setIsLoading] = useState(false);

  const [pokemonName, setPokemonName] = useState("");

  const [pokemonChosen, setPokemonChosen] = useState(false);

  const [pokemon, setPokemon] = useState({
    name: "", 
    species: "", 
    img: "", 
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });

  function fetchData() {
      setIsLoading(true);
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
        (res) => {
          res.json().then((response) => {
            console.log(response);
            setPokemon({
              name: response.name, 
              species: response.species.name, 
              img: response.sprites.front_default, 
              hp: response.stats[0].base_stat,
              attack: response.stats[1].base_stat,
              defense: response.stats[2].base_stat,
              type: response.types[0].type.name,
          });
          setPokemonChosen(true);
          setIsLoading(false);
          });
    });
  }

  return (
    <div className="App">
      <div className="TitleSection">
        <h1>Pokemon Stats</h1>
        <input type="text" onChange={(event) => {setPokemonName(event.target.value)}}/>

        { isLoading ? <img src={PokeballGif} alt="loading" /> : null}
        <button onClick={fetchData}>Fetch Pokemon</button>
      </div>
      <div className="DisplaySection">
        {!pokemonChosen ? (
          <h1>Please choose a pokemon</h1>
        ) : (
          <>
          <h1>{pokemon.name}</h1>
          <img src={pokemon.img} alt="" />
          <h3>Species: {pokemon.species}</h3>
          <h3>Type: {pokemon.type}</h3>
          <h4>Hp: {pokemon.hp}</h4>
          <h4>Attack: {pokemon.attack}</h4>
          <h4>Defense: {pokemon.defense}</h4>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
