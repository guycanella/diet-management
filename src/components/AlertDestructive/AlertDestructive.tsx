import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { Alert, AlertDescription } from '../ui/alert'
import { PropsWithChildren } from 'react'

type AlertDestructiveProps = {
  variant?: 'default' | 'destructive'
}

const AlertDestructive = ({
  children,
  variant = 'default',
}: PropsWithChildren<AlertDestructiveProps>) => {
  return (
    <Alert variant={variant}>
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  )
}

export default AlertDestructive
