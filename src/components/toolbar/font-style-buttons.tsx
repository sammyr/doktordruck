import { Button } from "@/components/ui/button"
import { Bold, Italic, Type } from 'lucide-react'

interface FontStyleButtonsProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function FontStyleButtons({ 
  value, 
  onChange, 
  disabled = false 
}: FontStyleButtonsProps) {
  return (
    <div className="flex gap-1">
      <Button
        variant={value === 'normal' ? 'default' : 'outline'}
        size="icon"
        onClick={() => onChange('normal')}
        disabled={disabled}
        className="h-12 w-12"
        title="Normale Schrift"
      >
        <Type className="h-4 w-4" />
      </Button>
      <Button
        variant={value === 'bold' ? 'default' : 'outline'}
        size="icon"
        onClick={() => onChange('bold')}
        disabled={disabled}
        className="h-12 w-12 font-black"
        title="Fett"
      >
        <Bold className="h-5 w-5" />
      </Button>
      <Button
        variant={value === 'italic' ? 'default' : 'outline'}
        size="icon"
        onClick={() => onChange('italic')}
        disabled={disabled}
        className="h-12 w-12"
        title="Kursiv"
      >
        <Italic className="h-4 w-4" />
      </Button>
    </div>
  )
}
