
// import React from "react";

// const AdminPage = () => {
//   return (
//     <div>
//       <h1>Pagina de Admin</h1>
//       {/* Adaugă aici conținut specific pentru admin */}
//     </div>
//   );
// };

// export default AdminPage;


import { useState, useCallback } from 'react';
import './AdminPage.css';

interface Recipe {
  name: string;
  ingredients: string[];
}

const useRecipeForm = (initialRecipe: Recipe) => {
  const [recipe, setRecipe] = useState<Recipe>(initialRecipe);
  const [submittedRecipes, setSubmittedRecipes] = useState<Recipe[]>([]);

  const resetForm = useCallback(() => {
    setRecipe({ name: '', ingredients: [''] });
  }, []);

  const handleRecipeNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRecipe((prevRecipe) => ({ ...prevRecipe, name: event.target.value }));
  }, []);

  const handleIngredientChange = useCallback((index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = event.target.value;
    setRecipe((prevRecipe) => ({ ...prevRecipe, ingredients: newIngredients }));
  }, [recipe.ingredients]);

  const handleAddIngredient = useCallback(() => {
    setRecipe((prevRecipe) => ({ ...prevRecipe, ingredients: [...prevRecipe.ingredients, ''] }));
  }, []);

  const handleRemoveIngredient = useCallback((index: number) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients.splice(index, 1);
    setRecipe((prevRecipe) => ({ ...prevRecipe, ingredients: newIngredients }));
  }, [recipe.ingredients]);

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedRecipes(prevRecipes => [...prevRecipes, { ...recipe, ingredients: recipe.ingredients.filter(ingredient => ingredient.trim() !== '') }]);
    resetForm();
  }, [recipe, resetForm]);

  return { recipe, submittedRecipes, handleRecipeNameChange, handleIngredientChange, handleAddIngredient, handleRemoveIngredient, handleSubmit };
};

const AdminPage: React.FC = () => {
  const { recipe, submittedRecipes, handleRecipeNameChange, handleIngredientChange, handleAddIngredient, handleRemoveIngredient, handleSubmit } = useRecipeForm({ name: '', ingredients: [''] });

  return (
    <div className="admin-page">
      <h1 className="admin-title">Pagina de Admin</h1>
      <form className="admin-form" onSubmit={handleSubmit}>
      <label className="recipe-name-label">
          Nume Reteta:
          <input type="text" className="recipe-name-input" value={recipe.name} onChange={handleRecipeNameChange} />
        </label>
        {recipe.ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient-item">
            <label className="ingredient-label">
              Ingredient:
              <input type="text" className="ingredient-input" value={ingredient} onChange={(event) => handleIngredientChange(index, event)} />
            </label>
            <button type="button" className="remove-ingredient-button" onClick={() => handleRemoveIngredient(index)}>Remove</button>
          </div>
        ))}
        <button type="button" className="add-ingredient-button" onClick={handleAddIngredient}>Add Ingredient</button>
        <button type="submit" className="submit-recipe-button">Submit Recipe</button>
      </form>
      {submittedRecipes.map((submittedRecipe, index) => (
        <div key={index} className="submitted-recipe">
          <h2>Rețeta</h2>
          <p>Nume: {submittedRecipe.name}</p>
          <h3>Ingrediente:</h3>
          <ul>
            {submittedRecipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AdminPage;
