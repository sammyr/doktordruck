'use client'

import { useState } from 'react'
import { Label } from "@/components/ui/label"
import { ColorSwatchGallery } from '@/components/ui/color-swatch-gallery'
import { colorPalette } from '@/data/colors'

interface BackgroundColorPickerProps {
  backgroundColor: string
  setBackgroundColor: (color: string) => void
}

export function BackgroundColorPicker({ backgroundColor, setBackgroundColor }: BackgroundColorPickerProps) {
  const [colors, setColors] = useState<string[]>([...colorPalette.background])

  const handleAddColor = (newColor: string) => {
    setColors([...colors, newColor])
  }

  return (
    <div className="space-y-2">
      <Label>Hintergrundfarbe</Label>
      <ColorSwatchGallery
        colors={colors}
        selectedColor={backgroundColor}
        onColorSelect={setBackgroundColor}
        onAddColor={handleAddColor}
      />
    </div>
  )
}
