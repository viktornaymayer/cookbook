import {FC, useContext} from 'react'
import {RecipePropsType, RecipeContextPropsType} from '../types/RecipesTypes'
import {RecipeContext} from './App'
import IngredientList from './IngredientList'

const Recipe: FC<RecipePropsType> = (props) => {
  const {
    recipe: {
      id,
      name,
      servings,
      cookTime,
      instructions,
      ingredients
    }
  } = props

  const { 
    handleRecipeDelete,
    handleRecipeSelect
  }: RecipeContextPropsType = useContext(RecipeContext)

  return (
    <div className="recipe">
      <div className="recipe__header">
        <h3 className="recipe__title">{name}</h3>
        <div className="recipe__row">
          <button
            className="btn btn--primary mr-8"
            title="Редактировать рецепт"
            onClick={() => handleRecipeSelect(id)}
            >&#9998;</button>
          <button
            className="btn btn--danger"
            title="Удалить рецепт"
            onClick={() => handleRecipeDelete(id)}
            >&times;</button>
        </div>
      </div>
      <div>
        <div className="recipe__row">
          <span className="recipe__label">Время приготовления:</span>
          <span className="recipe__value">{cookTime}</span>
        </div>
        <div className="recipe__row">
          <span className="recipe__label">Кол-во порций:</span>
          <span className="recipe__value">{servings}</span>
        </div>
        <div className="recipe__row recipe__ingredients">
          <span className="recipe__label">Ингредиенты:</span>
          <div className="recipe__value recipe__value--indented">
            <IngredientList ingredients={ingredients}/>
          </div>
        </div>
        <div className="recipe__row">
          <span className="recipe__label">Инструкция приготовления:</span>
          <div className="recipe__value recipe__value--instructions recipe__value--indented">
            {instructions}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recipe