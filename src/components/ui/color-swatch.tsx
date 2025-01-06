import React from 'react'

interface ColorSwatchProps {
  colors: {
    background: string[]
    text: string[]
  }
  onSelectBackground: (color: string) => void
  onSelectText: (color: string) => void
  selectedBackgroundColor: string
  selectedTextColor: string
}

export function ColorSwatch({
  colors,
  onSelectBackground,
  onSelectText,
  selectedBackgroundColor,
  selectedTextColor
}: ColorSwatchProps) {
  return (
    <div className="space-y-4">
      {/* Hintergrundfarben */}
      <div>
        <div className="text-sm font-medium mb-2">Hintergrundfarben</div>
        <div className="grid grid-cols-4 gap-2">
          {colors.background.map((color, index) => (
            <button
              key={`bg-${color}-${index}`}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                selectedBackgroundColor === color 
                  ? 'border-blue-500 scale-110' 
                  : 'border-gray-200 hover:scale-105'
              }`}
              style={{ backgroundColor: color }}
              onClick={() => onSelectBackground(color)}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Textfarben */}
      <div>
        <div className="text-sm font-medium mb-2">Textfarben</div>
        <div className="grid grid-cols-4 gap-2">
          {colors.text.map((color, index) => (
            <button
              key={`text-${color}-${index}`}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                selectedTextColor === color 
                  ? 'border-blue-500 scale-110' 
                  : 'border-gray-200 hover:scale-105'
              }`}
              style={{ backgroundColor: color }}
              onClick={() => onSelectText(color)}
              title={color}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
