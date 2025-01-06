// !!! WICHTIG: Diese Komponente ist essentiell für die Anwendung und darf nicht gelöscht werden !!!
// !!! Sie enthält die Hauptbühne für die PDF-Vorschau und Textbearbeitung !!!
// !!! Die graue Skalierungsleiste auf der rechten Seite ist ein wichtiger Bestandteil der Benutzeroberfläche !!!
// !!! Sie darf NICHT gelöscht oder verschoben werden, da sie für die Zoom-Funktionalität benötigt wird !!!

import React, { useState, useCallback, useRef, useEffect } from 'react'
import { TextBlock } from '@/types/text'
import paperSizes from '@/data/paper-sizes.json'
import { ZoomIn, ZoomOut, RotateCcw, Type } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDragAndDrop } from '@/hooks/useDragAndDrop'

interface StageProps {
  backgroundColor: string
  fontFamily: string
  fontSize: number
  fontStyle: string
  pageSize: string
  textBlocks: TextBlock[]
  onTextBlockUpdate: (block: TextBlock) => void
  onTextBlockSelect: (id: string | null) => void
  onAddTextBlock: () => void
}

export function Stage({
  backgroundColor,
  fontFamily,
  fontSize,
  fontStyle,
  pageSize,
  textBlocks,
  onTextBlockUpdate,
  onTextBlockSelect,
  onAddTextBlock
}: StageProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [selectedText, setSelectedText] = useState<string | null>(null)
  const [editingText, setEditingText] = useState<string | null>(null)

  const {
    state: { isDragging, position },
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    setPosition
  } = useDragAndDrop(scale, onTextBlockUpdate)

  // Finde die Seitengröße aus der JSON-Datei
  const posterSize = [
    ...paperSizes.poster.portrait,
    ...paperSizes.poster.landscape
  ].find(size => size.id === pageSize)

  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    if (e.ctrlKey) {
      e.preventDefault()
      e.stopPropagation()
      
      const scaleFactor = 0.05
      const delta = e.deltaY < 0 ? scaleFactor : -scaleFactor
      
      setScale(prevScale => {
        const newScale = Math.min(5, Math.max(0.1, prevScale + delta))
        return Number(newScale.toFixed(2))
      })
    }
  }, [])

  useEffect(() => {
    const preventDefault = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault()
      }
    }

    // Event-Listener für das Dokument hinzufügen
    document.addEventListener('wheel', preventDefault, { passive: false })

    // Aufräumen beim Unmount
    return () => {
      document.removeEventListener('wheel', preventDefault)
    }
  }, [])

  const handleZoomIn = useCallback(() => {
    setScale(prevScale => Math.min(5, prevScale + 0.1))
  }, [])

  const handleZoomOut = useCallback(() => {
    setScale(prevScale => Math.max(0.1, prevScale - 0.1))
  }, [])

  const handleResetView = useCallback(() => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }, [])

  const handleTextDoubleClick = useCallback((id: string) => {
    setEditingText(id)
  }, [])

  const handleTextChange = useCallback((id: string, newText: string) => {
    const block = textBlocks.find(b => b.id === id)
    if (block) {
      onTextBlockUpdate({ ...block, text: newText })
    }
  }, [textBlocks, onTextBlockUpdate])

  useEffect(() => {
    if (selectedText) {
      const block = textBlocks.find(b => b.id === selectedText)
      if (block && block.fontSize !== fontSize) {
        onTextBlockUpdate({
          ...block,
          fontSize
        })
      }
    }
  }, [selectedText, fontSize, textBlocks, onTextBlockUpdate])

  return (
    <div className="relative h-full flex">
      <div 
        className="flex-1 relative overflow-hidden bg-gray-100"
        onWheel={handleWheel}
        onMouseDown={(e) => handleMouseDown(e, null)}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        ref={stageRef}
        style={{ touchAction: 'none' }}
      >
        <div 
          className="absolute left-1/2 top-1/2 origin-center"
          style={{
            transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px) scale(${scale})`,
            width: posterSize?.width || 500,
            height: posterSize?.height || 700,
            backgroundColor,
            transition: isDragging ? 'none' : 'transform 0.1s ease-out'
          }}
        >
          {/* Raster im Hintergrund */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          />

          {/* Textblöcke */}
          {textBlocks.map(block => (
            <div
              key={block.id}
              className={`absolute cursor-move ${block.selected ? 'ring-2 ring-blue-500' : ''}`}
              style={{
                position: 'absolute',
                left: `${block.x}px`,
                top: `${block.y}px`,
                color: block.color || '#000000',
                fontFamily: block.fontFamily,
                fontSize: `${block.fontSize}px`,
                fontStyle: block.fontStyle,
                userSelect: 'none',
                transform: 'translate(-50%, -50%)',
                whiteSpace: 'nowrap',
                pointerEvents: 'auto'
              }}
              onMouseDown={(e) => {
                handleMouseDown(e, block)
                onTextBlockSelect(block.id)
                setSelectedText(block.id)
              }}
              onDoubleClick={() => handleTextDoubleClick(block.id)}
            >
              {editingText === block.id ? (
                <input
                  type="text"
                  value={block.text}
                  onChange={(e) => handleTextChange(block.id, e.target.value)}
                  onBlur={() => setEditingText(null)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setEditingText(null)
                    }
                  }}
                  className="bg-transparent border-none outline-none text-center"
                  style={{
                    fontFamily: block.fontFamily,
                    fontSize: `${block.fontSize}px`,
                    fontStyle: block.fontStyle,
                    color: block.color || '#000000'
                  }}
                  autoFocus
                />
              ) : (
                block.text
              )}
            </div>
          ))}
        </div>

        {/* Zoom-Indikator */}
        <div className="fixed bottom-4 right-4 bg-white/80 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
          {Math.round(scale * 100)}%
        </div>
      </div>

      {/* !!! WICHTIG: Diese Skalierungsleiste ist essentiell für die Zoom-Funktionalität !!! */}
      {/* !!! Sie darf NICHT gelöscht oder verändert werden !!! */}
      {/* Skalierungsleiste */}
      <div className="w-16 bg-white p-4 border-l flex flex-col items-center space-y-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleZoomIn}
          className="w-8 h-8"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>

        <div className="text-sm font-medium">
          {Math.round(scale * 100)}%
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleZoomOut}
          className="w-8 h-8"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleResetView}
          className="w-8 h-8"
          title="Ansicht zurücksetzen"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onAddTextBlock}
          className="w-8 h-8"
          title="Text hinzufügen"
        >
          <Type className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
