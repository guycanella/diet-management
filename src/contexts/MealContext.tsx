import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import type { ReactNode } from 'react'

import database from '@/api/bd'
import type { FoodsType } from '@/api/bd'

export const NUMBER_OF_MEALS = 6

export type CategoryType =
  | 'categoria'
  | 'café da manhã'
  | 'almoço'
  | 'jantar'
  | 'ceia'
  | 'lanche'

type CategoryValue = 'cafe-da-manha' | 'almoco' | 'jantar' | 'ceia' | 'lanche'

export type MealLabelType =
  | 'meal-1'
  | 'meal-2'
  | 'meal-3'
  | 'meal-4'
  | 'meal-5'
  | 'meal-6'

export type MealType = {
  label: MealLabelType
  category: CategoryType
  aliments: FoodsType[]
}

export type MealCategoryType = {
  label: Omit<CategoryType, 'categoria'>
  value: CategoryValue
}

type MealContextData = {
  meals: MealType[]
  getAlimentInDatabase: (name: string) => FoodsType | undefined
  updateCategory: (category: string, mealId: string) => void
  updateMeal: (
    aliments: { alimentName: string; portion: string }[],
    meal: MealLabelType,
    category: CategoryType,
  ) => void
}

const MealContext = createContext({} as MealContextData)

function multiplyObjectByPortion(
  obj: Record<string, number>,
  portion: number,
  defaultPortion: number,
) {
  const multipliedObj = { ...obj } as Record<string, number>
  const keys = Object.keys(obj)
  keys.forEach(
    (key) =>
      (multipliedObj[key] = (multipliedObj[key] * portion) / defaultPortion),
  )

  return multipliedObj
}

export const MealProvider = ({ children }: { children: ReactNode }) => {
  const [meals, setMeals] = useState<MealType[]>([
    { label: 'meal-1', category: 'categoria', aliments: [] },
    { label: 'meal-2', category: 'categoria', aliments: [] },
    { label: 'meal-3', category: 'categoria', aliments: [] },
    { label: 'meal-4', category: 'categoria', aliments: [] },
    { label: 'meal-5', category: 'categoria', aliments: [] },
    { label: 'meal-6', category: 'categoria', aliments: [] },
  ])

  // const getAlimentInDatabase = (name: string) =>
  //   database.find((aliment) => aliment.name.toLowerCase().includes(name))

  const getAlimentInDatabase = (name: string) => {
    const db = database.find((aliment) =>
      aliment.name.toLowerCase().includes(name),
    )

    if (!db) return

    return { ...db }
  }

  const calculateAlimentPerPortion = (
    aliment: FoodsType,
    portion: number,
  ): FoodsType => {
    return {
      ...aliment,
      calories: (aliment.calories * portion) / aliment.portion,
      portion,
      macros: {
        ...aliment.macros,
        data: multiplyObjectByPortion(
          aliment.macros.data,
          portion,
          aliment.portion,
        ),
      },
      aminoAcids: {
        ...aliment.aminoAcids,
        data: multiplyObjectByPortion(
          aliment.aminoAcids.data,
          portion,
          aliment.portion,
        ),
      },
      vitamins: {
        ...aliment.vitamins,
        data: multiplyObjectByPortion(
          aliment.vitamins.data,
          portion,
          aliment.portion,
        ),
      },
      minerals: {
        ...aliment.minerals,
        data: multiplyObjectByPortion(
          aliment.minerals.data,
          portion,
          aliment.portion,
        ),
      },
    }
  }

  const updateCategory = useCallback(
    (category: string, mealId: string) => {
      const oldMeal = meals.find((meal) => meal.label === mealId)

      if (!oldMeal)
        throw new Error('Meal not found. Method "find" returned undefined.')

      oldMeal.category = category as CategoryType

      const newMeals = meals.filter((meal) => meal.label !== mealId)

      newMeals.push(oldMeal)

      return setMeals(newMeals.toSorted((a, b) => (a.label > b.label ? 1 : -1)))
    },
    [meals],
  )

  const updateMeal = useCallback(
    (
      aliments: { alimentName: string; portion: string }[],
      meal: MealLabelType,
      category: CategoryType,
    ) => {
      const alimentsOfMeal = aliments.filter(
        (aliment) => aliment.alimentName !== '' && aliment.portion !== '',
      )

      if (alimentsOfMeal.length === 0) {
        const oldMeal = meals.find((mealx) => mealx.label === meal)

        if (!oldMeal)
          throw new Error('Meal not found. Method "find" returned undefined.')

        oldMeal.aliments = []
        oldMeal.category = category.toLowerCase() as CategoryType

        const newMeals = meals.filter((mealx) => mealx.label !== meal)

        newMeals.push(oldMeal)

        return setMeals(
          newMeals.toSorted((a, b) => (a.label > b.label ? 1 : -1)),
        )
      }

      const summedAliments = alimentsOfMeal.reduce(
        (acc, curr) => {
          const { alimentName, portion } = curr
          acc[alimentName] = (acc[alimentName] || 0) + parseInt(portion)
          return acc
        },
        {} as Record<string, number>,
      )

      const filteredAliments = Object.keys(summedAliments).map(
        (alimentName) => {
          return {
            alimentName,
            portion: summedAliments[alimentName],
          }
        },
      )

      const oldMeal = meals.find((mealx) => mealx.label === meal)

      if (!oldMeal)
        throw new Error('Meal not found. Method "find" returned undefined.')

      const newAliments = filteredAliments.reduce((acc, curr) => {
        const dbAliment = getAlimentInDatabase(curr.alimentName)

        if (dbAliment) {
          const alimentWithCorrectPortion = calculateAlimentPerPortion(
            dbAliment,
            curr.portion,
          )

          acc.push(alimentWithCorrectPortion)
        }

        return acc
      }, [] as FoodsType[])

      oldMeal.aliments = newAliments
      oldMeal.category = category.toLowerCase() as CategoryType

      const newMeals = meals.filter((mealx) => mealx.label !== meal)

      newMeals.push(oldMeal)

      // console.log({ newMeals })

      setMeals(newMeals.toSorted((a, b) => (a.label > b.label ? 1 : -1)))
    },
    [meals],
  )

  const value = useMemo(() => {
    return {
      meals,
      getAlimentInDatabase,
      updateCategory,
      updateMeal,
    }
  }, [meals, updateCategory, updateMeal])

  return <MealContext.Provider value={value}>{children}</MealContext.Provider>
}

export const useMeal = () => useContext(MealContext)
