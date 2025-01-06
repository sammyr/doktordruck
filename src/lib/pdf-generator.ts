// !!! WICHTIG: Diese Datei ist essentiell für die PDF-Generierung und darf nicht gelöscht werden !!!
// !!! Sie enthält die Logik für die Erstellung der PDF-Dokumente mit allen Einstellungen !!!

import jsPDF from 'jspdf'
import paperSizes from '@/data/paper-sizes.json'

interface PdfGeneratorOptions {
  pageSize: string
  backgroundColor: string
  content?: string
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

  // Wenn Inhalt vorhanden ist, füge ihn im Druckbereich ein
  if (options.content) {
    pdf.setTextColor(0)
    pdf.setFontSize(12)
    pdf.text(options.content, printArea.left, printArea.top)
  }

  return pdf
}
