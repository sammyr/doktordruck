type TextAlign = 'left' | 'right' | 'center';

export interface TextBlock {
  id: string
  text: string
  x: number
  y: number
  color: string
  fontFamily: string
  fontSize: number
  fontWeight: string | number
  fontStyle: string
  width: number
  height: number
  zIndex: number
  textAlign: TextAlign
  lineHeight: number
  letterSpacing: number
  multiline: boolean
  selected: boolean
}
