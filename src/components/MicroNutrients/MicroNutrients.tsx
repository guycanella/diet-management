import { useMemo } from 'react'

import { formatString, formatValue } from '@/lib/utils'
import useNutrients from '@/hooks/useNutrients'
import { useMeal } from '@/contexts/MealContext'
import { usePersonalInfo } from '@/contexts/PersonalInfoContext'

import { Progress } from '../ui/progress'
import { Table, TableBody, TableCell, TableRow } from '../ui/table'
import { useTheme } from '@/contexts/Theme'

type MicroNutrientsProps = {
  title: string
  type: 'aminoAcids' | 'vitamins' | 'minerals'
}

const MicroNutrients = ({ type, title }: MicroNutrientsProps) => {
  const { theme } = useTheme()
  const {
    personalInfos: { weight },
  } = usePersonalInfo()
  const { meals } = useMeal()
  const { essentialNutrients, allNutrients } = useNutrients(meals)
  const nutrients = essentialNutrients[type]

  const keys = useMemo(() => {
    return Object.keys(nutrients)
  }, [nutrients])

  if (Object.keys(allNutrients).length === 0) return null

  const data = allNutrients[type].data

  return (
    <div className={`rounded-md text-black`}>
      <div className={`bg-[${theme.tertiary}] p-2 rounded-t-md font-light`}>
        {title}
      </div>
      <div>
        <Table>
          <TableBody className="bg-gray-100">
            {keys.map((key, idx) => {
              const nutrientDiet = data[keys[idx] as keyof typeof data] / 1000

              // IF RENDERING AMINO ACIDS, SHOULD MULTIPLY THEM BY THE WEIGHT.
              // IF RENDERING MINERALS OR VITAMINS, DOESN'T MULTIPLY 'CAUSE A DAILY QUANTITY
              const nutrientDaily =
                type === 'aminoAcids'
                  ? (nutrients[key as keyof typeof nutrients] * weight) / 1000
                  : nutrients[key as keyof typeof nutrients] / 1000

              const percentage = (nutrientDiet / nutrientDaily) * 100

              return (
                <TableRow key={key}>
                  <TableCell className="text-left font-thin">
                    {formatString(key)}
                  </TableCell>
                  <TableCell className="font-thin">
                    {formatValue(
                      data[keys[idx] as keyof typeof data] / 1000,
                      1,
                    )}{' '}
                    g
                  </TableCell>
                  <TableCell className="w-[80px]">
                    <Progress
                      value={percentage}
                      className="bg-gray-200 [&>div]:bg-green-300"
                    />
                  </TableCell>
                  <TableCell className="font-thin">
                    {formatValue(percentage, 0)}%
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default MicroNutrients
