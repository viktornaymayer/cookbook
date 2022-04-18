import '../css/recipe-edit.css'
import {RecipePropsType, IngredientType} from '../types/RecipesTypes'
import {FC, useContext} from 'react'
import { v4 as uuidv4 } from 'uuid'
import IngredientsEdit from './IngredientsEdit'
import { RecipeContext } from './App'

const RecipeEdit: FC<RecipePropsType>= ({recipe}) => {

  const { handleRecipeChange, handleRecipeSelect } = useContext(RecipeContext)

  function handleChange(changes: object){
    handleRecipeChange(recipe.id, {...recipe, ...changes})
  }
  function handleIngredientChange(id: string, ingredient: IngredientType){
    const newIngredients = [...recipe.ingredients]
    const index = newIngredients.findIndex(i => i.id === id)
    newIngredients[index] = ingredient
    handleChange({ingredients: newIngredients})
  }
  function handleIngredientAdd(){
    const newIngredient = {
      id: uuidv4(),
      name: '',
      amount: ''
    }
    handleChange({ingredients: [...recipe.ingredients, newIngredient]})
  }
  function handleIngredientDelete(id: string){
    handleChange({
      ingredients: recipe.ingredients.filter(i => i.id !== id)
    })
  }

  return (
    <div className="recipe-edit">
      <div className="recipe-edit__remove-button-container">
        <button
          className="btn recipe-edit__remove-button"
          title="Закрыть окно"
          onClick={() => handleRecipeSelect(undefined)}
        >
          &times;
        </button>
      </div>
      <div className="recipe-edit__details-grid">
        <label
          htmlFor="name"
          className="recipe-edit__label">
          Название рецепта
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="recipe-edit__input"
          value={recipe.name}
          onChange={e => handleChange({name: e.target.value})}/>
        <label
          htmlFor="cook-time"
          className="recipe-edit__label">
          Время приготовления
        </label>
        <input
          type="text"
          name="cook-time"
          id="cook-time"
          className="recipe-edit__input"
          value={recipe.cookTime}
          onChange={e => handleChange({cookTime: e.target.value})}/>
        <label
          htmlFor="servings"
          className="recipe-edit__label">
          Кол-во порций
        </label>
        <input
          type="number"
          min="1"
          name="servings"
          id="servings"
          className="recipe-edit__input"
          value={recipe.servings}
          onChange={e => 
            handleChange({servings: parseInt(e.target.value) || ''})
          }/>
        <label
          htmlFor="instructions"
          className="recipe-edit__label">
          Инструкция приготовления
        </label>
        <textarea
          name="instructions"
          className="recipe-edit__input"
          id="instructions"
          value={recipe.instructions}
          onChange={e => handleChange({instructions: e.target.value})}>
        </textarea>
      </div>
      <label className="recipe-edit__label">Ингредиенты</label>
      <div className="recipe-edit__ingredient-grid">
        <div>Название</div>
        <div>Количество</div>
        <div></div>
        {recipe.ingredients.map(ingredient => (
          <IngredientsEdit
            key={ingredient.id}
            handleIngredientChange={handleIngredientChange}
            handleIngredientDelete={handleIngredientDelete}
            ingredient={ingredient} 
          />
        ))}
      </div>
      <div className="recipe-edit__add-ingredient-btn-container">
        <button
          className="btn btn--primary"
          onClick={() => handleIngredientAdd()}>
          Добавить ингредиент
        </button>
      </div>
    </div>
  )
}

export default RecipeEdit