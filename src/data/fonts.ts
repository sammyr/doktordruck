export interface Font {
  name: string;
  family: string;
  url?: string;
  weights: {
    value: number;
    name: string;
  }[];
}

export const fonts: Font[] = [
  {
    name: 'Inter',
    family: 'Inter',
    url: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap',
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
    name: 'Garamond',
    family: 'EB Garamond',
    url: 'https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700;800&display=swap',
    weights: [
      { value: 400, name: 'Regular' },
      { value: 500, name: 'Medium' },
      { value: 600, name: 'Semi Bold' },
      { value: 700, name: 'Bold' },
      { value: 800, name: 'Extra Bold' }
    ]
  },
  {
    name: 'Oswald',
    family: 'Oswald',
    url: 'https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&display=swap',
    weights: [
      { value: 200, name: 'Extra Light' },
      { value: 300, name: 'Light' },
      { value: 400, name: 'Regular' },
      { value: 500, name: 'Medium' },
      { value: 600, name: 'Semi Bold' },
      { value: 700, name: 'Bold' }
    ]
  },
  {
    name: 'Merriweather',
    family: 'Merriweather',
    url: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700;900&display=swap',
    weights: [
      { value: 300, name: 'Light' },
      { value: 400, name: 'Regular' },
      { value: 700, name: 'Bold' },
      { value: 900, name: 'Black' }
    ]
  },
  {
    name: 'Playfair Display',
    family: 'Playfair Display',
    url: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap',
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
    name: 'Quicksand',
    family: 'Quicksand',
    url: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap',
    weights: [
      { value: 300, name: 'Light' },
      { value: 400, name: 'Regular' },
      { value: 500, name: 'Medium' },
      { value: 600, name: 'Semi Bold' },
      { value: 700, name: 'Bold' }
    ]
  },
  {
    name: 'Work Sans',
    family: 'Work Sans',
    url: 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap',
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
    url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap',
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
    name: 'Lato',
    family: 'Lato',
    url: 'https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap',
    weights: [
      { value: 100, name: 'Thin' },
      { value: 300, name: 'Light' },
      { value: 400, name: 'Regular' },
      { value: 700, name: 'Bold' },
      { value: 900, name: 'Black' }
    ]
  },
  {
    name: 'Open Sans',
    family: 'Open Sans',
    url: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap',
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
