import { useState } from 'react';
import PokeballGif from '../../pokeball.gif';

const SearchBar = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [pokemonName, setPokemonName] = useState("");
    const [pokemonChosen, setPokemonChosen] = useState(false);
    const [pokemon, setPokemon] = useState([]);



  function fetchPokemon() {
    setIsLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
      (res) => {
        res.json().then((response) => {
          console.log(response);
          setPokemon({
            name: response.name, 
        });
        setPokemonChosen(true);
        setIsLoading(false);
        });
    });
  }
    return (
        <div className="searchBar-container">
            <div className="searchBar-section">
                <input type="text" onChange={(event) => {setPokemonName(event.target.value)}}/>
                { isLoading ? <img src={PokeballGif} alt="loading" /> : null}
                <button onClick={fetchPokemon}>Search a Pokemon</button>
            </div>
            <div className="displaySection">
            {!pokemonChosen ? (
                <h1>Search a pokemon</h1>
            ) : (
            <>
            <h1>{pokemon.name}</h1>
            </>
            )}
            </div>
        </div>
    )
}

export default SearchBar;