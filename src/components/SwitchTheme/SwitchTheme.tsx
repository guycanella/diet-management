import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

import { Switch } from '../ui/switch'
import { useTheme } from '@/contexts/Theme'

const SwitchTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const { setTheme } = useTheme()

  const handleSetTheme = () => {
    setIsDarkMode((prevState) => !prevState)
  }

  useEffect(() => {
    if (isDarkMode) return setTheme('dark')

    setTheme('light')
  }, [isDarkMode, setTheme])

  return (
    <div className="switch-theme flex flex-col items-center gap-2">
      {isDarkMode ? <Moon color="#FFFFFF" /> : <Sun color="#000000" />}

      <Switch checked={isDarkMode} onClick={handleSetTheme} />
    </div>
  )
}

export default SwitchTheme
