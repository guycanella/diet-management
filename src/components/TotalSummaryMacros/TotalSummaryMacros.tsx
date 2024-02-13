import { useMeal } from '@/contexts/MealContext'
import { usePersonalInfo } from '@/contexts/PersonalInfoContext'
import useNutrients from '@/hooks/useNutrients'

import { useMemo } from 'react'
import TotalMacros from '../TotalMacros'
import CircularProgressbarCustom from '../CircularProgressbarCustom'
import { formatValue } from '@/lib/utils'

export type SummaryType = {
  head: string[]
  rows: {
    label: 'Proteínas' | 'Carboidratos' | 'Gorduras'
    factor: number
    macroValue: number
  }[]
}

export type CircularType = {
  label: JSX.Element
  id: string
  percentage: number
}

const isAllNutrientsEmpty = (arr: Record<string, unknown>) =>
  Object.keys(arr).length === 0

const calculatePercentage = (dietMicronutrient: number, totalPerDay: number) =>
  totalPerDay ? (dietMicronutrient / totalPerDay) * 100 : 0

const TotalSummaryMacros = () => {
  const { meals } = useMeal()
  const { allNutrients } = useNutrients(meals)
  const {
    personalInfos: { weight, mifflin },
    dietMacros: { proteinMacro, carbsMacro, fatMacro },
  } = usePersonalInfo()

  const circular = useMemo(() => {
    if (isAllNutrientsEmpty(allNutrients)) return undefined

    const proteinPercentage = calculatePercentage(
      allNutrients.macros.data.protein,
      proteinMacro,
    )
    const carbsPercentage = calculatePercentage(
      allNutrients.macros.data.carbs,
      carbsMacro,
    )
    const fatPercentage = calculatePercentage(
      allNutrients.macros.data.fats,
      fatMacro,
    )
    const kcalPercentage = calculatePercentage(
      allNutrients.calories,
      mifflin[1],
    )

    return [
      {
        label: (
          <span>
            Proteínas <br />
            {proteinMacro ? (
              <>
                {formatValue(allNutrients.macros.data.protein, 0)} /
                {proteinMacro} g
              </>
            ) : (
              0
            )}
          </span>
        ),
        id: 'protein',
        percentage: +proteinPercentage.toFixed(0),
      },
      {
        label: (
          <span>
            Carboidratos <br />
            {carbsMacro ? (
              <>
                {formatValue(allNutrients.macros.data.carbs, 0)} /{carbsMacro} g
              </>
            ) : (
              0
            )}
          </span>
        ),
        id: 'carbs',
        percentage: +carbsPercentage.toFixed(0),
      },
      {
        label: (
          <span>
            Gorduras <br />
            {fatMacro ? (
              <>
                {formatValue(allNutrients.macros.data.fats, 0)} /{fatMacro} g
              </>
            ) : (
              0
            )}
          </span>
        ),
        id: 'fats',
        percentage: +fatPercentage.toFixed(0),
      },
      {
        label: (
          <span>
            Kcal (Mifflin)
            <br />
            {mifflin[1] ? (
              <>
                {formatValue(allNutrients.calories, 0)} /{' '}
                {mifflin[1].toFixed(0)} kcal
              </>
            ) : (
              0
            )}
          </span>
        ),
        id: 'kcal',
        percentage: +kcalPercentage.toFixed(0),
      },
    ]
  }, [allNutrients, carbsMacro, fatMacro, mifflin, proteinMacro])

  if (Object.keys(allNutrients).length === 0) return null

  const {
    calories,
    macros: { data },
  } = allNutrients

  const summary = {
    head: ['OFF', 'g', '%', 'Kcal', 'g/kg'],
    rows: [
      {
        label: 'Proteínas',
        factor: 4,
        macroValue: data.protein,
      },
      {
        label: 'Carboidratos',
        factor: 4,
        macroValue: data.carbs,
      },
      {
        label: 'Gorduras',
        factor: 9,
        macroValue: data.fats,
      },
    ],
  } as SummaryType

  return (
    <div
      id="total-summary-macros"
      className="total-summary-macros pp:flex pp:flex-col pp:gap-4"
    >
      <h2 className="text-[#7a5af5] text-lg text-center">Resumo de Macros</h2>
      <div className="flex pp:flex-col pp:gap-4 xl:flex-row xl:gap-8">
        <CircularProgressbarCustom circular={circular} />
        <TotalMacros calories={calories} weight={weight} summary={summary} />
      </div>
    </div>
  )
}

export default TotalSummaryMacros
