'use client'

import { fonts } from '@/data/fonts'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { NumberStepper } from './ui/number-stepper'

interface TextSettingsProps {
  initialFont?: string
  initialSize?: number
  onFontChange: (font: string) => void
  onSizeChange: (size: number) => void
}

export function TextSettings({
  initialFont = 'Inter',
  initialSize = 16,
  onFontChange,
  onSizeChange
}: TextSettingsProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Schriftart
        </label>
        <Select
          defaultValue={initialFont}
          onValueChange={onFontChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Wähle eine Schriftart" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Schriftarten</SelectLabel>
              {fonts.map((font) => (
                <SelectItem
                  key={font.family}
                  value={font.family}
                  style={{ fontFamily: font.family }}
                >
                  {font.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Schriftgröße
        </label>
        <NumberStepper
          value={initialSize}
          onChange={onSizeChange}
          min={8}
          max={144}
          step={1}
        />
      </div>
    </div>
  )
}
