import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react'
import type { ReactNode } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const setErrorMsg = (val: string) => `${val} precisa ser maior que 0.`

const formSchema = z.object({
  age: z.coerce.number().int().positive(setErrorMsg('A idade')),
  weight: z.coerce.number().int().positive(setErrorMsg('O peso')),
  height: z.coerce.number().int().positive(setErrorMsg('A altura')),
  gender: z.enum(['male', 'female']),
  activityFactor: z.enum(['1', '2', '3', '4', '5']),
})

export type FormType = z.infer<typeof formSchema>
export type GenderType = Pick<FormType, 'gender'>['gender']
export type ActivityFactorType = Pick<
  FormType,
  'activityFactor'
>['activityFactor']

type UserReducerStates = {
  age: number
  weight: number
  height: number
  gender: GenderType
  activityFactor: ActivityFactorType
  harris: number[]
  mifflin: number[]
}

type MacrosReducerStates = {
  proteinMacro: number
  carbsMacro: number
  fatMacro: number
}

type BMRType = Omit<UserReducerStates, 'harris' | 'mifflin'>
type BMRCalculationType = {
  harris: { values: number[] }
  mifflin: { values: number[] }
}

type PersonalInfoContextData = {
  formSchema: typeof formSchema
  zodResolver: typeof zodResolver
  dietMacros: MacrosReducerStates
  setMacros: React.Dispatch<Partial<MacrosReducerStates>>
  personalInfos: UserReducerStates
  setPersonalInfos: React.Dispatch<Partial<UserReducerStates>>
  isePersonalInfosEmpty: (personInfos: FormType) => boolean
  bmrCalculation: ({
    age,
    gender,
    height,
    weight,
    activityFactor,
  }: BMRType) => BMRCalculationType
}

const PersonalInfoContext = createContext({} as PersonalInfoContextData)

export const PersonalInfoProvider = ({ children }: { children: ReactNode }) => {
  const [{ proteinMacro, carbsMacro, fatMacro }, setMacros] = useReducer(
    (
      prev: MacrosReducerStates,
      next: Partial<MacrosReducerStates>,
    ): MacrosReducerStates => {
      return { ...prev, ...next }
    },
    { proteinMacro: 0, carbsMacro: 0, fatMacro: 0 },
  )

  const [
    { age, weight, height, gender, activityFactor, harris, mifflin },
    setPersonalInfos,
  ] = useReducer(
    (
      prev: UserReducerStates,
      next: Partial<UserReducerStates>,
    ): UserReducerStates => {
      return { ...prev, ...next }
    },
    {
      age: 0,
      weight: 0,
      height: 0,
      gender: 'male',
      activityFactor: '1',
      harris: [0, 0],
      mifflin: [0, 0],
    },
  )

  const isePersonalInfosEmpty = useCallback((personInfos: FormType) => {
    const { age, weight, height } = personInfos

    return age === 0 || weight === 0 || height === 0
  }, [])

  const activityFactorCalculation = (
    bmr: number,
    factor: Pick<FormType, 'activityFactor'>['activityFactor'],
  ) => {
    switch (factor) {
      case '1': {
        return bmr * 1.2
      }
      case '2': {
        return bmr * 1.375
      }
      case '3': {
        return bmr * 1.55
      }
      case '4': {
        return bmr * 1.725
      }
      case '5': {
        return bmr * 1.9
      }
      default: {
        return bmr * 1.2
      }
    }
  }

  const bmrCalculation = useCallback(
    ({
      age,
      gender,
      height,
      weight,
      activityFactor,
    }: BMRType): BMRCalculationType => {
      if (age === 0 || weight === 0 || height === 0) {
        return {
          harris: { values: [0, 0] },
          mifflin: { values: [0, 0] },
        }
      }

      let bmrHarris: number
      let bmrMifflin: number

      if (gender === 'male') {
        bmrHarris = 66.47 + 13.75 * weight + 5.0 * height - 6.75 * age
        bmrMifflin = 9.99 * weight + 6.25 * height - 4.92 * age + 5

        return {
          harris: {
            values: [
              bmrHarris,
              activityFactorCalculation(bmrHarris, activityFactor),
            ],
          },
          mifflin: {
            values: [
              bmrMifflin,
              activityFactorCalculation(bmrMifflin, activityFactor),
            ],
          },
        }
      }

      bmrHarris = 665.09 + 9.65 * weight + 1.84 * height - 4.67 * age
      bmrMifflin = 9.99 * weight + 6.25 * height - 4.92 * age - 161

      return {
        harris: {
          values: [
            bmrHarris,
            activityFactorCalculation(bmrHarris, activityFactor),
          ],
        },
        mifflin: {
          values: [
            bmrMifflin,
            activityFactorCalculation(bmrMifflin, activityFactor),
          ],
        },
      }
    },
    [],
  )

  const dietMacros = useMemo(() => {
    return { proteinMacro, carbsMacro, fatMacro }
  }, [carbsMacro, fatMacro, proteinMacro])

  const personalInfos = useMemo(() => {
    return {
      age,
      weight,
      height,
      gender,
      activityFactor,
      harris,
      mifflin,
    }
  }, [activityFactor, age, gender, harris, height, mifflin, weight])

  const value = useMemo(() => {
    return {
      dietMacros,
      setMacros,
      formSchema,
      zodResolver,
      personalInfos,
      setPersonalInfos,
      isePersonalInfosEmpty,
      bmrCalculation,
    }
  }, [bmrCalculation, dietMacros, isePersonalInfosEmpty, personalInfos])

  return (
    <PersonalInfoContext.Provider value={value}>
      {children}
    </PersonalInfoContext.Provider>
  )
}

export const usePersonalInfo = () => useContext(PersonalInfoContext)
