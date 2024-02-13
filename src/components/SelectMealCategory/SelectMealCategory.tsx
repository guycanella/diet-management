import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

import type { MealCategoryType } from '@/contexts/MealContext'
import { useMeal } from '@/contexts/MealContext'

type SelectMealCategoryProps = {
  mealNumber: string
}

const mealCategory = [
  {
    label: 'Café da Manhã',
    value: 'cafe-da-manha',
  },
  {
    label: 'Almoço',
    value: 'almoco',
  },
  {
    label: 'Jantar',
    value: 'jantar',
  },
  {
    label: 'Ceia',
    value: 'ceia',
  },
  {
    label: 'Lanche',
    value: 'lanche',
  },
] as MealCategoryType[]

const SelectMealCategory = ({ mealNumber }: SelectMealCategoryProps) => {
  const { updateCategory } = useMeal()

  const onChangeCategory = (category: string, meal: string) => {
    updateCategory(category, meal)
  }

  return (
    <Select
      onValueChange={(category) => onChangeCategory(category, mealNumber)}
    >
      <SelectTrigger id={`${mealNumber}_category`}>
        <SelectValue placeholder="Categoria" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {mealCategory.map((meal) => (
            <SelectItem key={meal.value} value={meal.value}>
              {meal.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SelectMealCategory
