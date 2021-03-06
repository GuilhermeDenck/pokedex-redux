import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect, RootStateOrAny } from 'react-redux';
import { MdOutlineCatchingPokemon } from 'react-icons/md';
import Colors from '../../enums/ColorsEnums';
import * as pokemonActions from '../../store/actions/pokemonAction';
import { PokemonDTO, PokemonsFilterDTO } from '../../models/PokemonDTO';
import Card from '../../components/Card/Card.component';
import {
  BtnPokemon,
  CardPokemon,
  Container,
  ContainerFind,
  ContainerPokemons,
  InputFind,
} from './Home.style';
import Loading from '../../components/Loading/Loading.component';

const Home = (reducers: any) => {
  
  const navigate = useNavigate();
 
  const { pokemons, dispatch, loading } = reducers;
  const [setSearch, setSearchPokemon] = useState<boolean>(false);
  const [pokeFind, setPokeFind] = useState<Array<PokemonsFilterDTO>>([]);

  pokemonActions.sortPokemon(pokemons);

  const handleSearch = (value: string) => {
    const regex = new RegExp(value, 'gim');

    const pokemonsFiltered = pokemons.filter((pokemon: PokemonDTO) => {
      
      return pokemon.name.match(regex);
    });

    if (pokemonsFiltered.length !== 0) {
      setPokeFind(pokemonsFiltered);
      setSearchPokemon(true);
    } else {
      setSearchPokemon(false);
    }
  };

  useEffect(() => {
    pokemonActions.getPokemon(dispatch);
  }, []);
  
  return (
    <Container>
      <ContainerFind>
        <h1>
          <MdOutlineCatchingPokemon /> Pokédex
        </h1>
        <InputFind
          type="text"
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search"
        />
      </ContainerFind>
  
      {loading ? (
        <Loading />
      ) : (
        <ContainerPokemons>
          {setSearch
            ? pokeFind.map((pokemon: PokemonsFilterDTO) => (
                <CardPokemon
                  key={pokemon.id}
                  color={Colors[pokemon?.type[0]?.type?.name]}
                >
                  <BtnPokemon onClick={() => navigate(`/details/${pokemon.id}`)}>
                    <Card obj={pokemon} />
                  </BtnPokemon>
                </CardPokemon>
              ))
            : pokemons.map((pokemon: PokemonDTO) => (
                <CardPokemon
                  key={pokemon.id}
                  color={Colors[pokemon?.type[0]?.type?.name]}
                >
                  <BtnPokemon onClick={() => navigate(`/details/${pokemon.id}`)}>
                    <Card obj={pokemon} />
                  </BtnPokemon>
                </CardPokemon>
              ))}
        </ContainerPokemons>
      )}
    </Container>
  );
};

const mapStateToProps = (state: RootStateOrAny) => ({
  pokemons: state.pokemonReducer.pokemons,
  loading: state.pokemonReducer.loading,
});

export default connect(mapStateToProps)(Home);
