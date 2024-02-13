import { useForm } from 'react-hook-form'

import { usePersonalInfo } from '@/contexts/PersonalInfoContext'
import type {
  ActivityFactorType,
  FormType,
  GenderType,
} from '@/contexts/PersonalInfoContext'

import { useTheme } from '@/contexts/Theme'
import { elements } from './formElements'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '../ui/form'

type FormCustomProps = {
  className?: string
}

const FormCustom = ({ className }: FormCustomProps) => {
  const formItemStyle = 'flex gap-2 items-baseline'

  const { theme } = useTheme()
  const { formSchema, zodResolver, setPersonalInfos, bmrCalculation } =
    usePersonalInfo()

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 0,
      height: 0,
      weight: 0,
      gender: 'male',
      activityFactor: '1',
    },
  })

  const onChangeInputs = (formValues: FormType) => {
    const { age, weight, height, gender, activityFactor } = formValues

    const { harris, mifflin } = bmrCalculation({
      age: +age,
      weight: +weight,
      height: +height,
      gender,
      activityFactor,
    })

    setPersonalInfos({
      age,
      height,
      weight,
      gender,
      activityFactor,
      harris: harris.values,
      mifflin: mifflin.values,
    })
  }

  const onChangeRadioButtons = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    name: string,
    formValues: FormType,
  ) => {
    const { age, weight, height, gender, activityFactor } = formValues

    if (name === 'gender') {
      const { harris, mifflin } = bmrCalculation({
        age: +age,
        weight: +weight,
        height: +height,
        gender: (event.target as HTMLButtonElement).value as GenderType,
        activityFactor,
      })

      return setPersonalInfos({
        ...formValues,
        harris: harris.values,
        mifflin: mifflin.values,
        gender: (event.target as HTMLButtonElement).value as GenderType,
        activityFactor,
      })
    }

    const { harris, mifflin } = bmrCalculation({
      age: +age,
      weight: +weight,
      height: +height,
      gender,
      activityFactor: (event.target as HTMLButtonElement)
        .value as ActivityFactorType,
    })

    setPersonalInfos({
      ...formValues,
      harris: harris.values,
      mifflin: mifflin.values,
      gender,
      activityFactor: (event.target as HTMLButtonElement)
        .value as ActivityFactorType,
    })
  }

  return (
    <Form {...form}>
      <form className={`form flex flex-col gap-4 ${className}`}>
        {elements.inputs.map((formField) => (
          <FormField
            key={formField.name}
            control={form.control}
            name={formField.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="xl:text-lg">{formField.label}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    className={theme.secondary}
                    onBlur={() => onChangeInputs(form.getValues())}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-10"
                >
                  {elements.radioGender.map((radio) => (
                    <FormItem key={radio.label} className={formItemStyle}>
                      <RadioGroupItem
                        className={theme.radio}
                        value={radio.value}
                        onClick={(event) =>
                          onChangeRadioButtons(
                            event,
                            field.name,
                            form.getValues(),
                          )
                        }
                      />
                      <FormLabel>{radio.label}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="activityFactor"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="xl:text-lg">
                Fator de Atividade (FA)
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className=""
                >
                  {elements.radioActivity.map((activity) => (
                    <FormItem key={activity.label} className={formItemStyle}>
                      <RadioGroupItem
                        value={activity.value}
                        className={theme.radio}
                        onClick={(event) =>
                          onChangeRadioButtons(
                            event,
                            field.name,
                            form.getValues(),
                          )
                        }
                      />
                      <FormLabel>{activity.label}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export default FormCustom
