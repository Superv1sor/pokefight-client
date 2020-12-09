import React, { useState, useEffect } from "react";
import "./App.css";
import { Link, Switch, Route, useParams } from "react-router-dom";

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);
  useEffect(() => {
    fetch("https://pokefight-api.herokuapp.com/pokemon")
      .then((res) => res.json())
      .then((res) => setPokemon(res));
  }, []);
  return (
    <>
      {pokemon.map((p) => (
        <li>
          <Link to={`/pokemon/${p.id}`}>{p.name.english}</Link>
        </li>
      ))}
    </>
  );
};

const PokemonSingle = ({ pokemon }) => {
  const { id } = useParams();
  const [matchedPokemon, setMatchedPokemon] = useState();
  useEffect(() => {
    fetch(`https://pokefight-api.herokuapp.com/pokemon/${id}`)
      .then((res) => res.json())
      .then((res) => setMatchedPokemon(res));
  }, []);
  return matchedPokemon ? (
    <div className="detail">
      <h1>{matchedPokemon.name.english}</h1>
      <h2>ID: {matchedPokemon.id}</h2>
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
  ) : (
    <>loading.....</>
  );
};

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <PokemonList />
        </Route>
        <Route exact path="/pokemon/:id">
          <PokemonSingle />
        </Route>
        <Route exact path="/pokemon/:id/:info"></Route>
      </Switch>
    </div>
  );
}
