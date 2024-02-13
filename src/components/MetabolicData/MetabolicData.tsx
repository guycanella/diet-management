import { useMemo } from 'react'

import { usePersonalInfo } from '@/contexts/PersonalInfoContext'
import { titleClass } from '@/lib/utils'

type MetabolicDataProps = {
  className?: string
}

const MetabolicData = ({ className = '' }: MetabolicDataProps) => {
  const {
    personalInfos: { harris, mifflin },
  } = usePersonalInfo()

  const methods = useMemo(() => {
    return [
      {
        title: 'Método de Harris-Benedict',
        bmr: harris,
      },
      {
        title: 'Método de Mifflin-St. Jeor',
        bmr: mifflin,
      },
    ]
  }, [harris, mifflin])

  return (
    <div className={`metabolic-data ${className}`}>
      <div className="metabolic-data-content">
        <h2 className={titleClass}>Taxa Metabólica Basal</h2>
        <div className="bmr-methods pp:flex pp:flex-col pp:gap-10">
          {methods.map((method) => {
            return (
              <div key={method.title}>
                <h3 className="text-[#7a5af5] mb-2">{method.title}</h3>
                <p className="pp:flex pp:flex-col">
                  <span className="flex">
                    <span className="font-bold w-24">TMB:</span>{' '}
                    <span className="text-green-400">
                      {method.bmr[0].toFixed(2)}
                    </span>
                  </span>
                  <span className="flex">
                    <span className="font-bold w-24">TMB + FA:</span>{' '}
                    <span className="text-green-400">
                      {method.bmr[1].toFixed(2)}
                    </span>
                  </span>
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MetabolicData
