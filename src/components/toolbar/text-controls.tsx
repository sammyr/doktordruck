'use client'

// !!! WICHTIG: Diese Komponente ist für die Textformatierung zuständig !!!
// !!! Die Schriftart-Auswahl (Select) darf NICHT verändert werden !!!
// !!! Die Schriftgrößen-Steuerung (NumberStepper) darf NICHT verändert werden !!!
// !!! Die Schriftgrößen-Einstellungen (Initialwert 35, Schrittweite 10) dürfen NICHT geändert werden !!!

import { Button } from "@/components/ui/button"
import { Type, Trash2, AlignCenter, AlignLeft, AlignRight, Bold, Italic } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { NumberStepper } from "@/components/ui/number-stepper"
import type { TextBlock } from "@/types/text"
import { TextColorPicker } from "./text-color-picker"
import { FontStyleButtons } from "./font-style-buttons"
import { fonts } from '@/data/fonts'
import { cn } from '@/lib/utils'
import { TextUppercaseButton } from './text-uppercase-button'

interface TextControlsProps {
  selectedBlockId: string | null
  textBlocks: TextBlock[]
  onAddTextBlock: () => void
  onDeleteTextBlock: (id: string) => void
  onTextBlockUpdate: (block: TextBlock) => void
  fontFamily: string
  setFontFamily: (font: string) => void
  fontSize: number
  setFontSize: (size: number) => void
  fontStyle: string
  setFontStyle: (style: string) => void
  fontWeight: number
  setFontWeight: (weight: number) => void
}

export function TextControls({
  selectedBlockId,
  textBlocks,
  onAddTextBlock,
  onDeleteTextBlock,
  onTextBlockUpdate,
  fontFamily,
  setFontFamily,
  fontSize,
  setFontSize,
  fontStyle,
  setFontStyle,
  fontWeight,
  setFontWeight,
}: TextControlsProps) {
  const selectedBlock = textBlocks.find(block => block.id === selectedBlockId)
  const selectedFont = fonts.find(font => font.family === fontFamily)

  const handleLineHeightChange = (value: number) => {
    if (selectedBlock) {
      onTextBlockUpdate({
        ...selectedBlock,
        lineHeight: value
      })
    }
  }

  return (
    <div className="space-y-4">
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
          <Label>Schriftart</Label>
          <Select
            value={fontFamily}
            onValueChange={setFontFamily}
            disabled={!selectedBlockId}
          >
            <SelectTrigger>
              <SelectValue placeholder="Wähle eine Schriftart" />
            </SelectTrigger>
            <SelectContent>
              {fonts.map((font) => (
                <SelectItem
                  key={font.family}
                  value={font.family}
                  style={{ fontFamily: font.family }}
                >
                  {font.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Schriftgewicht</Label>
          <Select
            value={fontWeight?.toString()}
            onValueChange={(value) => setFontWeight(Number(value))}
            disabled={!selectedBlockId || !selectedFont}
          >
            <SelectTrigger>
              <SelectValue placeholder="Wähle ein Schriftgewicht" />
            </SelectTrigger>
            <SelectContent>
              {selectedFont?.weights.map((weight) => (
                <SelectItem
                  key={weight.value}
                  value={weight.value.toString()}
                  style={{ fontFamily: fontFamily, fontWeight: weight.value }}
                >
                  {weight.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Schriftgröße</Label>
            <NumberStepper
              value={fontSize}
              onChange={setFontSize}
              min={10}
              max={150}
              step={10}
              disabled={!selectedBlockId}
            />
          </div>

          <div className="space-y-2">
            <Label>Zeilenhöhe</Label>
            <NumberStepper
              value={selectedBlock?.lineHeight || 1.2}
              onChange={handleLineHeightChange}
              min={0.1}
              max={5}
              step={0.1}
              disabled={!selectedBlockId}
              decimalPlaces={1}
            />
          </div>

          <div className="space-y-2">
            <Label>Buchstabenabstand</Label>
            <NumberStepper
              value={selectedBlock?.letterSpacing || 0}
              onChange={(value) => {
                if (selectedBlock) {
                  onTextBlockUpdate({
                    ...selectedBlock,
                    letterSpacing: value
                  })
                }
              }}
              min={-5}
              max={20}
              step={0.1}
              disabled={!selectedBlockId}
              decimalPlaces={1}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Schriftstil & Ausrichtung</Label>
          <FontStyleButtons
            fontStyle={fontStyle}
            setFontStyle={setFontStyle}
            textAlign={selectedBlock?.textAlign || 'left'}
            setTextAlign={(align) => {
              if (selectedBlock) {
                onTextBlockUpdate({
                  ...selectedBlock,
                  textAlign: align
                })
              }
            }}
            disabled={!selectedBlockId}
          />
          <TextUppercaseButton
            selectedBlock={selectedBlock}
            onTextBlockUpdate={onTextBlockUpdate}
          />
        </div>

        <div className="space-y-2">
          <Label>Textfarbe</Label>
          <TextColorPicker
            selectedBlock={selectedBlock}
            onTextBlockUpdate={onTextBlockUpdate}
          />
        </div>
      </div>
    </div>
  )
}
