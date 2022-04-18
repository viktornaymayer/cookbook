import {FC, useContext} from 'react';
import {
  RecipeListPropsType,
  RecipeContextPropsType
} from '../types/RecipesTypes';

import {RecipeContext} from './App';
import Recipe from './Recipe';

const RecipeList: FC<RecipeListPropsType>  = ({recipes}) => {
  const { handleRecipeAdd }:RecipeContextPropsType = useContext(RecipeContext)

  return (
    <>
      <div className="recipe-list">
        <div className="recipe-list__add-recipe-btn-container">
          <button
            className="btn btn--primary"
            title="Добавить рецепт"
            onClick={handleRecipeAdd}>
            Добавить рецепт
          </button>
        </div>
        { 
          recipes.map(recipe => {
            return (
              <Recipe key={recipe.id} recipe={recipe} />
            )
          }) 
        }
      </div>
    </>
  );
};

export default RecipeList;