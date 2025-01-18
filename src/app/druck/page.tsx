'use client'

// !!! WICHTIG: Diese Komponente ist essentiell für die Anwendung und darf nicht gelöscht werden !!!
// !!! Sie enthält die Hauptlogik für die PDF-Vorschau und Textbearbeitung !!!
// !!! Die initiale Schriftgröße von 35 und die Schrittweite von 10 dürfen NICHT geändert werden !!!

import { useState, useCallback, useRef, useEffect } from 'react'
import { Stage } from '../../components/Stage'
import { Toolbar } from '../../components/Toolbar'
import { LayerPanel } from '../../components/LayerPanel'
import { TextBlock } from '../../types/text'
import paperSizes from '../../data/paper-sizes.json'
import { v4 as uuidv4 } from 'uuid'
import { PrintMenubar } from '../../components/PrintMenubar'

interface ProjectData {
  version: string
  pageSize: string
  backgroundColor: string
  textBlocks: TextBlock[]
}

export default function DruckPage() {
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')
  const [fontFamily, setFontFamily] = useState('Inter')
  const [fontSize, setFontSize] = useState(35)
  const [fontStyle, setFontStyle] = useState('normal')
  const [fontWeight, setFontWeight] = useState(400)
  const [pageSize, setPageSize] = useState('p1')
  const [stageWidth, setStageWidth] = useState(25) // rechter Bereich 25%
  const [layerPanelHeight, setLayerPanelHeight] = useState(10) // in vh
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
    const newBlock: TextBlock = {
      id: uuidv4(),
      text: 'Neuer Text',
      x: 50,
      y: 50,
      color: '#FFCCE7',
      fontFamily,
      fontSize,
      fontWeight,
      fontStyle,
      width: 100,
      height: 30,
      zIndex: textBlocks.length,
      textAlign: 'center',
      lineHeight: 1.2,
      letterSpacing: 0,
      multiline: false,
      visible: true,
      selected: true
    }
    // Deselektiere alle anderen Blöcke und füge den neuen Block hinzu
    setTextBlocks([...textBlocks.map(block => ({ ...block, selected: false })), newBlock])
    // Setze den selectedBlockId auf die ID des neuen Blocks
    setSelectedBlockId(newBlock.id)
  }, [textBlocks, fontFamily, fontSize, fontWeight, fontStyle])

  const handleDeleteTextBlock = useCallback((id: string) => {
    setTextBlocks(prev => prev.filter(block => block.id !== id))
    setSelectedBlockId(null)
  }, [])

  const handleGeneratePDF = useCallback(() => {
    // Implement PDF generation logic here
  }, [])

  const handleLoadProject = useCallback((data: ProjectData) => {
    setBackgroundColor(data.backgroundColor)
    setPageSize(data.pageSize)
    setTextBlocks(data.textBlocks)
  }, [])

  // Aktualisiere die Schriftart für den ausgewählten Block
  useEffect(() => {
    if (selectedBlockId) {
      setTextBlocks(prev => prev.map(block => 
        block.id === selectedBlockId
          ? { ...block, fontFamily }
          : block
      ))
    }
  }, [fontFamily, selectedBlockId])

  // Aktualisiere die Schriftgröße für den ausgewählten Block
  useEffect(() => {
    if (selectedBlockId) {
      setTextBlocks(prev => prev.map(block => 
        block.id === selectedBlockId
          ? { ...block, fontSize }
          : block
      ))
    }
  }, [fontSize, selectedBlockId])

  // Aktualisiere den Schriftstil für den ausgewählten Block
  useEffect(() => {
    if (selectedBlockId) {
      setTextBlocks(prev => prev.map(block => 
        block.id === selectedBlockId
          ? { ...block, fontStyle }
          : block
      ))
    }
  }, [fontStyle, selectedBlockId])

  // Aktualisiere das Schriftgewicht für den ausgewählten Block
  useEffect(() => {
    if (selectedBlockId) {
      setTextBlocks(prev => prev.map(block => 
        block.id === selectedBlockId
          ? { ...block, fontWeight: String(fontWeight) }
          : block
      ))
    }
  }, [fontWeight, selectedBlockId])

  return (
    <div className="flex h-screen">
      <div className="relative flex flex-col" style={{ width: `${100 - stageWidth}%` }}>
        <div className="sticky top-0 z-50 bg-background border-b">
          <PrintMenubar 
            backgroundColor={backgroundColor}
            pageSize={pageSize}
            textBlocks={textBlocks}
            onGeneratePDF={handleGeneratePDF}
            onLoadProject={handleLoadProject}
          />
        </div>
        <Stage
          backgroundColor={backgroundColor}
          onBackgroundColorChange={setBackgroundColor}
          fontFamily={fontFamily}
          fontSize={fontSize}
          fontStyle={fontStyle}
          fontWeight={fontWeight}
          pageSize={pageSize}
          textBlocks={textBlocks}
          onTextBlockUpdate={handleTextBlockUpdate}
          onTextBlockSelect={handleTextBlockSelect}
          onAddTextBlock={handleAddTextBlock}
          onDeleteBlock={handleDeleteTextBlock}
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
            selectedBlockId={selectedBlockId}
            textBlocks={textBlocks}
            onAddTextBlock={handleAddTextBlock}
            onDeleteTextBlock={handleDeleteTextBlock}
            onTextBlockUpdate={handleTextBlockUpdate}
            fontFamily={fontFamily}
            setFontFamily={setFontFamily}
            fontSize={fontSize}
            setFontSize={setFontSize}
            fontStyle={fontStyle}
            setFontStyle={setFontStyle}
            fontWeight={fontWeight}
            setFontWeight={setFontWeight}
            pageSize={pageSize}
            setPageSize={setPageSize}
            backgroundColor={backgroundColor}
            setBackgroundColor={setBackgroundColor}
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
                onTextBlockUpdate={handleTextBlockUpdate}
                onDeleteBlock={handleDeleteTextBlock}
                onReorderBlocks={setTextBlocks}
                selectedBlockId={selectedBlockId}
                onBlockSelect={setSelectedBlockId}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
