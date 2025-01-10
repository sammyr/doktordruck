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
  },
  {
    name: 'Poppins',
    family: 'Poppins',
    path: '/fonts/Poppins',
    weights: [
      { value: 100, name: 'Thin', file: 'Poppins-Thin.ttf' },
      { value: 200, name: 'Extra Light', file: 'Poppins-ExtraLight.ttf' },
      { value: 300, name: 'Light', file: 'Poppins-Light.ttf' },
      { value: 400, name: 'Regular', file: 'Poppins-Regular.ttf' },
      { value: 500, name: 'Medium', file: 'Poppins-Medium.ttf' },
      { value: 600, name: 'Semi Bold', file: 'Poppins-SemiBold.ttf' },
      { value: 700, name: 'Bold', file: 'Poppins-Bold.ttf' },
      { value: 800, name: 'Extra Bold', file: 'Poppins-ExtraBold.ttf' },
      { value: 900, name: 'Black', file: 'Poppins-Black.ttf' }
    ]
  },
  {
    name: 'Montserrat',
    family: 'Montserrat',
    path: '/fonts/Montserrat',
    weights: [
      { value: 100, name: 'Thin', file: 'Montserrat-Thin.ttf' },
      { value: 200, name: 'Extra Light', file: 'Montserrat-ExtraLight.ttf' },
      { value: 300, name: 'Light', file: 'Montserrat-Light.ttf' },
      { value: 400, name: 'Regular', file: 'Montserrat-Regular.ttf' },
      { value: 500, name: 'Medium', file: 'Montserrat-Medium.ttf' },
      { value: 600, name: 'Semi Bold', file: 'Montserrat-SemiBold.ttf' },
      { value: 700, name: 'Bold', file: 'Montserrat-Bold.ttf' },
      { value: 800, name: 'Extra Bold', file: 'Montserrat-ExtraBold.ttf' },
      { value: 900, name: 'Black', file: 'Montserrat-Black.ttf' }
    ]
  },
  {
    name: 'Open Sans',
    family: 'Open Sans',
    path: '/fonts/OpenSans',
    weights: [
      { value: 300, name: 'Light', file: 'OpenSans-Light.ttf' },
      { value: 400, name: 'Regular', file: 'OpenSans-Regular.ttf' },
      { value: 500, name: 'Medium', file: 'OpenSans-Medium.ttf' },
      { value: 600, name: 'Semi Bold', file: 'OpenSans-SemiBold.ttf' },
      { value: 700, name: 'Bold', file: 'OpenSans-Bold.ttf' },
      { value: 800, name: 'Extra Bold', file: 'OpenSans-ExtraBold.ttf' }
    ]
  }
];
