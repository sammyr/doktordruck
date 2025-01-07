// !!! WICHTIG: Diese Datei ist essentiell für die PDF-Generierung und darf nicht gelöscht werden !!!
// !!! Sie enthält die Logik für die Erstellung der PDF-Dokumente mit allen Einstellungen !!!

import { jsPDF } from 'jspdf'
import paperSizes from '@/data/paper-sizes.json'
import { TextBlock } from '@/types/text'
import { pdfSettings } from '@/config/settings'

// Standard-Schriftarten-Mapping
// const fontMapping: { [key: string]: string } = {
//   'Inter': 'helvetica',
//   'Roboto': 'helvetica',
//   'Playfair Display': 'times',
//   'Arial': 'helvetica',
//   'Times New Roman': 'times',
//   'Courier New': 'courier'
// }

// Gewicht-Mapping
// const weightMapping: { [key: number]: string } = {
//   100: 'normal',
//   200: 'normal',
//   300: 'normal',
//   400: 'normal',
//   500: 'normal',
//   600: 'bold',
//   700: 'bold',
//   800: 'bold',
//   900: 'bold'
// }

interface PdfGeneratorOptions {
  pageSize: string
  backgroundColor: string
  content: TextBlock[]
}

export async function generatePDF(options: PdfGeneratorOptions): Promise<Uint8Array> {
  // Finde die ausgewählte Papiergröße
  const allSizes = [...paperSizes.poster.portrait, ...paperSizes.poster.landscape]
  const selectedSize = allSizes.find(size => size.id === options.pageSize)
  
  if (!selectedSize) {
    throw new Error('Ungültige Papiergröße')
  }

  // Extrahiere die Maße
  const { width, height } = selectedSize
  const orientation = options.pageSize.startsWith('l') ? 'landscape' : 'portrait'
  const { bleed, fontMapping, weightMapping, fontScaleFactor, minMargin } = pdfSettings

  // Erstelle PDF
  const pdf = new jsPDF({
    orientation,
    unit: 'mm',
    format: [
      width + (bleed * 2),
      height + (bleed * 2)
    ]
  })

  // Setze Hintergrundfarbe
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 255, g: 255, b: 255 }
  }

  const bgColor = hexToRgb(options.backgroundColor)
  pdf.setFillColor(bgColor.r, bgColor.g, bgColor.b)
  pdf.rect(
    0,
    0,
    width + (bleed * 2),
    height + (bleed * 2),
    'F'
  )

  // Füge alle Textblöcke ein
  options.content.forEach(block => {
    // Mappe die Schriftart auf eine Standard-PDF-Schriftart
    const fontFamily = fontMapping[block.fontFamily] || 'helvetica'
    const fontStyle = weightMapping[block.fontWeight] || 'normal'
    
    // Setze die Schriftart
    pdf.setFont(fontFamily, fontStyle)
    
    // Schriftgrößenberechnung mit Skalierungsfaktor aus den Einstellungen
    const fontSize = Math.round(block.fontSize * fontScaleFactor)
    pdf.setFontSize(fontSize)

    // Setze die Textfarbe
    const textColor = hexToRgb(block.color)
    pdf.setTextColor(textColor.r, textColor.g, textColor.b)

    // Berechne die Position
    const pageWidth = width + (bleed * 2)
    const pageHeight = height + (bleed * 2)
    
    // Berechne die absolute Position in mm
    const posX = (block.x / 100) * pageWidth
    const posY = (block.y / 100) * pageHeight

    // Text einfügen
    pdf.text(block.text, posX, posY, {
      align: 'center',
      baseline: 'middle',
      maxWidth: pageWidth - (minMargin * 2) // Berücksichtige Mindestrand
    })
  })

  // PDF als ArrayBuffer zurückgeben
  const arrayBuffer = pdf.output('arraybuffer')
  return new Uint8Array(arrayBuffer)
}
