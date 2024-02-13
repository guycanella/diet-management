import { useMemo } from 'react'

import { formatValue, titleClass } from '@/lib/utils'

import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Table, TableBody, TableCell, TableRow } from '../ui/table'
import { usePersonalInfo } from '@/contexts/PersonalInfoContext'

type MacroNutrientsType = {
  label1: string
  label2: string
  id: 'protein' | 'carbs' | 'fat'
  state: number
  setState: React.Dispatch<React.SetStateAction<unknown>>
}

type MacroNutrientsProps = {
  className?: string
}

const MacroNutrients = ({ className = '' }: MacroNutrientsProps) => {
  const {
    personalInfos: { weight },
    dietMacros,
    setMacros,
  } = usePersonalInfo()

  const { proteinMacro, carbsMacro, fatMacro } = dietMacros

  const macroNutrients = useMemo(() => {
    return [
      {
        label1: 'Proteína (g/kg)',
        label2: 'Quantidade de proteína diária',
        id: 'protein',
        state: proteinMacro,
        setState: setMacros,
      },
      {
        label1: 'Carboidrato (g/kg)',
        label2: 'Quantidade de carbo diário',
        id: 'carbs',
        state: carbsMacro,
        setState: setMacros,
      },
      {
        label1: 'Gordura (g/kg)',
        label2: 'Quantidade de gordura diária',
        id: 'fat',
        state: fatMacro,
        setState: setMacros,
      },
    ]
  }, [carbsMacro, fatMacro, proteinMacro, setMacros]) as MacroNutrientsType[]

  const onChangeMacro = (
    event: React.FocusEvent<HTMLInputElement, Element>,
    id: 'protein' | 'carbs' | 'fat',
    setState: React.Dispatch<Partial<typeof dietMacros>>,
  ) => {
    if (id === 'protein') {
      return setState({ proteinMacro: weight * event.target.valueAsNumber })
    }

    if (id === 'carbs') {
      return setState({ carbsMacro: weight * event.target.valueAsNumber })
    }

    setState({ fatMacro: weight * event.target.valueAsNumber })
  }

  return (
    <div className={`container-macronutrients ${className}`}>
      <div className="macronutrients-content">
        <h2 className={titleClass}>Macronutrientes</h2>
        <div className="macro-inputs pp:mb-4">
          {macroNutrients.map((item) => (
            <div key={item.label1}>
              <Label htmlFor={item.id} className="xl:text-lg">
                {item.label1}
              </Label>
              <Input
                type="number"
                min={0}
                id={item.id}
                defaultValue={0}
                className="mb-2"
                onBlur={(event) => onChangeMacro(event, item.id, item.setState)}
              />
            </div>
          ))}
        </div>
        <div>
          <div>
            <Table>
              <TableBody>
                {macroNutrients.map((item) => (
                  <TableRow key={item.label2}>
                    <TableCell className="font-bold xl:text-sm">
                      {item.label2}
                    </TableCell>
                    <TableCell>{formatValue(item.state, 0)} g</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MacroNutrients
