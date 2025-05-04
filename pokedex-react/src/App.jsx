import { useState, useEffect } from 'react';

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [search, setSearch] = useState('');
  const [searchId, setSearchId] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPokemon = async (poke) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`);
      if (!response.ok) throw new Error('Pokémon não encontrado');
      const data = await response.json();
      setPokemon(data);
      setSearchId(data.id);
    } catch (error) {
      setPokemon(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon(searchId);
  }, [searchId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      fetchPokemon(search.toLowerCase());
      setSearch('');
    }
  };

  return (
    <main className="pokedex-container">
      <div className="pokedex-wrapper">
        <img src="/pokedex.png" alt="pokedex" className="pokedex" />

        {pokemon?.sprites?.versions?.['generation-v']?.['black-white']?.animated?.front_default && (
          <img
            src={pokemon.sprites.versions['generation-v']['black-white'].animated.front_default}
            alt={pokemon.name}
            className="pokemon__image"
          />
        )}
      </div>

      <h1 className="pokemon__data">
        {isLoading ? (
          'Loading...'
        ) : pokemon ? (
          <>
            <span className="pokemon__number">{pokemon.id}</span> -
            <span className="pokemon__name"> {pokemon.name}</span>
          </>
        ) : (
          <span>Not found :c</span>
        )}
      </h1>

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="search"
          className="input__search"
          placeholder="Name or Number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          required
        />
      </form>

      <div className="buttons">
        <button
          className="button btn-prev"
          onClick={() => searchId > 1 && setSearchId(searchId - 1)}
        >
          Prev &lt;
        </button>
        <button
          className="button btn-next"
          onClick={() => setSearchId(searchId + 1)}
        >
          Next &gt;
        </button>
      </div>
    </main>
  );
}

export default App;
