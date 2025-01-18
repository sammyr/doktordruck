import { Button } from "@/components/ui/button"
import { Type } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TextBlock } from "@/types/text"

interface TextUppercaseButtonProps {
  selectedBlock: TextBlock | null
  onTextBlockUpdate: (block: TextBlock) => void
}

export function TextUppercaseButton({ selectedBlock, onTextBlockUpdate }: TextUppercaseButtonProps) {
  const handleUppercaseToggle = () => {
    if (!selectedBlock) return
    
    if (!selectedBlock.isUpperCase) {
      // Beim ersten Klick: Speichere Original und konvertiere zu Großbuchstaben
      onTextBlockUpdate({
        ...selectedBlock,
        originalText: selectedBlock.text, // Speichere den aktuellen Text als Original
        text: selectedBlock.text.toUpperCase(),
        isUpperCase: true
      })
    } else {
      // Beim zweiten Klick: Stelle Original wieder her
      onTextBlockUpdate({
        ...selectedBlock,
        text: selectedBlock.originalText || selectedBlock.text, // Verwende das Original
        originalText: undefined, // Lösche das Original
        isUpperCase: false
      })
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleUppercaseToggle}
      className={cn('w-10 h-10', selectedBlock?.isUpperCase && 'bg-accent')}
      title="Großbuchstaben"
    >
      <Type className="w-4 h-4" />
    </Button>
  )
}
