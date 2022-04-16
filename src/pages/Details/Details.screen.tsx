import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { GiWeight, GiBodyHeight } from 'react-icons/gi';
import * as pokemonActions from '../../store/actions/pokemonAction';

import {
  ContainerDetails,
  ContainerStats,
  DivPokemon,
  HeaderDetails,
  ImgPokeball,
  ImgPokemon,
  Titles,
} from './Details.style';

import pokeballBack from '../../images/pokeball_back.png';

const Details = (reducers: any) => {
  const { id } = useParams();
  const { pokemons, dispatch, loading } = reducers;

  useEffect(() => {
    pokemonActions.setPokemonDetails(id, dispatch);
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <h1>loading...</h1>;
  }

  return (
    <ContainerDetails
    // color={pokemonActions.setPokemonColor(pokemons.type[0].type.name)}
    >
      <ImgPokeball src={pokeballBack} alt="pokebola" />
      <HeaderDetails>
        <h1>
          <a href="/">
            <AiOutlineArrowLeft style={{ color: '#fff' }} />
          </a>
        </h1>
        <h1>{pokemons.name}</h1>
        <h2>{`#${String(pokemons.id).padStart(3, '0')}`}</h2>
      </HeaderDetails>
      <DivPokemon>
        <ImgPokemon
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemons.id}.png`}
          alt={pokemons.name}
        />
      </DivPokemon>
      <ContainerStats>
        <Titles><h2>About</h2></Titles>
        <div>
          <h1><GiWeight/></h1>
          <p>{(pokemons.weight*100)/1000} kg</p>
        </div>
        <div>
          <h1><GiBodyHeight/></h1>
          <p>{(pokemons.height*10)/100} m</p>
        </div>
        <div>
          <p>Moves</p>
        </div>
        <div><p>{pokemons.text}</p></div>
        <Titles><h2>Base Stats</h2></Titles>
      </ContainerStats>
    </ContainerDetails>
  );
};

const mapStateToProps = (state: any) => ({
  pokemons: state.pokemonReducer.activePokemon,
  loading: state.pokemonReducer.loading,
});

export default connect(mapStateToProps)(Details);
