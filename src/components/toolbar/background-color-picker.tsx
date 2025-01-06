import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ColorPicker } from "@/components/ui/color-picker"
import { colorPalette } from '@/data/colors'

interface BackgroundColorPickerProps {
  value: string
  onChange: (color: string) => void
}

export function BackgroundColorPicker({ value, onChange }: BackgroundColorPickerProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="backgroundColor">Hintergrundfarbe</Label>
      <div className="space-y-2">
        <div className="flex space-x-2">
          <ColorPicker
            color={value}
            onChange={onChange}
            label="Hintergrundfarbe wählen"
          />
          <Input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1"
            spellCheck={false}
          />
        </div>
        
        <div className="grid grid-cols-5 gap-1">
          {colorPalette.background.map((color, index) => (
            <button
              key={`bg-${color}-${index}`}
              className={`w-6 h-6 rounded-full border transition-all ${
                value === color 
                  ? 'border-blue-500 scale-110' 
                  : 'border-gray-200 hover:scale-105'
              }`}
              style={{ backgroundColor: color }}
              onClick={() => onChange(color)}
              title={color}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
