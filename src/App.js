import React, { useState, useEffect } from "react";
import { Link, Switch, Route, useParams } from "react-router-dom";
import Axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);
  useEffect(() => {
    fetch("https://pokefight-api.herokuapp.com/pokemon")
      .then((res) => res.json())
      .then((res) => setPokemon(res));
  }, []);

  return pokemon ? (
    <>
      <ul>
        {pokemon.map((p) => (
          <li key={p.id}>
            <Link to={`/pokemon/${p.id}`}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
              />
              {p.name.english}
            </Link>
          </li>
        ))}
        <div className="clear"></div>
      </ul>
    </>
  ) : (
    <>
      <h1>Loading...</h1>
      <Spinner animation="border" variant="light" className="spnr" />
    </>
  );
};

const PokemonSingle = () => {
  const { id } = useParams();
  const [matchedPokemon, setMatchedPokemon] = useState();

  useEffect(() => {
    // do something after pokemon is loaded
  }, [matchedPokemon]);
  useEffect(() => {
    fetch(`https://pokefight-api.herokuapp.com/pokemon/${id}`)
      .then((res) => res.json())
      .then((res) => setMatchedPokemon(res));
  }, []);

  return matchedPokemon ? (
    <div className="detail">
      <h1>{matchedPokemon.name.english}</h1>
      <h2>ID: {matchedPokemon.id}</h2>
      <div>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        />
        <p>
          <b>Type: </b>
          {matchedPokemon.type}
          <br />
        </p>
        <p>
          <b>HP: </b>
          {matchedPokemon.base.HP}
        </p>
        <p>
          <b>Attack: </b>
          {matchedPokemon.base.Attack}
        </p>
        <p>
          <b>Defense: </b>
          {matchedPokemon.base.Defense}
        </p>
        <p>
          <b>Speed: </b>
          {matchedPokemon.base.Speed}
        </p>
      </div>
    </div>
  ) : (
    <Spinner animation="border" variant="light" />
  );
};

const PokemonSingleInfo = ({ pokemon }) => {
  const { id } = useParams();
  const { info } = useParams();
  const [matchedPokemon, setMatchedPokemon] = useState();
  useEffect(() => {
    fetch(`https://pokefight-api.herokuapp.com/pokemon/${id}/${info}`)
      .then((res) => res.json())
      .then((res) => setMatchedPokemon(res));
  }, [id, info]);
  return matchedPokemon ? (
    <div className="detail">
      <h1>{matchedPokemon[info]}</h1>
    </div>
  ) : (
    <Spinner animation="border" variant="light" />
  );
};

export default function App() {
  return (
    <div className="App">
      <div className="outdo">
        <Link to="/">
          <img
            className="logo"
            title="Reset Game"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2000px-International_Pok%C3%A9mon_logo.svg.png"
            alt="Pokemon"
          />
        </Link>
        <h1>Pokefight</h1>
        <Switch>
          <Route exact path="/">
            <PokemonList />
          </Route>
          <Route exact path="/pokemon/:id">
            <PokemonSingle />
          </Route>
          <Route exact path="/pokemon/:id/:info">
            <PokemonSingleInfo />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
