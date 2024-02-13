import { useState } from 'react'

import { primaryButtonStyle } from '@/lib/utils'
import { useMeal } from '@/contexts/MealContext'
import type { CategoryType, MealLabelType } from '@/contexts/MealContext'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import SelectMealCategory from '../SelectMealCategory'

type MealProps = {
  mealNumber: number
}

const Meal = ({ mealNumber }: MealProps) => {
  const { updateMeal } = useMeal()
  const [newline, setNewline] = useState(1)

  const tableHeadStyle = 'text-right text-[#7a5af5]'

  const onChange = (mealId: string) => {
    const rows = Array.from(document.querySelectorAll(`.${mealId}`))

    const aliments = rows.map((aliment) => {
      const alimentName = (
        aliment.querySelector('input[class*="aliment"]') as HTMLInputElement
      ).value.trim()
      const portion = (
        aliment.querySelector('input[class*="portion"]') as HTMLInputElement
      ).value

      return { alimentName, portion }
    })

    const category = document.getElementById(`${mealId}_category`)

    updateMeal(
      aliments,
      mealId as MealLabelType,
      (category?.textContent as CategoryType) ?? 'categoria',
    )
  }

  return (
    <div className="meal">
      <Table>
        <TableCaption className="caption-top text-[#7a5af5] text-lg">
          <div className="flex gap-6">
            <span className="">Refeição {mealNumber + 1}</span>
            <span className="grow">
              <SelectMealCategory mealNumber={`meal-${mealNumber + 1}`} />
            </span>
          </div>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-[#7a5af5] w-[70%]">Alimento</TableHead>
            <TableHead className={tableHeadStyle}>Porção (g)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: newline }, (_, idx) => {
            const alimentId = `meal-${mealNumber + 1}`

            return (
              <TableRow
                key={`row-${idx}`}
                className={`meal-${mealNumber + 1} row-${idx + 1}`}
              >
                <TableCell>
                  <Input className="aliment" type="text" />
                </TableCell>
                <TableCell>
                  <Input
                    className="portion"
                    type="number"
                    min={0}
                    id={`meal-${mealNumber + 1}_row-${idx + 1}_portion`}
                    onBlur={() => onChange(alimentId)}
                  />
                </TableCell>
              </TableRow>
            )
          })}
          <TableRow>
            <TableCell>
              <Button
                className={`mt-2 ${primaryButtonStyle}`}
                onClick={() => setNewline((prevState) => prevState + 1)}
              >
                Adicionar
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default Meal
