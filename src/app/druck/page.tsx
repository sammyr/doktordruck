'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { Stage } from '@/components/Stage'
import { Toolbar } from '@/components/Toolbar'
import { LayerPanel } from '@/components/LayerPanel'
import { TextBlock } from '@/types/text'
import paperSizes from '@/data/paper-sizes.json'

export default function DruckPage() {
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')
  const [fontFamily, setFontFamily] = useState('Inter')
  const [fontSize, setFontSize] = useState(12)
  const [fontStyle, setFontStyle] = useState('normal')
  const [pageSize, setPageSize] = useState('p1')
  const [stageWidth, setStageWidth] = useState(25) // rechter Bereich 25%
  const [layerPanelHeight, setLayerPanelHeight] = useState(40) // in vh
  const [textBlocks, setTextBlocks] = useState<TextBlock[]>([])
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)
  const [isResizing, setIsResizing] = useState(false)
  const [isResizingVertical, setIsResizingVertical] = useState(false)
  const resizeStartX = useRef(0)
  const resizeStartY = useRef(0)
  const resizeStartWidth = useRef(0)
  const resizeStartHeight = useRef(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true)
    resizeStartX.current = e.clientX
    resizeStartWidth.current = stageWidth
  }

  const handleVerticalMouseDown = (e: React.MouseEvent) => {
    setIsResizingVertical(true)
    resizeStartY.current = e.clientY
    resizeStartHeight.current = layerPanelHeight
  }

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing && !isResizingVertical) return
    
    if (isResizing) {
      const containerWidth = window.innerWidth
      const mouseX = e.clientX
      const percentage = ((containerWidth - mouseX) / containerWidth) * 100
      const newWidth = Math.min(Math.max(20, percentage), 80)
      setStageWidth(Math.round(newWidth * 10) / 10)
    }

    if (isResizingVertical) {
      const containerHeight = window.innerHeight
      const mouseY = e.clientY
      const percentage = ((containerHeight - mouseY) / containerHeight) * 100
      const newHeight = Math.min(Math.max(20, percentage), 80)
      setLayerPanelHeight(Math.round(newHeight * 10) / 10)
    }
  }, [isResizing, isResizingVertical])

  const handleMouseUp = useCallback(() => {
    setIsResizing(false)
    setIsResizingVertical(false)
  }, [])

  useEffect(() => {
    if (isResizing || isResizingVertical) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing, isResizingVertical, handleMouseMove, handleMouseUp])

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
    const allPaperSizes = [...paperSizes.poster.portrait, ...paperSizes.poster.landscape]
    const currentSize = allPaperSizes.find(size => size.id === pageSize) || paperSizes.poster.portrait[0]
    
    const blockWidth = 100
    const blockHeight = 30
    
    const newBlock: TextBlock = {
      id: `text-${Date.now()}`,
      text: 'Neuer Text',
      x: (currentSize.width / 2),
      y: (currentSize.height / 2),
      fontSize,
      fontFamily,
      color: '#000000',
      selected: false,
      width: blockWidth,
      height: blockHeight
    }
    
    setTextBlocks(prev => [...prev, newBlock])
  }, [pageSize, fontSize, fontFamily])

  const handleDeleteTextBlock = useCallback((id: string) => {
    setTextBlocks(prev => prev.filter(block => block.id !== id))
    setSelectedBlockId(null)
  }, [])

  return (
    <div className="flex h-screen">
      <div className="relative" style={{ width: `${100 - stageWidth}%` }}>
        <Stage
          backgroundColor={backgroundColor}
          fontFamily={fontFamily}
          fontSize={fontSize}
          fontStyle={fontStyle}
          pageSize={pageSize}
          textBlocks={textBlocks}
          onTextBlockUpdate={handleTextBlockUpdate}
          onTextBlockSelect={handleTextBlockSelect}
          onAddTextBlock={handleAddTextBlock}
        />
      </div>
      <div className="flex relative" style={{ width: `${stageWidth}%` }}>
        <div 
          className="absolute left-[-4px] top-0 h-full w-2 cursor-ew-resize group z-50"
          onMouseDown={handleMouseDown}
        >
          <div className="absolute left-[3px] top-0 h-full w-[2px] bg-gray-300 group-hover:bg-gray-400" />
          <div className="absolute left-[0px] top-1/2 -translate-y-1/2 w-[8px] h-[80px] rounded-sm bg-gray-300 group-hover:bg-gray-400" />
        </div>
        <div className="flex flex-col w-full">
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
            onAddTextBlock={handleAddTextBlock}
            onDeleteTextBlock={handleDeleteTextBlock}
            onTextBlockUpdate={handleTextBlockUpdate}
          />
          <div className="relative flex-1">
            <div 
              className="absolute top-[-4px] left-0 right-0 h-2 cursor-ns-resize group z-50"
              onMouseDown={handleVerticalMouseDown}
            >
              <div className="absolute top-[3px] left-0 right-0 h-[2px] bg-gray-300 group-hover:bg-gray-400" />
              <div className="absolute top-[0px] left-1/2 -translate-x-1/2 h-[8px] w-[80px] rounded-sm bg-gray-300 group-hover:bg-gray-400" />
            </div>
            <div style={{ height: `${layerPanelHeight}vh` }}>
              <LayerPanel
                textBlocks={textBlocks}
                onTextBlockSelect={handleTextBlockSelect}
                onDeleteTextBlock={handleDeleteTextBlock}
                onTextBlockUpdate={handleTextBlockUpdate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
