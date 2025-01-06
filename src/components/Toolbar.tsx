// !!! WICHTIG: Diese Komponente ist essentiell für die Anwendung und darf nicht gelöscht werden !!!
// !!! Sie enthält die Hauptsteuerelemente für die PDF-Generierung und Textbearbeitung !!!

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileDown } from 'lucide-react'
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
      const pdf = await generatePDF({
        pageSize,
        backgroundColor,
        content: textBlocks
      })
      pdf.save(`doktor-druck-${pageSize}.pdf`)
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
                value={backgroundColor}
                onChange={setBackgroundColor}
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
            />
          </CardContent>
        </Card>

        {/* PDF Export */}
        <Button 
          className="w-full" 
          onClick={handleGeneratePDF}
        >
          <FileDown className="w-4 h-4 mr-2" />
          Als PDF exportieren
        </Button>
      </div>
    </div>
  )
}
