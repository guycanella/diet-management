import { createContext, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

const themes = {
  darkTheme: {
    type: 'dark',
    primary: 'bg-[#3F3F3F]',
    secondary: 'bg-[#8B8B8B] border-[#8B8B8B]',
    tertiary: '#9CA3AF',
    textColor: 'text-[#FFFFFF]',
    secondaryText: 'bg-[##7A5AF5]',
    radio: 'text-[#FFFFFF] border-[#FFFFFF]',
  },
  lightTheme: {
    type: 'light',
    primary: 'bg-[#FFFFFF]',
    secondary: 'bg-[#E5E7EB] border-[#E5E7EB]',
    tertiary: '#E5E7EB',
    textColor: 'text-[#000000]',
    secondaryText: 'text-[#000000]',
    radio: 'text-[#000000] border-[#000000]',
  },
}

type ThemeType = typeof themes.darkTheme

type ThemeProviderContextData = {
  theme: ThemeType
  setTheme: (theme: 'light' | 'dark') => void
}

const ThemeContext = createContext({} as ThemeProviderContextData)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<ThemeType>(themes.darkTheme)

  const setTheme = (theme: 'light' | 'dark') => {
    if (theme === 'dark') return setState(themes.darkTheme)

    setState(themes.lightTheme)
  }

  const value = useMemo(() => {
    return {
      theme: state,
      setTheme,
    }
  }, [state])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
