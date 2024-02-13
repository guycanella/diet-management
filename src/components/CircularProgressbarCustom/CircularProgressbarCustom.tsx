import { CircularProgressbar } from 'react-circular-progressbar'

import type { CircularType } from '../TotalSummaryMacros/TotalSummaryMacros'
import { useTheme } from '@/contexts/Theme'

type CircularProgressbarCustomProps = {
  circular: CircularType[] | undefined
}

const CircularProgressbarCustom = ({
  circular,
}: CircularProgressbarCustomProps) => {
  const { theme } = useTheme()

  return (
    <div className="circular-progress grid pp:grid-cols-2 sm:grid-cols-4 pp:gap-2 xl:gap-8 xl:flex-grow">
      {circular?.map((progress) => (
        <div key={progress.id}>
          <CircularProgressbar
            value={progress.percentage}
            text={`${progress.percentage}%`}
            styles={{
              path: {
                strokeLinecap: 'round',
                stroke: `rgba(134, 239, 172, ${progress.percentage})`,
                transition: 'stroke-dashoffset 0.5s ease 0s',
              },
              trail: {
                stroke: 'rgb(229 231 235 / 1)',
              },
              text: {
                fontSize: '16px',
                fill: theme.textColor.replace(/text-\[(.*?)\]/, '$1'),
                textAnchor: 'middle',
                alignmentBaseline: 'middle',
              },
            }}
          />
          <p className="text-center mt-4">{progress.label}</p>
        </div>
      ))}
    </div>
  )
}

export default CircularProgressbarCustom
