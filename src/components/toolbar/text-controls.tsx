import { Button } from "@/components/ui/button"
import { Type, Trash2 } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { NumberStepper } from "@/components/ui/number-stepper"
import { TextBlock } from "@/types/text"
import { TextColorPicker } from "./text-color-picker"
import { FontStyleButtons } from "./font-style-buttons"

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
  setFontStyle
}: TextControlsProps) {
  const selectedBlock = textBlocks.find(block => block.id === selectedBlockId)

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
          <Label htmlFor="fontFamily">Schriftart</Label>
          <Select 
            value={fontFamily} 
            onValueChange={setFontFamily}
            disabled={!selectedBlockId}
          >
            <SelectTrigger className="h-12">
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
          <div className="flex items-center gap-4">
            <NumberStepper
              value={fontSize}
              onChange={setFontSize}
              disabled={!selectedBlockId}
              textBlocks={textBlocks}
              selectedBlockId={selectedBlockId}
              onTextBlockUpdate={onTextBlockUpdate}
            />

            <div className="flex-1">
              <FontStyleButtons
                value={fontStyle}
                onChange={setFontStyle}
                disabled={!selectedBlockId}
              />
            </div>
          </div>
        </div>

        <TextColorPicker
          selectedBlock={selectedBlock}
          selectedBlockId={selectedBlockId}
          onTextBlockUpdate={onTextBlockUpdate}
        />
      </div>
    </div>
  )
}
