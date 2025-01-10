'use client'

import { Button } from "@/components/ui/button"
import { Italic, AlignLeft, AlignCenter, AlignRight } from 'lucide-react'

interface FontStyleButtonsProps {
  fontStyle: string
  setFontStyle: (style: string) => void
  textAlign: 'left' | 'center' | 'right'
  setTextAlign: (align: 'left' | 'center' | 'right') => void
  disabled?: boolean
}

export function FontStyleButtons({
  fontStyle,
  setFontStyle,
  textAlign,
  setTextAlign,
  disabled = false
}: FontStyleButtonsProps) {
  const isItalic = fontStyle.includes('italic')

  return (
    <div className="flex gap-2">
      <Button
        variant={isItalic ? 'default' : 'outline'}
        size="sm"
        onClick={() => setFontStyle(isItalic ? 'normal' : 'italic')}
        disabled={disabled}
        className="h-9 w-9"
      >
        <Italic className="h-4 w-4" />
      </Button>

      <div className="flex border rounded-md">
        <Button
          variant={textAlign === 'left' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setTextAlign('left')}
          disabled={disabled}
          className="h-9 w-9 rounded-r-none"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          variant={textAlign === 'center' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setTextAlign('center')}
          disabled={disabled}
          className="h-9 w-9 rounded-none border-x-0"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          variant={textAlign === 'right' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setTextAlign('right')}
          disabled={disabled}
          className="h-9 w-9 rounded-l-none"
        >
          <AlignRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
