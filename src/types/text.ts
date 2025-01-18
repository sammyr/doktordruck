type TextAlign = 'left' | 'right' | 'center';

export interface TextBlock {
  id: string
  text: string
  originalText?: string
  x: number
  y: number
  width: number
  height: number
  fontSize?: number
  fontFamily?: string
  fontStyle?: string
  fontWeight?: number | string
  textAlign?: 'left' | 'center' | 'right'
  visible?: boolean
  color?: string
  letterSpacing?: number
  lineHeight?: number
  multiline?: boolean
  selected?: boolean
  zIndex?: number
  isUpperCase?: boolean
}
