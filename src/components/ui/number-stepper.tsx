import { Input } from "./input"
import { TextBlock } from "@/types/text-block"

interface NumberStepperProps {
  value: number
  onChange: (value: number) => void
  onUpdate?: (value: number) => void
  disabled?: boolean
  step?: number
  min?: number
  textBlocks?: TextBlock[]
  selectedBlockId?: string
  onTextBlockUpdate?: (block: TextBlock) => void
}

export function NumberStepper({
  value,
  onChange,
  onUpdate,
  disabled = false,
  step = 10,
  min = 1,
  textBlocks,
  selectedBlockId,
  onTextBlockUpdate
}: NumberStepperProps) {
  const handleChange = (newValue: number) => {
    onChange(newValue)
    if (onUpdate) {
      onUpdate(newValue)
    }
    if (selectedBlockId && textBlocks && onTextBlockUpdate) {
      const block = textBlocks.find(b => b.id === selectedBlockId)
      if (block) {
        onTextBlockUpdate({
          ...block,
          fontSize: newValue
        })
      }
    }
  }

  return (
    <div className="relative w-24">
      <Input
        type="text"
        value={value}
        onChange={(e) => {
          const val = parseInt(e.target.value)
          if (!isNaN(val)) {
            handleChange(val)
          }
        }}
        className="h-12 w-full text-left px-3 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        disabled={disabled}
      />
      <div className="absolute right-0 top-0 bottom-0 flex flex-col border-l">
        <button
          onClick={() => handleChange(value + step)}
          className="h-1/2 w-6 hover:bg-gray-100 transition-colors duration-200 text-xs text-gray-600 border-b"
          disabled={disabled}
          aria-label={`Wert um ${step} erhöhen`}
        >
          ▲
        </button>
        <button
          onClick={() => handleChange(Math.max(min, value - step))}
          className="h-1/2 w-6 hover:bg-gray-100 transition-colors duration-200 text-xs text-gray-600"
          disabled={disabled}
          aria-label={`Wert um ${step} verringern`}
        >
          ▼
        </button>
      </div>
    </div>
  )
}
