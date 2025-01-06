// !!! WICHTIG: Diese Datei ist essentiell für die PDF-Generierung und darf nicht gelöscht werden !!!
// !!! Sie enthält die Logik für die Erstellung der PDF-Dokumente mit allen Einstellungen !!!

import jsPDF from 'jspdf'
import paperSizes from '@/data/paper-sizes.json'
import { TextBlock } from '@/types/text'

interface PdfGeneratorOptions {
  pageSize: string
  backgroundColor: string
  content: TextBlock[]
}

export const generatePDF = async (options: PdfGeneratorOptions) => {
  // Finde die ausgewählte Papiergröße
  const allSizes = [...paperSizes.poster.portrait, ...paperSizes.poster.landscape]
  const selectedSize = allSizes.find(size => size.id === options.pageSize)

  if (!selectedSize) {
    throw new Error('Ungültige Papiergröße')
  }

  // Konvertiere mm in Punkte (pt) für PDF (1mm = 2.83465 pt)
  const MM_TO_PT = 2.83465
  const width = selectedSize.width * MM_TO_PT
  const height = selectedSize.height * MM_TO_PT
  const bleed = selectedSize.bleed * MM_TO_PT

  // Erstelle PDF mit Beschnitt
  const pdf = new jsPDF({
    unit: 'pt',
    format: [width + (bleed * 2), height + (bleed * 2)],
    orientation: selectedSize.width > selectedSize.height ? 'l' : 'p'
  })

  // Zeichne Hintergrundfarbe mit Beschnitt
  pdf.setFillColor(options.backgroundColor)
  pdf.rect(0, 0, width + (bleed * 2), height + (bleed * 2), 'F')

  // Zeichne Schnittmarken
  const drawCropMark = (x: number, y: number, horizontal: boolean) => {
    pdf.setDrawColor(0)
    pdf.setLineWidth(0.5)
    if (horizontal) {
      pdf.line(x - 10, y, x + 10, y)
    } else {
      pdf.line(x, y - 10, x, y + 10)
    }
  }

  // Obere Schnittmarken
  drawCropMark(bleed, 0, true)
  drawCropMark(width + bleed, 0, true)

  // Untere Schnittmarken
  drawCropMark(bleed, height + (bleed * 2), true)
  drawCropMark(width + bleed, height + (bleed * 2), true)

  // Linke Schnittmarken
  drawCropMark(0, bleed, false)
  drawCropMark(0, height + bleed, false)

  // Rechte Schnittmarken
  drawCropMark(width + (bleed * 2), bleed, false)
  drawCropMark(width + (bleed * 2), height + bleed, false)

  // Zeichne Druckbereich (nicht sichtbar im finalen PDF)
  const printArea = {
    top: bleed + (selectedSize.printMargins.top * MM_TO_PT),
    right: width + bleed - (selectedSize.printMargins.right * MM_TO_PT),
    bottom: height + bleed - (selectedSize.printMargins.bottom * MM_TO_PT),
    left: bleed + (selectedSize.printMargins.left * MM_TO_PT)
  }

  // Füge Informationen zum Beschnitt hinzu
  pdf.setFontSize(8)
  pdf.setTextColor(128)
  pdf.text(
    `Beschnitt: ${selectedSize.bleed}mm | Format: ${selectedSize.width}x${selectedSize.height}mm`,
    bleed,
    height + (bleed * 2) + 20
  )

  // Füge alle Textblöcke ein
  options.content.forEach(block => {
    // Schriftart-Mapping für PDF
    const fontMapping: { [key: string]: string } = {
      'Inter': 'helvetica',
      'Arial': 'helvetica',
      'Times New Roman': 'times',
      'Courier New': 'courier',
      'Georgia': 'times',
      'Verdana': 'helvetica'
    }

    // Setze die Schriftart mit Fallback
    const fontFamily = fontMapping[block.fontFamily] || 'helvetica'
    const fontStyle = block.fontStyle === 'italic' ? 'italic' : 
                     block.fontStyle === 'bold' ? 'bold' : 'normal'
    
    pdf.setFont(fontFamily, fontStyle)
    
    // Schriftgrößenberechnung für exakte Übertragung von Bildschirm zu PDF
    const FONT_SCALE_FACTOR = 3.5
    const fontSize = block.fontSize * FONT_SCALE_FACTOR
    pdf.setFontSize(fontSize)
    
    // Setze die Textfarbe
    const color = block.color || '#000000'
    const r = parseInt(color.slice(1, 3), 16)
    const g = parseInt(color.slice(3, 5), 16)
    const b = parseInt(color.slice(5, 7), 16)
    pdf.setTextColor(r, g, b)

    // Berechne die Position
    // Die x,y-Koordinaten im TextBlock sind vom Mittelpunkt aus,
    // während pdf.text von der oberen linken Ecke ausgeht
    const centerX = width / 2
    const centerY = height / 2
    
    // Berechne die absolute Position in Punkten
    const x = bleed + centerX + (block.x * MM_TO_PT / 10)
    const y = bleed + centerY + (block.y * MM_TO_PT / 10)

    // Füge den Text ein
    pdf.text(block.text, x, y, {
      align: 'center',
      baseline: 'middle'
    })
  })

  return pdf
}
