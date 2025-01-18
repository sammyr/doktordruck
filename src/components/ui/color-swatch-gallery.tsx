// !!! WICHTIG: Diese Komponente ist für die Farbauswahl zuständig und darf nicht verändert werden !!!

import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { HexColorPicker } from "react-colorful"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface ColorSwatchGalleryProps {
  colors: string[]
  selectedColor?: string
  onColorSelect: (color: string) => void
  onAddColor?: (color: string) => void
  label?: string
}

export function ColorSwatchGallery({ 
  colors, 
  selectedColor = '#000000', 
  onColorSelect,
  onAddColor,
  label = "Farbe wählen"
}: ColorSwatchGalleryProps) {
  const [customColor, setCustomColor] = useState("#000000")
  const [hexInput, setHexInput] = useState("#000000")

  const handleHexInput = (value: string) => {
    // Entferne Leerzeichen und setze # voran, falls nicht vorhanden
    let hex = value.trim()
    if (!hex.startsWith('#')) {
      hex = '#' + hex
    }
    setHexInput(hex)

    // Aktualisiere den ColorPicker und den Input, wenn der Code gültig ist
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      setCustomColor(hex)
    }
  }

  const handleAddCustomColor = () => {
    if (onAddColor && /^#[0-9A-Fa-f]{6}$/.test(customColor)) {
      onAddColor(customColor)
      setCustomColor("#000000")
      setHexInput("#000000")
    }
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-6 gap-2">
        {colors.map((color) => (
          <button
            key={color}
            className={cn(
              'w-10 h-10 rounded-full border transition-all',
              selectedColor === color 
                ? 'border-blue-500 scale-110' 
                : 'border-gray-200 hover:scale-105'
            )}
            style={{ backgroundColor: color }}
            onClick={() => onColorSelect(color)}
          />
        ))}
        
        {onAddColor && (
          <Popover>
            <PopoverTrigger asChild>
              <button
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                title="Neue Farbe hinzufügen"
              >
                <Plus className="w-6 h-6 text-gray-400" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-3">
              <div className="space-y-3">
                <HexColorPicker color={customColor} onChange={(color) => {
                  setCustomColor(color)
                  setHexInput(color)
                }} />
                
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-8 h-8 rounded-full border" 
                    style={{ backgroundColor: customColor }} 
                  />
                  <Input
                    value={hexInput}
                    onChange={(e) => handleHexInput(e.target.value)}
                    placeholder="#000000"
                    className="flex-1"
                    maxLength={7}
                  />
                </div>

                <Button
                  className="w-full"
                  onClick={handleAddCustomColor}
                  disabled={!/^#[0-9A-Fa-f]{6}$/.test(customColor)}
                >
                  Farbe hinzufügen
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  )
}
