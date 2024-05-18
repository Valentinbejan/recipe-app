import React, { useState } from 'react';
import "./IngredientChecklist.css";

const IngredientChecklist = ({ onIngredientSelect }: { onIngredientSelect: (name: string) => void }) => {
  const [ingredients, setIngredients] = useState([
    { name: 'egg', available: false },
    { name: 'onion', available: false },
    { name: 'sunflower oil', available: false },
    { name: 'potatoes', available: false },
    { name: 'garlic', available: false },
    { name: 'flour', available: false },
    { name: 'milk', available: false },
    { name: 'tomatoes', available: false },
    { name: 'carrots', available: false },
    { name: 'butter', available: false },
    { name: 'sugar', available: false },
    { name: 'paprika', available: false },
    { name: 'rice', available: false },
    { name: 'pasta', available: false }, 
{ name: 'bread', available: false }, 
{ name: 'cheese', available: false }, 
{ name: 'cornmeal', available: false }, 
{ name: 'vinegar', available: false }, 
{ name: 'sour cream', available: false }, 
{ name: 'olive oil', available: false }, 
{ name: 'oregano', available: false },
{ name: 'spaghetti', available: false },
{ name: 'parsley', available: false }, 
{ name: 'bell pepper', available: false }, 
{ name: 'bay leaf', available: false }, 
{ name: 'cinnamon', available: false },
{ name: 'lemon', available: false }, 
{ name: 'cucumbers', available: false }, 
{ name: 'yogurt', available: false }, 
{ name: 'baking powder', available: false }, 
{ name: 'chicken breast', available: false }, 
{ name: 'vanilla', available: false },
{ name: 'tomato paste', available: false }, 
{ name: 'tomato puree', available: false }, 
{ name: 'cocoa', available: false },
{ name: 'rum essence', available: false }, 
{ name: 'mustard', available: false },
{ name: 'honey', available: false },
{ name: 'zucchini', available: false }, 
{ name: 'vanilla sugar', available: false }, 
    // Add more ingredients as needed
  ]);

  const toggleIngredient = (index: number) => {
    const ingredient = ingredients[index];
    setIngredients(ingredients.map((ing, i) => 
      i === index ? { ...ing, available: !ing.available } : ing
    ));
    // Aici, pur și simplu notificăm componenta părinte despre schimbare
    onIngredientSelect(ingredient.name);
  };

  return (
    <div>
      <h2>Esențiale pentru cămară</h2>
      <div className="ingredient-list">
        {ingredients.map((ingredient, index) => (
          <div 
            key={index} 
            className={`ingredient ${ingredient.available ? 'available' : ''}`}
            onClick={() => toggleIngredient(index)}
          >
            {ingredient.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientChecklist;
