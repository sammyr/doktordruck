'use client'

import { MoveVertical, ChevronUp, ChevronDown } from 'lucide-react'
import { Button } from './button'

interface LineHeightInputProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
}

export function LineHeightInput({
  value,
  onChange,
  min = 0.1,
  max = 5,
  step = 0.1,
  disabled = false
}: LineHeightInputProps) {
  const handleIncrement = () => {
    const newValue = Math.min(max, value + step)
    onChange(Number(newValue.toFixed(1)))
  }

  const handleDecrement = () => {
    const newValue = Math.max(min, value - step)
    onChange(Number(newValue.toFixed(1)))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value)
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(Number(newValue.toFixed(1)))
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="relative flex items-center">
        <MoveVertical className="absolute left-2 w-4 h-4 text-gray-500 pointer-events-none" />
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleInputChange}
          className="w-20 h-9 pl-8 pr-1 border rounded-l-md text-sm focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500"
          disabled={disabled}
        />
        <div className="flex flex-col border-l-0">
          <Button
            variant="outline"
            size="sm"
            className="h-[18px] w-6 rounded-none rounded-tr-md border-l-0 px-1"
            onClick={handleIncrement}
            disabled={disabled || value >= max}
          >
            <ChevronUp className="h-3 w-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-[18px] w-6 rounded-none rounded-br-md border-l-0 border-t-0 px-1"
            onClick={handleDecrement}
            disabled={disabled || value <= min}
          >
            <ChevronDown className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  )
}
