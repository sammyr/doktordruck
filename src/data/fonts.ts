export interface Font {
  name: string;
  family: string;
  path: string;
  weights: {
    value: number;
    name: string;
    file: string;
  }[];
}

export const fonts: Font[] = [
  {
    name: 'CormorantGaramond',
    family: 'CormorantGaramond',
    path: '/fonts/CormorantGaramond',
    weights: [
      { value: 400, name: 'Regular', file: 'regular.ttf' }
    ]
  },
  {
    name: 'Inter',
    family: 'Inter',
    path: '/fonts/Inter',
    weights: [
      { value: 100, name: 'Thin', file: 'thin.ttf' },
      { value: 200, name: 'Extra Light', file: 'extralight.ttf' },
      { value: 300, name: 'Light', file: 'light.ttf' },
      { value: 400, name: 'Regular', file: 'regular.ttf' },
      { value: 500, name: 'Medium', file: 'medium.ttf' },
      { value: 600, name: 'Semi Bold', file: 'semibold.ttf' },
      { value: 700, name: 'Bold', file: 'bold.ttf' },
      { value: 800, name: 'Extra Bold', file: 'extrabold.ttf' },
      { value: 900, name: 'Black', file: 'black.ttf' }
    ]
  },
  {
    name: 'Lato',
    family: 'Lato',
    path: '/fonts/Lato',
    weights: [
      { value: 100, name: 'Thin', file: 'thin.ttf' },
      { value: 200, name: 'Extra Light', file: 'extralight.ttf' },
      { value: 300, name: 'Light', file: 'light.ttf' },
      { value: 400, name: 'Regular', file: 'regular.ttf' },
      { value: 500, name: 'Medium', file: 'medium.ttf' },
      { value: 600, name: 'Semi Bold', file: 'semibold.ttf' },
      { value: 700, name: 'Bold', file: 'bold.ttf' },
      { value: 800, name: 'Extra Bold', file: 'extrabold.ttf' },
      { value: 900, name: 'Black', file: 'black.ttf' }
    ]
  },
  {
    name: 'Lora',
    family: 'Lora',
    path: '/fonts/Lora',
    weights: [
      { value: 100, name: 'Thin', file: 'thin.ttf' },
      { value: 400, name: 'Regular', file: 'regular.ttf' },
      { value: 600, name: 'Semi Bold', file: 'semibold.ttf' },
      { value: 700, name: 'Bold', file: 'bold.ttf' }
    ]
  },
  {
    name: 'Merriweather',
    family: 'Merriweather',
    path: '/fonts/Merriweather',
    weights: [
      { value: 100, name: 'Thin', file: 'thin.ttf' },
      { value: 200, name: 'Extra Light', file: 'extralight.ttf' },
      { value: 400, name: 'Regular', file: 'regular.ttf' },
      { value: 600, name: 'Semi Bold', file: 'semibold.ttf' },
      { value: 700, name: 'Bold', file: 'bold.ttf' },
      { value: 800, name: 'Extra Bold', file: 'extrabold.ttf' },
      { value: 900, name: 'Black', file: 'black.ttf' }
    ]
  },
  {
    name: 'Montserrat',
    family: 'Montserrat',
    path: '/fonts/Montserrat',
    weights: [
      { value: 100, name: 'Thin', file: 'thin.ttf' },
      { value: 200, name: 'Extra Light', file: 'extralight.ttf' },
      { value: 300, name: 'Light', file: 'light.ttf' },
      { value: 400, name: 'Regular', file: 'regular.ttf' },
      { value: 500, name: 'Medium', file: 'medium.ttf' },
      { value: 600, name: 'Semi Bold', file: 'semibold.ttf' },
      { value: 700, name: 'Bold', file: 'bold.ttf' },
      { value: 800, name: 'Extra Bold', file: 'extrabold.ttf' },
      { value: 900, name: 'Black', file: 'black.ttf' }
    ]
  },
  {
    name: 'NotoSans',
    family: 'NotoSans',
    path: '/fonts/NotoSans',
    weights: [
      { value: 400, name: 'Regular', file: 'regular.ttf' }
    ]
  },
  {
    name: 'Nunito',
    family: 'Nunito',
    path: '/fonts/Nunito',
    weights: [
      { value: 400, name: 'Regular', file: 'regular.ttf' }
    ]
  },
  {
    name: 'NunitoSans',
    family: 'NunitoSans',
    path: '/fonts/NunitoSans',
    weights: [
      { value: 100, name: 'Thin', file: 'thin.ttf' },
      { value: 200, name: 'Extra Light', file: 'extralight.ttf' },
      { value: 400, name: 'Regular', file: 'regular.ttf' },
      { value: 600, name: 'Semi Bold', file: 'semibold.ttf' },
      { value: 700, name: 'Bold', file: 'bold.ttf' }
    ]
  },
  {
    name: 'OpenSans',
    family: 'OpenSans',
    path: '/fonts/OpenSans',
    weights: [
      { value: 100, name: 'Thin', file: 'thin.ttf' },
      { value: 200, name: 'Extra Light', file: 'extralight.ttf' },
      { value: 300, name: 'Light', file: 'light.ttf' },
      { value: 400, name: 'Regular', file: 'regular.ttf' },
      { value: 500, name: 'Medium', file: 'medium.ttf' },
      { value: 600, name: 'Semi Bold', file: 'semibold.ttf' },
      { value: 700, name: 'Bold', file: 'bold.ttf' },
      { value: 800, name: 'Extra Bold', file: 'extrabold.ttf' },
      { value: 900, name: 'Black', file: 'black.ttf' }
    ]
  },
  {
    name: 'Oswald',
    family: 'Oswald',
    path: '/fonts/Oswald',
    weights: [
      { value: 400, name: 'Regular', file: 'regular.ttf' }
    ]
  },
  {
    name: 'PTSans',
    family: 'PTSans',
    path: '/fonts/PTSans',
    weights: [
      { value: 400, name: 'Regular', file: 'regular.ttf' }
    ]
  },
  {
    name: 'PlayfairDisplay',
    family: 'PlayfairDisplay',
    path: '/fonts/PlayfairDisplay',
    weights: [
      { value: 400, name: 'Regular', file: 'regular.ttf' },
      { value: 600, name: 'Medium', file: 'medium.ttf' }
    ]
  },
  {
    name: 'Quicksand',
    family: 'Quicksand',
    path: '/fonts/Quicksand',
    weights: [
      { value: 400, name: 'Regular', file: 'regular.ttf' },
      { value: 600, name: 'Medium', file: 'medium.ttf' },
      { value: 700, name: 'Bold', file: 'bold.ttf' }
    ]
  },
  {
    name: 'Raleway',
    family: 'Raleway',
    path: '/fonts/Raleway',
    weights: [
      { value: 400, name: 'Regular', file: 'regular.ttf' }
    ]
  },
  {
    name: 'Roboto',
    family: 'Roboto',
    path: '/fonts/Roboto',
    weights: [
      { value: 100, name: 'Thin', file: 'thin.ttf' },
      { value: 200, name: 'Extra Light', file: 'extralight.ttf' },
      { value: 300, name: 'Light', file: 'light.ttf' },
      { value: 400, name: 'Regular', file: 'regular.ttf' },
      { value: 500, name: 'Medium', file: 'medium.ttf' },
      { value: 600, name: 'Semi Bold', file: 'semibold.ttf' },
      { value: 700, name: 'Bold', file: 'bold.ttf' },
      { value: 800, name: 'Extra Bold', file: 'extrabold.ttf' },
      { value: 900, name: 'Black', file: 'black.ttf' }
    ]
  },
  {
    name: 'RobotoCondensed',
    family: 'RobotoCondensed',
    path: '/fonts/RobotoCondensed',
    weights: [
      { value: 100, name: 'Thin', file: 'thin.ttf' },
      { value: 400, name: 'Regular', file: 'regular.ttf' },
      { value: 600, name: 'Medium', file: 'medium.ttf' },
      { value: 700, name: 'Bold', file: 'bold.ttf' }
    ]
  },
  {
    name: 'SourceSansPro',
    family: 'SourceSansPro',
    path: '/fonts/SourceSansPro',
    weights: [
      { value: 400, name: 'Regular', file: 'regular.ttf' }
    ]
  },
  {
    name: 'Spectral',
    family: 'Spectral',
    path: '/fonts/Spectral',
    weights: [
      { value: 100, name: 'Thin', file: 'thin.ttf' }
    ]
  },
  {
    name: 'Ubuntu',
    family: 'Ubuntu',
    path: '/fonts/Ubuntu',
    weights: [
      { value: 400, name: 'Regular', file: 'regular.ttf' }
    ]
  },
  {
    name: 'WorkSans',
    family: 'WorkSans',
    path: '/fonts/WorkSans',
    weights: [
      { value: 400, name: 'Regular', file: 'regular.ttf' }
    ]
  }
];
