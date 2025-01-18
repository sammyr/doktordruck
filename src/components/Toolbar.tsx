'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from 'lucide-react'
import { generatePDF } from '@/lib/pdf-generator'
import { TextBlock } from '@/types/text'
import { PageSizeSelector } from "./toolbar/page-size-selector"
import { BackgroundColorPicker } from "./toolbar/background-color-picker"
import { TextControls } from "./toolbar/text-controls"

interface ToolbarProps {
  backgroundColor: string
  setBackgroundColor: (color: string) => void
  fontFamily: string
  setFontFamily: (font: string) => void
  fontSize: number
  setFontSize: (size: number) => void
  fontStyle: string
  setFontStyle: (style: string) => void
  fontWeight: number
  setFontWeight: (weight: number) => void
  pageSize: string
  setPageSize: (size: string) => void
  selectedBlockId: string | null
  textBlocks: TextBlock[]
  onAddTextBlock: () => void
  onDeleteTextBlock: (id: string) => void
  onTextBlockUpdate: (block: TextBlock) => void
}

export function Toolbar({
  backgroundColor,
  setBackgroundColor,
  fontFamily,
  setFontFamily,
  fontSize,
  setFontSize,
  fontStyle,
  setFontStyle,
  fontWeight,
  setFontWeight,
  pageSize,
  setPageSize,
  selectedBlockId,
  textBlocks,
  onAddTextBlock,
  onDeleteTextBlock,
  onTextBlockUpdate
}: ToolbarProps) {
  const handleGeneratePDF = async () => {
    try {
      const pdfBytes = await generatePDF({
        pageSize,
        backgroundColor,
        content: textBlocks
      })

      // Erstelle einen Blob aus den PDF-Bytes
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      
      // Erstelle eine URL für den Download
      const url = window.URL.createObjectURL(blob)
      
      // Erstelle einen temporären Link und klicke ihn an
      const link = document.createElement('a')
      link.href = url
      link.download = 'dokument.pdf'
      document.body.appendChild(link)
      link.click()
      
      // Räume auf
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Fehler bei der PDF-Generierung:', error)
    }
  }

  return (
    <div className="h-full bg-gray-50 p-4 overflow-y-auto">
      <div className="space-y-4">
        {/* Dokumenteinstellungen */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <PageSizeSelector 
                value={pageSize}
                onChange={setPageSize}
              />

              <BackgroundColorPicker
                backgroundColor={backgroundColor}
                setBackgroundColor={setBackgroundColor}
              />
            </div>
          </CardContent>
        </Card>

        {/* Texteinstellungen */}
        <Card>
          <CardContent className="pt-6">
            <TextControls
              selectedBlockId={selectedBlockId}
              textBlocks={textBlocks}
              onAddTextBlock={onAddTextBlock}
              onDeleteTextBlock={onDeleteTextBlock}
              onTextBlockUpdate={onTextBlockUpdate}
              fontFamily={fontFamily}
              setFontFamily={setFontFamily}
              fontSize={fontSize}
              setFontSize={setFontSize}
              fontStyle={fontStyle}
              setFontStyle={setFontStyle}
              fontWeight={fontWeight}
              setFontWeight={setFontWeight}
            />
          </CardContent>
        </Card>

        {/* PDF Export */}
        <Button 
          className="w-full" 
          variant="outline"
          size="sm"
          onClick={handleGeneratePDF}
        >
          <Download className="w-4 h-4 mr-1" />
          PDF exportieren
        </Button>
      </div>
    </div>
  )
}
