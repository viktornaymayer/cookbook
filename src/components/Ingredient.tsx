import {FC} from 'react'
import {IngredientType} from '../types/RecipesTypes'


const Ingredient: FC<IngredientType> = ({name, amount}) => {
  return (
    <>
      <span>{name}</span>
      <span>{amount}</span>
    </>
  )
}

export default Ingredient