export interface Font {
  name: string;
  family: string;
  weights: {
    value: number;
    name: string;
  }[];
}

export const fonts: Font[] = [
  {
    name: 'Inter',
    family: 'Inter',
    weights: [
      { value: 100, name: 'Thin' },
      { value: 200, name: 'Extra Light' },
      { value: 300, name: 'Light' },
      { value: 400, name: 'Regular' },
      { value: 500, name: 'Medium' },
      { value: 600, name: 'Semi Bold' },
      { value: 700, name: 'Bold' },
      { value: 800, name: 'Extra Bold' },
      { value: 900, name: 'Black' }
    ]
  },
  {
    name: 'Roboto',
    family: 'Roboto',
    weights: [
      { value: 100, name: 'Thin' },
      { value: 300, name: 'Light' },
      { value: 400, name: 'Regular' },
      { value: 500, name: 'Medium' },
      { value: 700, name: 'Bold' },
      { value: 900, name: 'Black' }
    ]
  },
  {
    name: 'Playfair Display',
    family: 'Playfair Display',
    weights: [
      { value: 400, name: 'Regular' },
      { value: 500, name: 'Medium' },
      { value: 600, name: 'Semi Bold' },
      { value: 700, name: 'Bold' },
      { value: 800, name: 'Extra Bold' },
      { value: 900, name: 'Black' }
    ]
  },
  {
    name: 'Montserrat',
    family: 'Montserrat',
    weights: [
      { value: 100, name: 'Thin' },
      { value: 200, name: 'Extra Light' },
      { value: 300, name: 'Light' },
      { value: 400, name: 'Regular' },
      { value: 500, name: 'Medium' },
      { value: 600, name: 'Semi Bold' },
      { value: 700, name: 'Bold' },
      { value: 800, name: 'Extra Bold' },
      { value: 900, name: 'Black' }
    ]
  },
  {
    name: 'Open Sans',
    family: 'Open Sans',
    weights: [
      { value: 300, name: 'Light' },
      { value: 400, name: 'Regular' },
      { value: 500, name: 'Medium' },
      { value: 600, name: 'Semi Bold' },
      { value: 700, name: 'Bold' },
      { value: 800, name: 'Extra Bold' }
    ]
  }
];
