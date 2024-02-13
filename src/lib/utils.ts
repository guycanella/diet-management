import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import {
  type AminoAcidsType,
  MacrosType,
  MineralsType,
  VitaminsType,
} from '@/api/bd'

type ExtendsNutrientsTypes =
  | MacrosType
  | MineralsType
  | VitaminsType
  | AminoAcidsType

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const titleClass =
  'font-bold pp:text-xl pp:text-center mb-4 xl:text-center xl:text-2xl'

export const primaryButtonStyle = 'hover:bg-[#ba9ffb] bg-[#9171f8]'

export function sumTwoObjects<T extends ExtendsNutrientsTypes>(
  obj1: Record<T, number>,
  obj2: Record<T, number>,
) {
  const mergedObj = { ...obj1 }

  for (const key in obj2) {
    if (key in mergedObj) {
      mergedObj[key] += obj2[key]
    } else {
      mergedObj[key] = obj2[key]
    }
  }

  return mergedObj
}

export const formatValue = (value: number, num: number) => value.toFixed(num)

export const formatString = (str: string) => {
  const noHyphens = str.replace(/-/g, ' ')

  return noHyphens[0].toUpperCase() + noHyphens.slice(1)
}

export const isObjectEmpty = (obj: Record<string, unknown>) => {
  return Object.keys(obj).length === 0
}
