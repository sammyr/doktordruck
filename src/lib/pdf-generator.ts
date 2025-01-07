// !!! WICHTIG: Diese Datei ist essentiell für die PDF-Generierung und darf nicht gelöscht werden !!!
// !!! Sie enthält die Logik für die Erstellung der PDF-Dokumente mit allen Einstellungen !!!

import { jsPDF } from 'jspdf'
import paperSizes from '@/data/paper-sizes.json'
import { TextBlock } from '@/types/text'
import { pdfSettings } from '@/config/settings'

// Konvertiert Hex-Farbe in RGB
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 255, g: 255, b: 255 }
}

// Setzt die Textstile für das PDF
function applyTextStyle(pdf: jsPDF, block: TextBlock) {
  // Mappe die Schriftart auf eine Standard-PDF-Schriftart
  const fontFamily = pdfSettings.fontMapping[block.fontFamily] || 'helvetica'
  const fontStyle = pdfSettings.weightMapping[block.fontWeight] || 'normal'
  
  // Setze die Schriftart
  pdf.setFont(fontFamily, fontStyle)
  
  // Schriftgrößenberechnung mit Skalierungsfaktor aus den Einstellungen
  const fontSize = Math.round(block.fontSize * pdfSettings.fontScaleFactor)
  pdf.setFontSize(fontSize)
  
  // Setze die Textfarbe
  const textColor = hexToRgb(block.color)
  pdf.setTextColor(textColor.r, textColor.g, textColor.b)
  
  // Setze den Buchstabenabstand, falls vorhanden
  if (block.letterSpacing) {
    pdf.setCharSpace(block.letterSpacing)
  }
  
  // Setze die Zeilenhöhe, falls vorhanden
  if (block.lineHeight) {
    pdf.setLineHeightFactor(block.lineHeight)
  }
}

// Berechnet die Position für den Text
function calculateTextPosition(block: TextBlock, pageWidth: number, pageHeight: number) {
  return {
    x: (block.x / 100) * pageWidth,
    y: (block.y / 100) * pageHeight
  }
}

// Rendert einen Textblock im PDF
function renderTextBlock(pdf: jsPDF, block: TextBlock, pageWidth: number, pageHeight: number) {
  // Wende Textstile an
  applyTextStyle(pdf, block)
  
  // Berechne Position
  const { x, y } = calculateTextPosition(block, pageWidth, pageHeight)
  
  // Text einfügen
  pdf.text(block.text, x, y, {
    align: 'center',
    baseline: 'middle',
    maxWidth: pageWidth - (pdfSettings.minMargin * 2)
  })
}

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
  const { bleed } = pdfSettings

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
  const pageWidth = width + (bleed * 2)
  const pageHeight = height + (bleed * 2)
  
  options.content.forEach(block => {
    renderTextBlock(pdf, block, pageWidth, pageHeight)
  })

  // PDF als ArrayBuffer zurückgeben
  return pdf.output('arraybuffer')
}
