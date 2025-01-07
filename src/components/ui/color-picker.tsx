// !!! WICHTIG: Diese Komponente ist essentiell für die Farb-Auswahl und darf nicht gelöscht werden !!!
// !!! Sie wird von der Toolbar für die Hintergrund- und Textfarbe verwendet !!!

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { HexColorPicker } from "react-colorful"
import { cn } from "@/lib/utils"

export interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label: string;
  disabled?: boolean;
}

export function ColorPicker({ color, onChange, label, disabled = false }: ColorPickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedColor, setSelectedColor] = React.useState(color)

  const handleColorChange = (color: string) => {
    setSelectedColor(color)
    onChange(color)
  }

  return (
    <PopoverPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button
          className={cn(
            "w-12 h-10 rounded-md border border-input shadow-sm",
            disabled ? "opacity-50 cursor-not-allowed" : ""
          )}
          style={{ backgroundColor: selectedColor }}
          aria-label={label || "Wähle eine Farbe"}
          disabled={disabled}
        />
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          className="z-50 w-[240px] rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none"
          sideOffset={5}
        >
          <div className="space-y-4">
            <HexColorPicker color={selectedColor} onChange={handleColorChange} />
            <div className="flex items-center space-x-2">
              <div
                className="w-8 h-8 rounded border"
                style={{ backgroundColor: selectedColor }}
              />
              <input
                type="text"
                value={selectedColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="flex-1 px-2 py-1 text-sm border rounded"
                spellCheck={false}
              />
            </div>
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}
