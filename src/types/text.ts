export interface TextBlock {
  id: string
  text: string
  x: number
  y: number
  color: string
  fontFamily: string
  fontSize: number
  fontWeight: string | number
  fontStyle?: string
  selected?: boolean
  zIndex: number
  multiline?: boolean      // Ob der Text mehrzeilig ist
  width?: number          // Breite der Textbox in Prozent
  lineHeight: number     // Zeilenhöhe als Faktor
  textAlign?: 'left' | 'center' | 'right'  // Textausrichtung
  letterSpacing: number  // Buchstabenabstand in Pixel
}
