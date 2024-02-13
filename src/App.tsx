import FormCustom from './components/FormCustom'
import HighlightedNutrients from './components/HighlightedNutrients'
import MacroNutrients from './components/MacroNutrients'
import Meals from './components/Meals'
import MetabolicData from './components/MetabolicData'
import SwitchTheme from './components/SwitchTheme'
import MicroNutrients from './components/MicroNutrients'
import { useTheme } from './contexts/Theme'

function App() {
  const { theme } = useTheme()

  return (
    <div
      className={`upper-content ${theme.primary} min-h-screen ${theme.textColor}`}
    >
      <div className="main_container max-w-[1280px] pp:p-4 mx-auto">
        <div className="title-heading pp:flex justify-between">
          <h1 className="font-bold pp:text-lg mb-8 xl:text-5xl">
            Cálculo de Parâmetros da Dieta
          </h1>
          <SwitchTheme />
        </div>
        <div className="container-info pp:flex pp:flex-col pp:gap-8">
          <div className="flex pp:flex-col pp:gap-4 md:flex-row">
            <FormCustom className="md:w-1/2" />
            <div className="xl:flex-1 md:w-1/2 xl:flex xl:gap-8">
              <MetabolicData className="xl:flex xl:flex-1" />
              <MacroNutrients className="xl:flex xl:flex-1" />
            </div>
          </div>
          <Meals />
          <HighlightedNutrients />
          <div className="grid items-start pp:grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            <MicroNutrients title="Aminoácidos" type="aminoAcids" />
            <MicroNutrients title="Minerais" type="minerals" />
            <MicroNutrients title="Vitaminas" type="vitamins" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
