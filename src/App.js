import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "./App.css";
import Header from "./Header";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("vegan");

  useEffect(() => {
    const getRecipes = async () => {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await response.json();
      setRecipes(data.meals || []);
    };
    getRecipes();
  }, [query]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="App">
      <Header />
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
          placeholder="Search meals..."
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>

      <div className="recipes">
        {recipes.map((recipe) => {
          // build ingredients+measurements dynamically
          const ingredients = [];
          for (let i = 1; i <= 20; i++) {
            const ingredient = recipe[`strIngredient${i}`];
            const measure = recipe[`strMeasure${i}`];
            if (ingredient && ingredient.trim() !== "") {
              ingredients.push(
                `${measure ? measure : ""} ${ingredient}`.trim()
              );
            }
          }

          return (
            <Recipe
              key={recipe.idMeal}
              title={recipe.strMeal}
              image={recipe.strMealThumb}
              ingredients={ingredients}
              instructions={recipe.strInstructions}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
