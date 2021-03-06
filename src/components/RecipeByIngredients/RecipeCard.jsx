import React, { useState, useEffect } from "react";
import img from "../assets/img.jpeg";

const RecipeCard = ({ recipeData }) => {
  const [mealInfo, setMealInfo] = useState("");
  const API_KEY = "33e71d5b3fa0499f892952e41360671a"; // sharipaigul
  //const API_KEY = "7c570415bf7948e8a71509f9598ddebe"; // nuedukz
 
  
  const getRecipes = () => {
    
    let generateIDs = "";
    // for(let element in recipeData) {
    //   generateIDs += element.id + ",";
    //   console.log(generateIDs)
    // }
    // recipeData.forEach((element) => {
    //   generateIDs += element.id + ",";
    // });

    fetch(
      `https://api.spoonacular.com/recipes/informationBulk?apiKey=${API_KEY}&ids=${generateIDs}`
      
    )
      .then((response) => response.json())
      .then((data) => {
        setMealInfo(data);
        console.log(data);
      })
      .catch(() => {
        console.log("error");
      });
  };

  useEffect(() => {
    getRecipes();
  }, []);

  
  

  return (
    <div
      class="card-group"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gridAutoRows: "500px",
        gridColumnGap: "1rem",
        gridRowGap: "1rem",
      }}
    >
      {recipeData &&
        recipeData.map((recipe) => (
          <div
            key={recipe.id}
            className="card shadow-lg p-3 m-3 bg-white rounded h-100 text-center"
          >
            <img className="card-img-top" src={recipe.image} alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">{recipe.title}</h5>
              {mealInfo &&
                mealInfo.map((meal) => {
                  if (recipe.id === meal.id) {
                    return (
                      <ul>
                        <li>Preparation time: {meal.readyInMinutes} minutes</li>
                        <li>Number of servings: {meal.servings}</li>
                      </ul>
                    );
                  } else {
                    return <></>;
                  }
                })}
              
            
            <button class= "btn btn-info">
                    Recipe Details
                  </button>
            
            </div>
          </div>
        ))}
      
    </div>
  );
};

export default RecipeCard;
