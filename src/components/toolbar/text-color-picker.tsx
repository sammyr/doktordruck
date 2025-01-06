import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ColorPicker } from "@/components/ui/color-picker"
import { colorPalette } from '@/data/colors'
import { TextBlock } from "@/types/text"

interface TextColorPickerProps {
  selectedBlock: TextBlock | undefined
  selectedBlockId: string | null
  onTextBlockUpdate: (block: TextBlock) => void
}

export function TextColorPicker({ 
  selectedBlock, 
  selectedBlockId, 
  onTextBlockUpdate 
}: TextColorPickerProps) {
  return (
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
            className="flex-1 h-12"
            disabled={!selectedBlockId}
            spellCheck={false}
          />
        </div>
        
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
  )
}
