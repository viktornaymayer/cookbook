import {FC} from 'react'
import {IngredientsPropsType} from '../types/RecipesTypes'
import Ingredient from './Ingredient'

const IngredientList: FC<IngredientsPropsType> = ({ingredients}) => {
  const ingredientElements = ingredients.map(ingredient => {
    return <Ingredient key={ingredient.id} {...ingredient} />
  })
  return (
    <div className="ingredient-grid">
      {ingredientElements}
    </div>
  )
}

export default IngredientList