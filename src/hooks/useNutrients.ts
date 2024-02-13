import { FoodsType } from '@/api/bd'
import type { MealType } from '@/contexts/MealContext'
import { sumTwoObjects } from '@/lib/utils'
import { useMemo } from 'react'

export type AllNutrients = {
  calories: number
  macros: FoodsType['macros']
  minerals: FoodsType['minerals']
  vitamins: FoodsType['vitamins']
  aminoAcids: FoodsType['aminoAcids']
}

const essentialNutrients = {
  type: 'mg',
  fiber: 30000,
  aminoAcids: {
    tryptophan: 4,
    threonine: 15,
    isoleucine: 20,
    leucine: 39,
    lysine: 30,
    methionine: 15,
    cystine: 4,
    phenylalanine: 15,
    tyrosine: 15,
    valine: 26,
    histidine: 10,
  },
  vitamins: {
    vitaminA: 0.9,
    vitaminC: 90,
    vitaminD: 0.015,
    vitaminE: 15,
    vitaminK: 0.12,
    riboflavin: 1.3,
    niacin: 16,
    pantothenicAcid: 5,
    vitaminB1: 1.2,
    vitaminB6: 1.3,
    vitaminB12: 0.0024,
    folate: 0.4,
  },
  minerals: {
    iron: 8,
    calcium: 1000,
    sodium: 1500,
    magnesium: 400,
    potassium: 3000,
    manganese: 2.3,
    phosphorus: 700,
    copper: 0.9,
    zinc: 11,
  },
}

const sumAllNutrients = (aliments: FoodsType[]) => {
  return aliments.reduce((acc, curr) => {
    acc = {
      calories: acc.calories ? acc.calories + curr.calories : curr.calories,
      macros: {
        type: curr.macros.type,
        data: acc?.macros?.data
          ? sumTwoObjects(acc.macros.data, curr.macros.data)
          : curr.macros.data,
      },
      minerals: {
        type: curr.minerals.type,
        data: acc?.minerals?.data
          ? sumTwoObjects(acc.minerals.data, curr.minerals.data)
          : curr.minerals.data,
      },
      vitamins: {
        type: curr.vitamins.type,
        data: acc?.vitamins?.data
          ? sumTwoObjects(acc.vitamins.data, curr.vitamins.data)
          : curr.vitamins.data,
      },
      aminoAcids: {
        type: curr.aminoAcids.type,
        data: acc?.aminoAcids?.data
          ? sumTwoObjects(acc.aminoAcids.data, curr.aminoAcids.data)
          : curr.aminoAcids.data,
      },
    }

    return acc
  }, {} as AllNutrients)
}

const useNutrients = (availableMeals: MealType[]) => {
  const allNutrientsPerMeal = useMemo(() => {
    return availableMeals.map((meal) => {
      const { aliments, category, label } = meal

      const allNutrients = sumAllNutrients(aliments)

      return { label, category, allNutrients }
    })
  }, [availableMeals])

  const allNutrients = useMemo(() => {
    const allAliments = availableMeals.reduce((acc, curr) => {
      acc.push(...curr.aliments)

      return acc
    }, [] as FoodsType[])

    return sumAllNutrients(allAliments)
  }, [availableMeals])

  return { allNutrientsPerMeal, allNutrients, essentialNutrients }
}

export default useNutrients
