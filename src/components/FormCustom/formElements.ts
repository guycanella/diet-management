import type { FormType } from '@/contexts/PersonalInfoContext'

const formInputs = [
  {
    name: 'age',
    label: 'Idade (anos)',
  },
  {
    name: 'weight',
    label: 'Peso (kg)',
  },
  {
    name: 'height',
    label: 'Altura (cm)',
  },
] as { name: keyof FormType; label: string }[]

const formRadioGender = [
  {
    label: 'Masculino',
    value: 'male',
  },
  {
    label: 'Feminino',
    value: 'female',
  },
] as { label: string; value: FormType['gender'] }[]

const formRadioActivity = [
  {
    label: 'Sedentário (pouco ou nenhum exercício físico)',
    value: '1',
  },
  {
    label: 'Pouco ativo (exercício físico 1 a 3 dias por semana)',
    value: '2',
  },
  {
    label: 'Moderadamente ativo (exercício físico 3 a 5 dias por semana)',
    value: '3',
  },
  {
    label: 'Muito ativo (exercício físico 6 a 7 dias por semana)',
    value: '4',
  },
  {
    label: 'Extremamente ativo (exercício físico 2x por dia)',
    value: '5',
  },
] as { label: string; value: FormType['activityFactor'] }[]

export const elements = {
  inputs: formInputs,
  radioGender: formRadioGender,
  radioActivity: formRadioActivity,
}
