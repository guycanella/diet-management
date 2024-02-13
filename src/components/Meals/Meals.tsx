import { titleClass } from '@/lib/utils'
import { usePersonalInfo } from '@/contexts/PersonalInfoContext'
import { NUMBER_OF_MEALS } from '@/contexts/MealContext'

import Meal from './Meal'
import TotalSummaryMacros from '../TotalSummaryMacros'

const Meals = () => {
  const {
    personalInfos: { weight },
  } = usePersonalInfo()

  if (!weight) return null

  return (
    <div className="container-meals">
      <h2 className={titleClass}>Refeições</h2>
      <div className="flex pp:flex-col pp:gap-4">
        <div className="meals mb-4 grid sm:grid-cols-2 sm:gap-8  xl:grid-cols-3 xl:gap-4">
          {Array.from({ length: NUMBER_OF_MEALS }, (_, idx) => (
            <Meal key={`meal-${idx}`} mealNumber={idx} />
          ))}
        </div>
        <TotalSummaryMacros />
      </div>
    </div>
  )
}

export default Meals
