type FoodType = 'cereal' | 'legumes'

export type MacrosType = 'protein' | 'carbs' | 'fats' | 'cholesterol' | 'fiber'

export type MineralsType =
  | 'iron'
  | 'calcium'
  | 'sodium'
  | 'magnesium'
  | 'potassium'
  | 'manganese'
  | 'phosphorus'
  | 'copper'
  | 'zinc'

export type VitaminsType =
  | 'vitaminA'
  | 'vitaminC'
  | 'vitaminD'
  | 'vitaminE'
  | 'vitaminK'
  | 'riboflavin'
  | 'niacin'
  | 'pantothenicAcid'
  | 'vitaminB1'
  | 'vitaminB6'
  | 'vitaminB12'
  | 'folate'

export type AminoAcidsType =
  | 'tryptophan'
  | 'threonine'
  | 'isoleucine'
  | 'leucine'
  | 'lysine'
  | 'methionine'
  | 'cystine'
  | 'phenylalanine'
  | 'tyrosine'
  | 'valine'
  | 'histidine'

export type Unit = 'g' | 'mg'

type Macros = {
  type: Unit
  data: Record<MacrosType, number>
}

type Minerals = {
  type: Unit
  data: Record<MineralsType, number>
}

type Vitamins = {
  type: Unit
  data: Record<VitaminsType, number>
}

type AminoAcids = {
  type: Unit
  data: Record<AminoAcidsType, number>
}

export type FoodsType = {
  type: FoodType
  foodId: string
  name: string
  portion: number
  calories: number
  macros: Macros
  minerals: Minerals
  vitamins: Vitamins
  aminoAcids: AminoAcids
}

const database = [
  {
    type: 'cereal',
    foodId: 'rice01',
    name: 'Arroz Branco Cozido, Tipo 1',
    portion: 100,
    calories: 128,
    macros: {
      type: 'g',
      data: {
        protein: 2.5,
        carbs: 28.1,
        fats: 0.2,
        cholesterol: 0,
        fiber: 1.6,
      },
    },
    minerals: {
      type: 'mg',
      data: {
        iron: 0.1,
        calcium: 4,
        sodium: 1,
        magnesium: 2,
        potassium: 15,
        manganese: 0.3,
        phosphorus: 18,
        copper: 0.02,
        zinc: 0.5,
      },
    },
    vitamins: {
      type: 'mg',
      data: {
        vitaminA: 0,
        vitaminC: 0,
        vitaminD: 0,
        vitaminE: 0,
        vitaminK: 0,
        riboflavin: 0.016,
        niacin: 0.4,
        pantothenicAcid: 0.411,
        biotin: 0,
        vitaminB1: 0.02,
        vitaminB6: 0.05,
        vitaminB12: 0,
        folate: 0.002,
      },
    },
    aminoAcids: {
      type: 'mg',
      data: {
        tryptophan: 28,
        threonine: 85,
        isoleucine: 103,
        leucine: 197,
        lysine: 86,
        methionine: 56,
        cystine: 49,
        phenylalanine: 127,
        tyrosine: 80,
        valine: 145,
        histidine: 56,
      },
    },
  },
  {
    type: 'legumes',
    foodId: 'bean01',
    name: 'Feijão Carioca Cozido',
    portion: 100,
    calories: 143,
    macros: {
      type: 'g',
      data: {
        protein: 9,
        carbs: 26.2,
        fats: 0.65,
        cholesterol: 0,
        fiber: 9,
      },
    },
    minerals: {
      type: 'mg',
      data: {
        iron: 1.3,
        calcium: 27,
        sodium: 2,
        magnesium: 42,
        potassium: 255,
        manganese: 0.28,
        phosphorus: 87,
        copper: 0.19,
        zinc: 0.7,
      },
    },
    vitamins: {
      type: 'mg',
      data: {
        vitaminA: 0,
        vitaminC: 0.8,
        vitaminD: 0,
        vitaminE: 0.94,
        vitaminK: 0.0035,
        riboflavin: 0.062,
        niacin: 0.318,
        pantothenicAcid: 0.21,
        vitaminB1: 0.193,
        vitaminB6: 0.229,
        vitaminB12: 0,
        folate: 0.172,
      },
    },
    aminoAcids: {
      type: 'mg',
      data: {
        tryptophan: 108,
        threonine: 331,
        isoleucine: 426,
        leucine: 765,
        lysine: 630,
        methionine: 117,
        cystine: 84,
        phenylalanine: 531,
        tyrosine: 213,
        valine: 519,
        histidine: 247,
      },
    },
  },
] as FoodsType[]

export default database
