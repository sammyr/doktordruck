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
  selected?: boolean
  width?: number          // Breite der Textbox in Prozent
  height?: number         // Höhe der Textbox in Prozent
  zIndex: number
  textAlign?: 'left' | 'center' | 'right'  // Textausrichtung
  lineHeight?: number     // Zeilenhöhe als Faktor (optional)
  letterSpacing?: number  // Buchstabenabstand in Pixel (optional)
  multiline?: boolean     // Ob der Text mehrzeilig ist (optional)
}
