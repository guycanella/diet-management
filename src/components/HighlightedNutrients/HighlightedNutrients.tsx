import { titleClass } from '@/lib/utils'

import AccordionCustom from '../AccordionCustom'
import { useMeal } from '@/contexts/MealContext'
import { useMemo } from 'react'

const HighlightedNutrients = () => {
  const { meals } = useMeal()

  const listOfAvailableMeals = useMemo(() => {
    return meals.filter((item) => item.aliments.length !== 0)
  }, [meals])

  if (listOfAvailableMeals.length === 0) return null

  return (
    <div className="highlighted-nutrients">
      <h2 className={titleClass}>Lista das Refeições Diárias</h2>
      <div className="pp:flex pp:flex-col pp:gap-4">
        <AccordionCustom listOfAvailableMeals={listOfAvailableMeals} />
      </div>
    </div>
  )
}

export default HighlightedNutrients
