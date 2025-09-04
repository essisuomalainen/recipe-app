import React from "react";
import style from "./recipe.module.css";

const Recipe = ({ title, image, ingredients, instructions }) => {
  return (
    <div className={style.recipe}>
      <h2>{title}</h2>
      <img className={style.image} src={image} alt={title} />
      <ul className={style.ingredients}>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <p>{instructions}</p>
    </div>
  );
};

export default Recipe;
