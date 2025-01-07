'use client'

import { ChevronUp, ChevronDown } from 'lucide-react'
import { Button } from './button'

interface NumberStepperProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  decimalPlaces?: number
}

export function NumberStepper({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  decimalPlaces = 0
}: NumberStepperProps) {
  const handleIncrement = () => {
    const newValue = Math.min(max, value + step)
    onChange(Number(newValue.toFixed(decimalPlaces)))
  }

  const handleDecrement = () => {
    const newValue = Math.max(min, value - step)
    onChange(Number(newValue.toFixed(decimalPlaces)))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value)
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(Number(newValue.toFixed(decimalPlaces)))
    }
  }

  return (
    <div className="flex items-center">
      <div className="relative flex items-center">
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleInputChange}
          className="w-20 h-9 px-3 pr-8 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          disabled={disabled}
        />
        <div className="absolute right-0 inset-y-0 flex flex-col border-l">
          <Button
            variant="ghost"
            size="icon"
            className="h-[18px] w-8 rounded-none rounded-tr-md px-1 hover:bg-gray-100"
            onClick={handleIncrement}
            disabled={disabled || value >= max}
          >
            <ChevronUp className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-[18px] w-8 rounded-none rounded-br-md px-1 hover:bg-gray-100"
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
