import { ReactNode } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

import { PersonalInfoProvider } from '../contexts/PersonalInfoContext'
import { MealProvider } from '../contexts/MealContext'
import { ThemeProvider } from '../contexts/Theme'

const queryClient = new QueryClient()

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <PersonalInfoProvider>
          <MealProvider>{children}</MealProvider>
        </PersonalInfoProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default Providers
