'use client'

// !!! WICHTIG: Diese Komponente ist essentiell für die Farbauswahl und darf nicht gelöscht werden !!!
// !!! Sie enthält die Farbauswahl für die Textbearbeitung !!!
// !!! Alle Komponenten und Funktionen sind notwendig für die korrekte Funktionsweise !!!

import { Label } from "@/components/ui/label"
import { useState } from "react"
import { TextBlock } from "@/types/text"
import { ColorSwatchGallery } from "@/components/ui/color-swatch-gallery"
import { colorPalette } from "@/data/colors"

interface TextColorPickerProps {
  selectedBlock: TextBlock | null
  onTextBlockUpdate: (block: TextBlock) => void
}

export function TextColorPicker({ selectedBlock, onTextBlockUpdate }: TextColorPickerProps) {
  const [colors, setColors] = useState<string[]>([...colorPalette.text])

  const handleColorSelect = (color: string) => {
    if (!selectedBlock) return
    onTextBlockUpdate({
      ...selectedBlock,
      color
    })
  }

  const handleAddColor = (newColor: string) => {
    setColors([...colors, newColor])
    handleColorSelect(newColor)
  }

  return (
    <div className="space-y-2">
      <Label className="select-none">Textfarbe</Label>
      <ColorSwatchGallery
        colors={colors}
        selectedColor={selectedBlock?.color || '#000000'}
        onColorSelect={handleColorSelect}
        onAddColor={handleAddColor}
        label="Textfarbe wählen"
      />
    </div>
  )
}
