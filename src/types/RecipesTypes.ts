export type RecipeType = {
  id: string
  name: string
  servings: number
  cookTime: string
  instructions: string
  ingredients: IngredientsType
}
export type IngredientType = {
  id: string,
  name: string,
  amount: string
}
export type IngredientsType = IngredientType[]
export type RecipesType = RecipeType[]

export type IngredientPropsType = {
  ingredient: IngredientType,
  handleIngredientChange: (id: string, ingredient: IngredientType) => void,
  handleIngredientDelete: (id: string) => void,
}
export type IngredientsPropsType = { ingredients: IngredientsType }
export type RecipePropsType = { recipe: RecipeType }
export type RecipeListPropsType = { recipes: RecipesType }

export type RecipeContextPropsType = {
    handleRecipeAdd: () => void,
    handleRecipeDelete: (id: string) => void,
    handleRecipeSelect: (id: string | undefined) => void,
    handleRecipeChange: (id: string, recipe: RecipeType) => void,
}


