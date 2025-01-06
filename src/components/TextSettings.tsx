'use client'

import { useState, useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { availableFonts, Font } from '@/lib/fonts'

interface TextSettingsProps {
  onFontChange: (font: string) => void;
  onSizeChange: (size: number) => void;
  initialFont?: string;
  initialSize?: number;
}

export function TextSettings({ 
  onFontChange, 
  onSizeChange, 
  initialFont = 'Arial',
  initialSize = 12 
}: TextSettingsProps) {
  const [fonts, setFonts] = useState<Font[]>([])
  const [selectedFont, setSelectedFont] = useState(initialFont)
  const [fontSize, setFontSize] = useState(initialSize)

  // Lade die verfügbaren Schriftarten
  useEffect(() => {
    setFonts(availableFonts)
  }, [])

  // Lade die Schriftarten dynamisch
  useEffect(() => {
    fonts.forEach(font => {
      const fontFace = new FontFace(font.family, `url(${font.url})`)
      fontFace.load().then(loadedFont => {
        document.fonts.add(loadedFont)
      }).catch(error => {
        console.error(`Error loading font ${font.family}:`, error)
      })
    })
  }, [fonts])

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Schriftart
        </label>
        <Select
          value={selectedFont}
          onValueChange={(value) => {
            setSelectedFont(value)
            onFontChange(value)
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Wähle eine Schriftart" />
          </SelectTrigger>
          <SelectContent>
            {/* Standard-Schriftarten */}
            <SelectItem value="Arial">Arial</SelectItem>
            <SelectItem value="Times New Roman">Times New Roman</SelectItem>
            <SelectItem value="Helvetica">Helvetica</SelectItem>
            
            {/* Benutzerdefinierte Schriftarten */}
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Schriftgröße
        </label>
        <Select
          value={fontSize.toString()}
          onValueChange={(value) => {
            const size = parseInt(value)
            setFontSize(size)
            onSizeChange(size)
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Wähle eine Größe" />
          </SelectTrigger>
          <SelectContent>
            {[8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 28, 32, 36, 42, 48, 56, 64, 72].map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}pt
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Vorschau */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Vorschau
        </label>
        <div 
          className="p-4 border rounded-md"
          style={{ 
            fontFamily: selectedFont,
            fontSize: `${fontSize}px`
          }}
        >
          Beispieltext
        </div>
      </div>
    </div>
  )
}
