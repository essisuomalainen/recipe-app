import React, {useEffect, useState} from 'react';
import Recipe from "./Recipe";
import './App.css';
import Header from "./Header";

const App = () => {

  const APP_ID = "53b8faab";
  const API_KEY = "2c8fdbba1c9f80c0b35defb7a84113cf";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState([]);
  const [query, setQuery] = useState('vegan');

  // how many times the api loads
  useEffect( () => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${API_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }
  return(
    <div className="App">
      <Header />
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}>
        </input>
          <button className="search-button" type="submit">Search</button>
        
      </form>
      <div className="recipes">

        {recipes.map(recipe =>(
          <Recipe 
          key={recipe.recipe.title}
          title={recipe.recipe.label} calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients} 
          />
        ))}
        </div>
    </div>
  );
};

export default App;
