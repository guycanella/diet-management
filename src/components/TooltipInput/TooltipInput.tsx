import { PropsWithChildren } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

type TooltipProps = {
  theme: 'light' | 'dark'
}

const TooltipInput = ({ children }: PropsWithChildren<TooltipProps>) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>alguma coisa</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default TooltipInput
