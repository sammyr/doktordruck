// !!! WICHTIG: Diese Datei ist essentiell für die PDF-Generierung und darf nicht gelöscht werden !!!
// !!! Sie enthält die Logik für die Erstellung der PDF-Dokumente mit allen Einstellungen !!!

import { jsPDF } from 'jspdf'
import paperSizes from '@/data/paper-sizes.json'
import { TextBlock } from '@/types/text'
import { pdfSettings } from '@/config/settings'
import { fonts } from '@/data/fonts'

// Konvertiert Hex-Farbe in RGB
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 255, g: 255, b: 255 }
}

// Konvertiere ArrayBuffer zu Base64
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Zeichnet die Druckmarken
function drawPrintMarks(pdf: jsPDF, width: number, height: number) {
  const { printMarks, bleed } = pdfSettings
  if (!printMarks.enabled) return

  // Setze die Farbe auf CMYK Schwarz
  pdf.setDrawColor(
    printMarks.color.c,
    printMarks.color.m,
    printMarks.color.y,
    printMarks.color.k
  )
  pdf.setLineWidth(printMarks.thickness)

  // Zeichne die Schnittmarken an den Ecken
  const positions = [
    // Oben links
    { x: 0, y: 0 },
    // Oben rechts
    { x: width + (bleed * 2), y: 0 },
    // Unten links
    { x: 0, y: height + (bleed * 2) },
    // Unten rechts
    { x: width + (bleed * 2), y: height + (bleed * 2) }
  ]

  positions.forEach(pos => {
    // Horizontale Linie
    pdf.line(
      pos.x - printMarks.offset,
      pos.y + bleed,
      pos.x - printMarks.offset + printMarks.length,
      pos.y + bleed
    )
    // Vertikale Linie
    pdf.line(
      pos.x + bleed,
      pos.y - printMarks.offset,
      pos.x + bleed,
      pos.y - printMarks.offset + printMarks.length
    )
  })
}

// Registriere die Schriftarten für jsPDF
async function registerFonts(pdf: jsPDF) {
  for (const font of fonts) {
    try {
      // Lade die Regular-Version als Standardschrift
      const regularWeight = font.weights.find(w => w.value === 400) || font.weights[0];
      const fontPath = `${font.path}/${regularWeight.file}`
      console.log('Lade Schriftart:', fontPath)
      
      const response = await fetch(fontPath)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const fontBuffer = await response.arrayBuffer()
      const fontBase64 = arrayBufferToBase64(fontBuffer)
      
      // Registriere die Basisschrift
      pdf.addFileToVFS(`${font.family}.ttf`, fontBase64)
      pdf.addFont(`${font.family}.ttf`, font.family, 'normal')
      
      // Lade zusätzliche Gewichte
      for (const weight of font.weights) {
        if (weight.value !== 400) { // Überspringe Regular, da bereits geladen
          const weightPath = `${font.path}/${weight.file}`
          const weightResponse = await fetch(weightPath)
          if (weightResponse.ok) {
            const weightBuffer = await weightResponse.arrayBuffer()
            const weightBase64 = arrayBufferToBase64(weightBuffer)
            const weightStyle = pdfSettings.weightMapping[weight.value]
            
            pdf.addFileToVFS(`${font.family}-${weightStyle}.ttf`, weightBase64)
            pdf.addFont(`${font.family}-${weightStyle}.ttf`, font.family, weightStyle)
          }
        }
      }
      
      console.log('Schriftart erfolgreich geladen:', font.family)
    } catch (error) {
      console.error('Fehler beim Laden der Schriftart:', font.family, error)
    }
  }
}

// Setzt die Textstile für das PDF
function applyTextStyle(pdf: jsPDF, block: TextBlock) {
  try {
    // Verwende die tatsächliche Schriftart
    const fontFamily = block.fontFamily
    const fontWeight = typeof block.fontWeight === 'string' ? parseInt(block.fontWeight) : block.fontWeight
    const fontStyle = pdfSettings.weightMapping[fontWeight] || 'normal'
    
    // Setze die Schriftart
    pdf.setFont(fontFamily, fontStyle)
    
    // Schriftgrößenberechnung mit Skalierungsfaktor
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
  } catch (error) {
    console.error('Fehler beim Anwenden der Textstile:', error)
    // Fallback zu Standard-Schriftart
    pdf.setFont('helvetica', 'normal')
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

  // Registriere die Schriftarten
  await registerFonts(pdf)

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

  // Zeichne die Druckmarken
  drawPrintMarks(pdf, width, height)

  // Füge alle Textblöcke ein
  const pageWidth = width + (bleed * 2)
  const pageHeight = height + (bleed * 2)
  
  options.content.forEach(block => {
    renderTextBlock(pdf, block, pageWidth, pageHeight)
  })

  // PDF als Uint8Array zurückgeben
  const arrayBuffer = pdf.output('arraybuffer')
  return new Uint8Array(arrayBuffer)
}
