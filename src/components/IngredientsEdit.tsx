import {FC} from 'react'
import {IngredientPropsType} from '../types/RecipesTypes'

const IngredientsEdit:FC<IngredientPropsType> = (props) => {
  const {
    ingredient,
    handleIngredientChange,
    handleIngredientDelete
  } = props

  function handleChange(changes: object){
    handleIngredientChange(ingredient.id, {...ingredient, ...changes})
  }

  return (
    <>
      <input
        className="recipe-edit__input"
        type="text"
        onChange={e => handleChange({name: e.target.value})}
        value={ingredient.name}
      />
      <input
        className="recipe-edit__input"
        type="text"
        onChange={e => handleChange({amount: e.target.value})}
        value={ingredient.amount}
      />
      <button
        className="btn btn--danger"
        title="Удалить ингредиент"
        onClick={() => handleIngredientDelete(ingredient.id)}
      >&times;</button>
    </>
  )
}

export default IngredientsEdit