import { formatValue } from '@/lib/utils'

import type { SummaryType } from '../TotalSummaryMacros/TotalSummaryMacros'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'

type TotalMacrosProps = {
  summary: SummaryType
  calories: number
  weight: number
}

const TotalMacros = ({ summary, calories, weight }: TotalMacrosProps) => {
  return (
    <div className="xl:w-1/2">
      <Table>
        <TableHeader>
          <TableRow>
            {summary.head.map((head) => (
              <TableHead
                key={head}
                className={head === 'OFF' ? 'text-left' : 'text-right'}
              >
                {head}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {summary.rows.map((row) => {
            const specificCalories = row.macroValue * row.factor
            const percentage = (specificCalories / calories) * 100

            return (
              <TableRow key={row.label}>
                <TableCell className="text-left">{row.label}</TableCell>
                <TableCell className="text-right">
                  {formatValue(row.macroValue, 1)}
                </TableCell>
                <TableCell className="text-right">
                  {formatValue(percentage, 0)}
                </TableCell>
                <TableCell className="text-right">
                  {formatValue(specificCalories, 0)}
                </TableCell>
                <TableCell className="text-right">
                  {formatValue(weight ? row.macroValue / weight : weight, 1)}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>TOTAL</TableCell>
            <TableCell colSpan={2} className="text-right">
              {formatValue(calories, 0)} kcal
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}

export default TotalMacros
