// !!! WICHTIG: Diese Datei ist die Hauptseite der Anwendung und darf nicht gelöscht werden !!!
// !!! Sie enthält die Hauptkomponenten und deren Zustandsverwaltung !!!

'use client'

import { useState, useCallback, useRef } from 'react'
import { Stage } from '@/components/Stage'
import { Toolbar } from '@/components/Toolbar'
import { TextBlock } from '@/types/text'
import paperSizes from '@/data/paper-sizes.json'

export default function Home() {
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')
  const [fontFamily, setFontFamily] = useState('Inter')
  const [fontSize, setFontSize] = useState(12)
  const [fontStyle, setFontStyle] = useState('normal')
  const [pageSize, setPageSize] = useState('p1')
  const [stageWidth, setStageWidth] = useState(70)
  const [textBlocks, setTextBlocks] = useState<TextBlock[]>([])
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)
  const [isResizing, setIsResizing] = useState(false)
  const resizeStartX = useRef(0)
  const resizeStartWidth = useRef(0)

  const handleTextBlockUpdate = useCallback((updatedBlock: TextBlock) => {
    setTextBlocks(prev => prev.map(block => 
      block.id === updatedBlock.id ? updatedBlock : block
    ))
  }, [])

  const handleTextBlockSelect = useCallback((id: string | null) => {
    setSelectedBlockId(id)
    setTextBlocks(prev => prev.map(block => ({
      ...block,
      selected: block.id === id
    })))
  }, [])

  const handleAddTextBlock = useCallback(() => {
    // Finde die korrekte Papiergröße aus der paper-sizes.json
    const allPaperSizes = [...paperSizes.poster.portrait, ...paperSizes.poster.landscape]
    const currentSize = allPaperSizes.find(size => size.id === pageSize) || paperSizes.poster.portrait[0]
    
    // Standard-Größen für den Textblock
    const blockWidth = 100
    const blockHeight = 30
    
    // Berechne die Mitte des Blattes
    // Da der Text mit transform: translate(-50%, -50%) zentriert wird,
    // müssen wir keine zusätzliche Verschiebung für die Textblock-Größe berechnen
    const centerX = currentSize.width / 2
    const centerY = currentSize.height / 2
    
    const newBlock: TextBlock = {
      id: `text-${Date.now()}`,
      text: 'Neuer Text',
      x: centerX,
      y: centerY,
      fontSize,
      fontFamily,
      fontStyle,
      color: '#000000',
      selected: true,
      width: blockWidth,
      height: blockHeight
    }
    
    setTextBlocks(prev => [...prev.map(b => ({ ...b, selected: false })), newBlock])
    setSelectedBlockId(newBlock.id)
  }, [fontSize, fontFamily, fontStyle, pageSize])

  const handleDeleteTextBlock = useCallback((id: string) => {
    setTextBlocks(prev => prev.filter(block => block.id !== id))
    if (selectedBlockId === id) {
      setSelectedBlockId(null)
    }
  }, [selectedBlockId])

  // Splitter-Funktionalität
  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    setIsResizing(true)
    resizeStartX.current = e.clientX
    resizeStartWidth.current = stageWidth
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }, [])

  const handleResizeMove = useCallback((e: React.MouseEvent) => {
    if (!isResizing) return

    const delta = e.clientX - resizeStartX.current
    const containerWidth = window.innerWidth
    const deltaPercent = (delta / containerWidth) * 100
    const newWidth = Math.min(Math.max(20, resizeStartWidth.current + deltaPercent), 80)
    
    setStageWidth(newWidth)
  }, [isResizing])

  const handleResizeEnd = useCallback(() => {
    setIsResizing(false)
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  }, [])

  return (
    <div 
      className="flex h-screen relative"
      onMouseMove={handleResizeMove}
      onMouseUp={handleResizeEnd}
      onMouseLeave={handleResizeEnd}
    >
      {/* Bühnenbereich */}
      <div style={{ width: `${stageWidth}%` }} className="h-full">
        <Stage
          backgroundColor={backgroundColor}
          fontFamily={fontFamily}
          fontSize={fontSize}
          fontStyle={fontStyle}
          pageSize={pageSize}
          textBlocks={textBlocks}
          onTextBlockUpdate={handleTextBlockUpdate}
          onTextBlockSelect={handleTextBlockSelect}
        />
      </div>

      {/* Vertikaler Splitter */}
      <div
        className="w-1 bg-gray-200 hover:bg-gray-300 cursor-col-resize relative group"
        onMouseDown={handleResizeStart}
      >
        <div className="absolute inset-y-0 -left-2 right-0 group-hover:bg-gray-300/50" />
      </div>

      {/* Werkzeugbereich */}
      <div style={{ width: `${100 - stageWidth}%` }} className="h-full flex flex-col">
        <Toolbar
          backgroundColor={backgroundColor}
          setBackgroundColor={setBackgroundColor}
          fontFamily={fontFamily}
          setFontFamily={setFontFamily}
          fontSize={fontSize}
          setFontSize={setFontSize}
          fontStyle={fontStyle}
          setFontStyle={setFontStyle}
          pageSize={pageSize}
          setPageSize={setPageSize}
          selectedBlockId={selectedBlockId}
          textBlocks={textBlocks}
          onTextBlockUpdate={handleTextBlockUpdate}
          onAddTextBlock={handleAddTextBlock}
          onDeleteTextBlock={handleDeleteTextBlock}
        />

        {/* Layer-Bereich */}
        <div className="bg-white border-t p-4 overflow-y-auto">
          <div className="text-sm font-medium mb-2">Textebenen</div>
          <div className="space-y-1">
            {textBlocks.map((block, index) => (
              <div
                key={block.id}
                className={`flex items-center p-2 rounded cursor-pointer ${
                  block.selected ? 'bg-blue-50 ring-1 ring-blue-500' : 'hover:bg-gray-50'
                }`}
                onClick={() => handleTextBlockSelect(block.id)}
              >
                <div className="flex-1 truncate">
                  <span className="text-gray-500 mr-2">{textBlocks.length - index}.</span>
                  {block.text || 'Leerer Text'}
                </div>
                <button
                  className="ml-2 text-gray-400 hover:text-red-500"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteTextBlock(block.id)
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
