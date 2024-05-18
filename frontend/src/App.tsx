// import "./App.css";
// import { FormEvent, useEffect, useRef, useState } from "react";
// import * as api from "./api";
// import { Recipe } from "./types";
// import RecipeCard from "./components/RecipeCard";
// import RecipeModal from "./components/RecipeModal";
// import { AiOutlineSearch } from "react-icons/ai";

// type Tabs = "search" | "favourites";

// const App = () => {
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [recipes, setRecipes] = useState<Recipe[]>([]);
//   const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(
//     undefined
//   );
//   const [selectedTab, setSelectedTab] = useState<Tabs>("search");
//   const [favouriteRecipes, setFavouriteRecipes] = useState<Recipe[]>([]);
//   const pageNumber = useRef(1);

//   useEffect(() => {
//     const fetchFavouriteRecipes = async () => {
//       try {
//         const favouriteRecipes = await api.getFavouriteRecipes();
//         setFavouriteRecipes(favouriteRecipes.results);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchFavouriteRecipes();
//   }, []);

//   const handleSearchSubmit = async (event: FormEvent) => {
//     event.preventDefault();
//     try {
//       const recipes = await api.searchRecipes(searchTerm, 1);
//       setRecipes(recipes.results);
//       pageNumber.current = 1;
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const handleViewMoreClick = async () => {
//     const nextPage = pageNumber.current + 1;
//     try {
//       const nextRecipes = await api.searchRecipes(searchTerm, nextPage);
//       setRecipes([...recipes, ...nextRecipes.results]);
//       pageNumber.current = nextPage;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const addFavouriteRecipe = async (recipe: Recipe) => {
//     try {
//       await api.addFavouriteRecipe(recipe);
//       setFavouriteRecipes([...favouriteRecipes, recipe]);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const removeFavouriteRecipe = async (recipe: Recipe) => {
//     try {
//       await api.removeFavouriteRecipe(recipe);
//       const updatedRecipes = favouriteRecipes.filter(
//         (favRecipe) => recipe.id !== favRecipe.id
//       );
//       setFavouriteRecipes(updatedRecipes);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="app-container">
//       <div className="header">
//         <img src="/hero-image2.jpg"></img>
//         <div className="title">Aplicatia de retete</div>
//       </div>
//       <div className="tabs">
//         <h1
//           className={selectedTab === "search" ? "tab-active" : ""}
//           onClick={() => setSelectedTab("search")}
//         >
//           Recipe Search
//         </h1>
//         <h1
//           className={selectedTab === "favourites" ? "tab-active" : ""}
//           onClick={() => setSelectedTab("favourites")}
//         >
//           Favourites
//         </h1>
//       </div>

//       {selectedTab === "search" && (
//         <>
//           <form onSubmit={(event) => handleSearchSubmit(event)}>
//             <input
//               type="text"
//               required
//               placeholder="Enter a search term ..."
//               value={searchTerm}
//               onChange={(event) => setSearchTerm(event.target.value)}
//             ></input>
//             <button type="submit">
//               <AiOutlineSearch size={40} />
//             </button>
//           </form>

//           <div className="recipe-grid">
//             {recipes.map((recipe) => {
//               const isFavourite = favouriteRecipes.some(
//                 (favRecipe) => recipe.id === favRecipe.id
//               );

//               return (
//                 <RecipeCard
//                   recipe={recipe}
//                   onClick={() => setSelectedRecipe(recipe)}
//                   onFavouriteButtonClick={
//                     isFavourite ? removeFavouriteRecipe : addFavouriteRecipe
//                   }
//                   isFavourite={isFavourite}
//                 />
//               );
//             })}
//           </div>

//           <button className="view-more-button" onClick={handleViewMoreClick}>
//             View More
//           </button>
//         </>
//       )}

//       {selectedTab === "favourites" && (
//         <div className="recipe-grid">
//           {favouriteRecipes.map((recipe) => (
//             <RecipeCard
//               recipe={recipe}
//               onClick={() => setSelectedRecipe(recipe)}
//               onFavouriteButtonClick={removeFavouriteRecipe}
//               isFavourite={true}
//             />
//           ))}
//         </div>
//       )}

//       {selectedRecipe ? (
//        <RecipeModal
//           recipeId={selectedRecipe.id.toString()}
//           o nClose={() => setSelectedRecipe(undefined)}
//         />
//       ) : null}
//     </div>
//   );
// };

// export default App;
import React, { FormEvent, useEffect, useRef, useState } from "react";
import "./App.css";
import * as api from "./api";
import { Recipe } from "./types";
import RecipeCard from "./components/RecipeCard";
import RecipeModal from "./components/RecipeModal";
import { AiOutlineSearch } from "react-icons/ai";
import IngredientChecklist from './components/IngredientChecklist';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';


type Tabs = "search" | "favourites";

const App = () => {

  
  
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState<string>("");

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(
        undefined
      );
  
      const [selectedTab, setSelectedTab] = useState<Tabs>("search");
      const [favouriteRecipes, setFavouriteRecipes] = useState<Recipe[]>([]);
  const pageNumber = useRef(1);

  useEffect(() => {
    const fetchFavouriteRecipes = async () => {
      try {
        const favouriteRecipes = await api.getFavouriteRecipes();
        setFavouriteRecipes(favouriteRecipes.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFavouriteRecipes();
  }, []);
 

  const handleViewMoreClick = async () => {
    const nextPage = pageNumber.current + 1;
    try {
      console.log(`Fetching page ${nextPage} for search term: ${searchTerm}`);
      const nextRecipes = await api.searchRecipes(searchTerm, nextPage);
      console.log(`Received ${nextRecipes.length} new recipes`, nextRecipes);
      setRecipes((prevRecipes) => [...prevRecipes, ...nextRecipes]);
      pageNumber.current = nextPage;
    } catch (error) {
      console.error("Error fetching more recipes:", error);
    }
  };
  

  const handleSearchSubmit = async (event: FormEvent) => {
   
    event.preventDefault();
    try {
      const recipes = await api.searchRecipes(searchTerm, 1);
      setRecipes(recipes);
     pageNumber.current = 1;
    } catch (e) {
      console.log(e);
    }
  };
  
  const addFavouriteRecipe = async (recipe: Recipe) => {
        try {
          await api.addFavouriteRecipe(recipe);
          setFavouriteRecipes([...favouriteRecipes, recipe]);
        } catch (error) {
          console.log(error);
        }
      };

        const removeFavouriteRecipe = async (recipe: Recipe) => {
    try {
      await api.removeFavouriteRecipe(recipe);
      const updatedRecipes = favouriteRecipes.filter(
        (favRecipe) => recipe.id !== favRecipe.id
      );
      setFavouriteRecipes(updatedRecipes);
    } catch (error) {
      console.log(error);
    }
  };

  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);



  const handleIngredientSelect = (ingredientName: string) => {
    setSelectedIngredients((prevIngredients) => {
      // Verifică dacă ingredientul este deja selectat
      if (!prevIngredients.includes(ingredientName)) {
        // Dacă nu este, îl adaugă la listă
        return [...prevIngredients, ingredientName];
      } else {
        // Dacă este deja selectat, îl elimină din listă
        return prevIngredients.filter(ingredient => ingredient !== ingredientName);
      }
    });
  };

  useEffect(() => {
    setSearchTerm(selectedIngredients.join(', '));
  }, [selectedIngredients]);

  

  return (
    <div className="app-container">
   <button className="admin-button" onClick={() => navigate('/admin')}>Pagina Admin</button>
      <div className="header">
        <img src="/hero-image2.jpg" alt="hero-image"></img>
        <div className="title">Retete</div>
      </div>
      
      {/* Other components */}
      <IngredientChecklist onIngredientSelect={handleIngredientSelect} />
    {/* Other components */}
       <div className="tabs">
       <div>
    
  </div>
  <h1 
  className={selectedTab === "search" ? "tab-active" : ""}
  onClick={() => setSelectedTab("search")}>Cautare retete</h1>
  <h1 
  className={selectedTab === "favourites" ? "tab-active" : ""}
  onClick={() => setSelectedTab("favourites")}>Favorite</h1>
</div>
{selectedTab === 'search' && (<>

  <form onSubmit={(event)=> handleSearchSubmit(event)}>
      <input
          type="text"
          required
          placeholder="Cauta retete..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button type="submit"><AiOutlineSearch size={40}/></button>
      </form>

      <div className="recipe-grid">
      {recipes.map((recipe) => {
          const isFavourite = favouriteRecipes.some(
            (favRecipe) => recipe.id === favRecipe.id
          );

        return (
          <RecipeCard
            key={recipe.id}
            recipe={recipe} onClick={() => setSelectedRecipe(recipe)}
            onFavouriteButtonClick={isFavourite ? removeFavouriteRecipe : addFavouriteRecipe} 
            isFavourite={isFavourite}
            
            
            /> 
        );
      })}
        
      </div>
     
      
      <button className="view-more-button" onClick={handleViewMoreClick}>
  Mai multe retete
</button>



</>  
)}

{selectedTab === 'favourites' && (
  <div className="recipe-grid">
             {favouriteRecipes.map((recipe) => (
              <RecipeCard
                recipe={recipe}
                onClick={() => setSelectedRecipe(recipe)}
                onFavouriteButtonClick = {removeFavouriteRecipe}
                isFavourite={true}
              />
            ))}
          </div>
)}

      
{selectedRecipe ? <RecipeModal recipeId={selectedRecipe.id.toString()} onClose={()=>setSelectedRecipe(undefined)} /> : null}
   

   
    </div>
  );
};



export default App;