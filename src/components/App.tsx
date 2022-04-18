import {useState, createContext, useEffect} from 'react'
import '../css/app.css'
import {
  RecipeType,
  RecipesType,
  RecipeContextPropsType
} from '../types/RecipesTypes'

import { v4 as uuidv4 } from 'uuid'
import RecipeList from './RecipeList'
import RecipeEdit from './RecipeEdit'

const LOCAL_STORAGE_KEY = 'recipesNaymayer.recipes'

const recipeContextInit = {
  handleRecipeAdd: () => {},
  handleRecipeDelete: (id: string) => {},
  handleRecipeSelect: (id: string | undefined) => {},
  handleRecipeChange: (id: string) => {},
}
export const RecipeContext = 
  createContext<RecipeContextPropsType>(recipeContextInit)

function App() {
  const [recipes, setRecipes] = useState<RecipesType>(recipesDefaultInit)
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | undefined>()
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId)

  useEffect(()=>{
    const recipesJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (recipesJSON != null) setRecipes(JSON.parse(recipesJSON))
  }, [])

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes])

  function handleRecipeAdd(){
    const newRecipe = {
      id: uuidv4(),
      name: '',
      servings: 1,
      cookTime: '',
      instructions: '',
      ingredients: [
        { id: uuidv4(), name: '', amount: '' }
      ]
    }

    setSelectedRecipeId(newRecipe.id)
    setRecipes([...recipes, newRecipe])
  }
  function handleRecipeDelete(id: string){
    if(selectedRecipeId != null && selectedRecipeId === id)
      setSelectedRecipeId(undefined)

    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }
  function handleRecipeSelect(id: string | undefined){
    setSelectedRecipeId(id)
  }
  function handleRecipeChange(id: string, recipe: RecipeType){
    const newRecipes = [...recipes]
    const index = newRecipes.findIndex(r => r.id === id)
    newRecipes[index] = recipe
    setRecipes(newRecipes)
  }

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange
  }

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes}/>
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
    </RecipeContext.Provider>
  )
}

export default App

const recipesDefaultInit = [
  {
    id: 'first',
    name: 'Брауни (brownie)',
    servings: 3,
    cookTime: '40 Минут',
    instructions: '1. Шоколад разломать на кусочки и вместе со сливочным маслом растопить на водяной бане, не переставая все время помешивать лопаткой или деревянной ложкой. Получившийся густой шоколадный соус снять с водяной бани и оставить остывать.\n\n2. Тем временем смешать яйца со ста граммами коричневого сахара: яйца разбить в отдельную миску и взбить, постепенно добавляя сахар. Взбивать можно при помощи миксера или вручную — как больше нравится, — но не меньше двух с половиной-трех минут.\n\n3. Острым ножом на разделочной доске порубить грецкие орехи. Предварительно их можно поджарить на сухой сковороде до появления аромата, но это необязательная опция.\n\n4. В остывший растопленный со сливочным маслом шоколад аккуратно добавить оставшийся сахар, затем муку и измельченные орехи и все хорошо перемешать венчиком.\n\n5. Затем влить сахарно-яичную смесь и тщательно смешать с шоколадной массой. Цвет у теста должен получиться равномерным, без разводов.\n\n6. Разогреть духовку до 200 градусов. Дно небольшой глубокой огнеупорной формы выстелить листом бумаги для выпечки или калькой. Перелить тесто в форму. Поставить в духовку и выпекать двадцать пять — тридцать минут до появления сахарной корочки.\n\n7. Готовый пирог вытащить из духовки, дать остыть и нарезать на квадратики острым ножом или ножом для пиццы — так кусочки получатся особенно ровными.\n\n8. Подавать брауни можно просто так, а можно посыпать сверху сахарной пудрой или разложить квадратики по тарелкам и украсить каждую порцию шариком ванильного мороженого.',
    ingredients: [
      {
        id: '1',
        name: 'Темный шоколад',
        amount: '1,5 столовые ложки'
      },
      {
        id: '2',
        name: 'Сливочное масло',
        amount: '90 г'
      },
      {
        id: '3',
        name: 'Коричневый сахар',
        amount: '5 столовых ложек'
      },
      {
        id: '4',
        name: 'Куриное яйцо',
        amount: '2 штуки'
      },
      {
        id: '5',
        name: 'Пшеничная мука',
        amount: '3 столовые ложки'
      },
      {
        id: '6',
        name: 'Грецкие орехи',
        amount: '2,5 столовые ложки'
      }
    ],
  },
  {
    id: 'second',
    name: 'Лазанья классическая с мясом',
    servings: 6,
    cookTime: '40 Минут',
    instructions: '1. В сотейник положить сливочное масло и 2 ложки растительного масла, растопить. Постепенно добавлять муку и размешивать так, чтобы не оставалось комочков.\n\n2. Когда вся мука вмешана, влить все молоко. Убавить огонь и томить до нужной консистенции: не жидкой, но и не слишком густой. Консистенция нежирной сметаны.\n\n3. На сковороде раскалить оливковое масло. Добавить мясной фарш (лучше свинина+телятина).\n\n4. Фарш жарить до полуготовности. Влить в него соус болоньезе, посолить и поперчить по вкусу.\n\n5. Духовку разогреть до 180 градусов. Форму смазать сливочным маслом. На дно вылить немного соуса бешамель, чуть-чуть, только чтобы покрыть дно.\n\n6. Выложить пласты (не вареные). На пласты выложить получившийся фарш (не жалеем!), на фарш — натертый сыр. На сыр — соус бешамель.\n\n7. Соуса нужно выкладывать столько, сколько необходимо, на ваш взгляд, чтобы лазанья получилась сочной. Поверх соуса выложить сухие листы лазаньи. Повторить процедуру.\n\n8. Последний слой листов промазать соусом бешамель и сверху щедро засыпать сыром. Дать постоять минут 7–10. Поставить в духовку. Печь 30 минут.',
    ingredients: [
      {
        id: '1',
        name: 'Мясной фарш',
        amount: '600 г'
      },
      {
        id: '2',
        name: 'Соус болоньезе',
        amount: '600 г'
      },
      {
        id: '3',
        name: 'Сливочное масло',
        amount: '60 г'
      },
      {
        id: '4',
        name: 'Пшеничная мука',
        amount: '2,5 столовые ложки'
      },
      {
        id: '5',
        name: 'Оливковое масло',
        amount: '2 столовые ложки'
      },
      {
        id: '6',
        name: 'Молоко',
        amount: '750 мл'
      },
      {
        id: '7',
        name: 'Готовые сухие листы лазаньи',
        amount: '10 штук'
      },
      {
        id: '8',
        name: 'Твердый сыр',
        amount: '500 г'
      }
    ],
  },
]