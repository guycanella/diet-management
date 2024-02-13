import { Utensils } from 'lucide-react'

import { formatString, formatValue } from '@/lib/utils'
import { MealType } from '@/contexts/MealContext'
import useNutrients from '@/hooks/useNutrients'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion'
import { Table, TableBody, TableCell, TableRow } from '../ui/table'
import { useTheme } from '@/contexts/Theme'

type AcoordionCustomProps = {
  listOfAvailableMeals: MealType[]
}

const AccordionCustom = ({ listOfAvailableMeals }: AcoordionCustomProps) => {
  const { allNutrientsPerMeal } = useNutrients(listOfAvailableMeals)
  const { theme } = useTheme()

  return (
    <Accordion type="multiple" className="rounded-md">
      {allNutrientsPerMeal.map((availableMeal, idx) => {
        const { label, category, allNutrients } = availableMeal
        const meal = listOfAvailableMeals.find((meal) => meal.label === label)

        const {
          calories,
          macros: {
            data: { protein, carbs, fats },
          },
        } = allNutrients

        return (
          <AccordionItem key={label} value={label} className="border-none">
            <AccordionTrigger
              className={`${theme.secondary} px-2 gap-4 ${idx === 0 ? 'rounded-t-md' : ''} [&>svg]:${
                theme.type === 'light' ? 'text-black' : 'text-white'
              }`}
            >
              <div className="font-bold flex flex-grow justify-between">
                <p>{formatString(category)}</p>
                <p className="pp:hidden sm:block">
                  {formatValue(calories, 0)} kcal &#8226;{' '}
                  {formatValue(protein, 0)} g proteína &#8226;{' '}
                  {formatValue(carbs, 0)} g carbo &#8226; {formatValue(fats, 0)}{' '}
                  g gordura
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-2">
              <Table>
                <TableBody>
                  {meal?.aliments.map((aliment) => (
                    <TableRow
                      key={aliment.name}
                      className="font-thin xl:text-lg"
                    >
                      <TableCell className="flex gap-2 items-center">
                        <Utensils
                          size={20}
                          className="pp:hidden xl:inline-block"
                        />
                        {aliment.name.split(',')[0]}
                      </TableCell>
                      <TableCell className="text-right">
                        {aliment.portion} g
                      </TableCell>
                      <TableCell className="text-right">
                        {formatValue(aliment.calories, 1)} kcal
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

export default AccordionCustom
