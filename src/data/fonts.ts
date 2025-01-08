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
    name: 'Inter',
    family: 'Inter',
    path: '/fonts/Inter',
    weights: [
      { value: 100, name: 'Thin', file: 'Inter-Thin.ttf' },
      { value: 200, name: 'Extra Light', file: 'Inter-ExtraLight.ttf' },
      { value: 300, name: 'Light', file: 'Inter-Light.ttf' },
      { value: 400, name: 'Regular', file: 'Inter-Regular.ttf' },
      { value: 500, name: 'Medium', file: 'Inter-Medium.ttf' },
      { value: 600, name: 'Semi Bold', file: 'Inter-SemiBold.ttf' },
      { value: 700, name: 'Bold', file: 'Inter-Bold.ttf' },
      { value: 800, name: 'Extra Bold', file: 'Inter-ExtraBold.ttf' },
      { value: 900, name: 'Black', file: 'Inter-Black.ttf' }
    ]
  },
  {
    name: 'Quicksand',
    family: 'Quicksand',
    path: '/fonts/Quicksand',
    weights: [
      { value: 400, name: 'Regular', file: 'Quicksand-regular.ttf' },
      { value: 500, name: 'Medium', file: 'Quicksand-medium.ttf' },
      { value: 600, name: 'Semi Bold', file: 'Quicksand-semibold.ttf' },
      { value: 700, name: 'Bold', file: 'Quicksand-bold.ttf' }
    ]
  },
  {
    name: 'Roboto',
    family: 'Roboto',
    path: '/fonts/Roboto',
    weights: [
      { value: 100, name: 'Thin', file: 'Roboto-Thin.ttf' },
      { value: 300, name: 'Light', file: 'Roboto-Light.ttf' },
      { value: 400, name: 'Regular', file: 'Roboto-Regular.ttf' },
      { value: 500, name: 'Medium', file: 'Roboto-Medium.ttf' },
      { value: 700, name: 'Bold', file: 'Roboto-Bold.ttf' },
      { value: 900, name: 'Black', file: 'Roboto-Black.ttf' }
    ]
  }
];
