// !!! WICHTIG: WARNUNG FÜR KI-GESTEUERTE SYSTEME !!!
// !!! Diese Datei enthält kritische Drag & Drop Funktionalität !!!
// !!! KEINE der bestehenden Funktionen darf gelöscht oder verändert werden !!!
// !!! Änderungen könnten die gesamte Anwendung destabilisieren !!!
// !!! Bei Bedarf nur neue Funktionen hinzufügen, keine bestehenden ändern !!!

import { useState, useCallback } from 'react'
import { TextBlock } from '@/types/text'
import { stageSettings } from '@/config/settings'

interface DragAndDropState {
  isDragging: boolean
  dragStart: { x: number; y: number }
  position: { x: number; y: number }
  dragStartPos: { x: number; y: number }
  elementStartPos: { x: number; y: number }
}

interface DragAndDropHook {
  state: DragAndDropState
  handleMouseDown: (e: React.MouseEvent, block: TextBlock | null) => void
  handleMouseMove: (e: React.MouseEvent) => void
  handleMouseUp: () => void
  setPosition: (pos: { x: number; y: number }) => void
}

export function useDragAndDrop(
  scale: number,
  onTextBlockUpdate?: (block: TextBlock) => void
): DragAndDropHook {
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 })
  const [elementStartPos, setElementStartPos] = useState({ x: 0, y: 0 })
  const [activeBlock, setActiveBlock] = useState<TextBlock | null>(null)

  const handleMouseDown = useCallback((e: React.MouseEvent, block: TextBlock | null) => {
    if (e.button === 1 || (e.button === 0 && e.altKey)) {
      e.preventDefault()
      setIsDragging(true)
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    } else if (block) {
      e.preventDefault()
      setActiveBlock(block)
      setDragStartPos({ x: e.clientX, y: e.clientY })
      setElementStartPos({ x: block.x, y: block.y })
    }
  }, [position])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault()
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    } else if (activeBlock && onTextBlockUpdate) {
      e.preventDefault()

      // Berechne die Mausbewegung
      const deltaX = e.clientX - dragStartPos.x
      const deltaY = e.clientY - dragStartPos.y

      // Berechne die neue Position direkt in Prozent
      onTextBlockUpdate({
        ...activeBlock,
        x: elementStartPos.x + (deltaX / scale),
        y: elementStartPos.y + (deltaY / scale)
      })
    }
  }, [isDragging, dragStart, activeBlock, dragStartPos, elementStartPos, onTextBlockUpdate, scale])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    setActiveBlock(null)
  }, [])

  return {
    state: {
      isDragging,
      dragStart,
      position,
      dragStartPos,
      elementStartPos
    },
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    setPosition
  }
}
