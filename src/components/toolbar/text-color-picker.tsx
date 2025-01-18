'use client'

// !!! WICHTIG: Diese Komponente ist essentiell für die Farbauswahl und darf nicht gelöscht werden !!!
// !!! Sie enthält die Farbauswahl für die Textbearbeitung !!!
// !!! Alle Komponenten und Funktionen sind notwendig für die korrekte Funktionsweise !!!

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ColorPicker } from "@/components/ui/color-picker"
import { colorPalette } from '@/data/colors'
import { TextBlock } from "@/types/text"

interface TextColorPickerProps {
  selectedBlock: TextBlock | undefined
  onTextBlockUpdate: (block: TextBlock) => void
  disabled?: boolean
}

export function TextColorPicker({ 
  selectedBlock, 
  onTextBlockUpdate,
  disabled = false
}: TextColorPickerProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="textColor">Textfarbe</Label>
      <div className="space-y-2">
        <div className="flex space-x-2">
          <ColorPicker
            color={selectedBlock?.color || '#000000'}
            onChange={(color) => {
              if (selectedBlock) {
                onTextBlockUpdate({
                  ...selectedBlock,
                  color
                })
              }
            }}
            disabled={disabled}
            label="Textfarbe wählen"
          />
          <Input
            type="text"
            value={selectedBlock?.color || '#000000'}
            onChange={(e) => {
              if (selectedBlock) {
                onTextBlockUpdate({
                  ...selectedBlock,
                  color: e.target.value
                })
              }
            }}
            className="flex-1 h-12"
            disabled={disabled}
            spellCheck={false}
          />
        </div>
        
        <div className="grid grid-cols-6 gap-2 p-2">
          {colorPalette.text.map((color, index) => (
            <button
              key={`text-${color}-${index}`}
              className={`w-8 h-8 rounded-lg border transition-all ${
                selectedBlock?.color === color 
                  ? 'border-blue-500 scale-110' 
                  : 'border-gray-200 hover:scale-105'
              }`}
              style={{ backgroundColor: color }}
              onClick={() => {
                if (selectedBlock) {
                  onTextBlockUpdate({
                    ...selectedBlock,
                    color
                  })
                }
              }}
              disabled={disabled}
              title={color}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
