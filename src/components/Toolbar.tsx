// !!! WICHTIG: Diese Komponente ist essentiell für die Anwendung und darf nicht gelöscht werden !!!
// !!! Sie enthält die Hauptsteuerelemente für die PDF-Generierung und Textbearbeitung !!!

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ColorPicker } from "@/components/ui/color-picker"
import { ColorSwatch } from "@/components/ui/color-swatch"
import paperSizes from '@/data/paper-sizes.json'
import { colorPalette } from '@/data/colors'
import { FileDown, Type, Trash2 } from 'lucide-react'
import { generatePDF } from '@/lib/pdf-generator'
import { TextBlock } from '@/types/text'

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
  const allSizes = [
    ...paperSizes.poster.portrait.map(size => ({
      id: size.id,
      name: size.name,
      type: 'Hochkant'
    })),
    ...paperSizes.poster.landscape.map(size => ({
      id: size.id,
      name: size.name,
      type: 'Querformat'
    }))
  ]

  const handleGeneratePDF = async () => {
    try {
      const pdf = await generatePDF({
        pageSize,
        backgroundColor,
        content: textBlocks
      })
      pdf.save(`poster-${pageSize}.pdf`)
    } catch (error) {
      console.error('Fehler bei der PDF-Generierung:', error)
    }
  }

  const selectedBlock = textBlocks.find(block => block.id === selectedBlockId)

  return (
    <div className="h-full bg-gray-50 p-4 overflow-y-auto">
      <div className="space-y-4">
        {/* Dokumenteinstellungen */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pageSize">Postergröße</Label>
                <Select value={pageSize} onValueChange={setPageSize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Wähle eine Größe" />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="space-y-1">
                      <div className="px-2 py-1.5 text-sm font-semibold">Hochkant</div>
                      {allSizes
                        .filter(size => size.type === 'Hochkant')
                        .map(size => (
                          <SelectItem key={size.id} value={size.id}>
                            {size.name}
                          </SelectItem>
                        ))}
                      <div className="px-2 py-1.5 text-sm font-semibold">Querformat</div>
                      {allSizes
                        .filter(size => size.type === 'Querformat')
                        .map(size => (
                          <SelectItem key={size.id} value={size.id}>
                            {size.name}
                          </SelectItem>
                        ))}
                    </div>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="backgroundColor">Hintergrundfarbe</Label>
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <ColorPicker
                      color={backgroundColor}
                      onChange={setBackgroundColor}
                      label="Hintergrundfarbe wählen"
                    />
                    <Input
                      type="text"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="flex-1"
                      spellCheck={false}
                    />
                  </div>
                  
                  {/* Hintergrund-Farbpalette */}
                  <div className="grid grid-cols-5 gap-1">
                    {colorPalette.background.map((color, index) => (
                      <button
                        key={`bg-${color}-${index}`}
                        className={`w-6 h-6 rounded-full border transition-all ${
                          backgroundColor === color 
                            ? 'border-blue-500 scale-110' 
                            : 'border-gray-200 hover:scale-105'
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setBackgroundColor(color)}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="textColor">Textfarbe</Label>
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <ColorPicker
                      color={selectedBlock?.color || '#000000'}
                      onChange={(color) => {
                        if (selectedBlockId && selectedBlock) {
                          onTextBlockUpdate({
                            ...selectedBlock,
                            color
                          })
                        }
                      }}
                      disabled={!selectedBlockId}
                      label="Textfarbe wählen"
                    />
                    <Input
                      type="text"
                      value={selectedBlock?.color || '#000000'}
                      onChange={(e) => {
                        if (selectedBlockId && selectedBlock) {
                          onTextBlockUpdate({
                            ...selectedBlock,
                            color: e.target.value
                          })
                        }
                      }}
                      className="flex-1"
                      disabled={!selectedBlockId}
                      spellCheck={false}
                    />
                  </div>

                  {/* Text-Farbpalette */}
                  <div className="grid grid-cols-5 gap-1">
                    {colorPalette.text.map((color, index) => (
                      <button
                        key={`text-${color}-${index}`}
                        className={`w-6 h-6 rounded-full border transition-all ${
                          selectedBlock?.color === color 
                            ? 'border-blue-500 scale-110' 
                            : 'border-gray-200 hover:scale-105'
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          if (selectedBlockId && selectedBlock) {
                            onTextBlockUpdate({
                              ...selectedBlock,
                              color
                            })
                          }
                        }}
                        disabled={!selectedBlockId}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Texteinstellungen */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-medium">Texteinstellungen</div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onAddTextBlock}
                >
                  <Type className="w-4 h-4 mr-1" />
                  Neuer Text
                </Button>
                {selectedBlockId && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDeleteTextBlock(selectedBlockId)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Löschen
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fontFamily">Schriftart</Label>
                <Select 
                  value={fontFamily} 
                  onValueChange={setFontFamily}
                  disabled={!selectedBlockId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Wähle eine Schriftart" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inter">Inter</SelectItem>
                    <SelectItem value="Arial">Arial</SelectItem>
                    <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fontSize">Schriftgröße</Label>
                <Input
                  id="fontSize"
                  type="number"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  disabled={!selectedBlockId}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fontStyle">Schriftstil</Label>
                <Select 
                  value={fontStyle} 
                  onValueChange={setFontStyle}
                  disabled={!selectedBlockId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Wähle einen Schriftstil" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="italic">Kursiv</SelectItem>
                    <SelectItem value="bold">Fett</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* PDF Export */}
        <Card>
          <CardContent className="pt-6">
            <Button 
              onClick={handleGeneratePDF} 
              className="w-full"
              size="lg"
            >
              <FileDown className="mr-2 h-4 w-4" />
              PDF Generieren
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
