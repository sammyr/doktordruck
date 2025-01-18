// !!! WICHTIG: Diese Komponente ist essentiell für die Anwendung und darf nicht gelöscht werden !!!
// !!! Sie enthält die Hauptbühne für die PDF-Vorschau und Textbearbeitung !!!
// !!! Die graue Skalierungsleiste auf der rechten Seite ist ein wichtiger Bestandteil der Benutzeroberfläche !!!
// !!! Sie darf NICHT gelöscht oder verschoben werden, da sie für die Zoom-Funktionalität benötigt wird !!!

import React, { useState, useCallback, useRef, useEffect } from 'react'
import type { TextBlock } from '@/types/text'
import paperSizes from '@/data/paper-sizes.json'
import { ZoomIn, ZoomOut, Grid as GridIcon, Ruler as RulerIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Ruler } from '@/components/ui/ruler'
import { Grid } from '@/components/ui/grid'
import { useDragAndDrop } from '@/hooks/useDragAndDrop'
import { stageSettings } from '@/config/settings'

interface StageProps {
  backgroundColor: string
  onBackgroundColorChange: (color: string) => void
  textBlocks: TextBlock[]
  onTextBlockUpdate: (block: TextBlock) => void
  onTextBlockSelect: (id: string) => void
  onAddTextBlock: () => void
  fontFamily: string
  fontSize: number
  fontStyle: string
  fontWeight: number
  pageSize: string
}

export function Stage({
  backgroundColor,
  onBackgroundColorChange,
  textBlocks,
  onTextBlockUpdate,
  onTextBlockSelect,
  onAddTextBlock,
  fontFamily,
  fontSize,
  fontStyle,
  fontWeight,
  pageSize
}: StageProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState<number>(1.8)
  const [selectedText, setSelectedText] = useState<string | null>(null)
  const [editingText, setEditingText] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [activeBlock, setActiveBlock] = useState<TextBlock | null>(null)
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 })
  const [elementStartPos, setElementStartPos] = useState({ x: 0, y: 0 })
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [showCenterGuide, setShowCenterGuide] = useState(false)
  const [guidePosition, setGuidePosition] = useState<{ x: number, y: number } | null>(null)
  const [showGrid, setShowGrid] = useState(false)
  const [showRuler, setShowRuler] = useState(false)

  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault()
    
    // Wenn mittlere Maustaste gedrückt ist, verschieben statt zoomen
    if (isDragging) {
      return
    }
    
    const baseStep = stageSettings.zoom.step
    const speedMultiplier = stageSettings.zoom.speed.wheel
    const delta = e.deltaY < 0 ? baseStep * speedMultiplier : -baseStep * speedMultiplier
    
    setScale(prevScale => {
      const newScale = Math.min(stageSettings.zoom.max, Math.max(stageSettings.zoom.min, prevScale + delta))
      return Number(newScale.toFixed(2))
    })
  }, [isDragging])

  useEffect(() => {
    const preventDefault = (e: WheelEvent) => {
      e.preventDefault()
    }

    document.addEventListener('wheel', preventDefault, { passive: false })

    return () => {
      document.removeEventListener('wheel', preventDefault)
    }
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent, block: TextBlock | null) => {
    if (e.button === 1) { // Mittlere Maustaste
      e.preventDefault()
      setIsDragging(true)
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    } else if (block) {
      setActiveBlock(block)
      setDragStartPos({ x: e.clientX, y: e.clientY })
      setElementStartPos({ x: block.x, y: block.y })
    }
  }, [position])

  const snapToGrid = useCallback((value: number) => {
    const gridSize = stageSettings.dragAndDrop.grid.size
    return Math.round(value / gridSize) * gridSize
  }, [])

  const checkCenterGuide = useCallback((x: number, y: number, block: TextBlock) => {
    const threshold = stageSettings.dragAndDrop.grid.snapThreshold / scale
    const centerX = 50 // Mitte horizontal
    const centerY = 50 // Mitte vertikal
    
    // Berechne die Textbox-Dimensionen
    const textElement = document.createElement('span')
    textElement.style.fontFamily = block.fontFamily
    textElement.style.fontSize = `${block.fontSize}px`
    textElement.style.fontWeight = String(block.fontWeight)
    textElement.style.fontStyle = block.fontStyle || 'normal'
    textElement.innerText = block.text
    document.body.appendChild(textElement)
    
    // Hole die Breite und Höhe der Textbox
    const textWidth = textElement.offsetWidth
    const textHeight = textElement.offsetHeight
    document.body.removeChild(textElement)
    
    // Konvertiere die Pixel-Dimensionen in Prozent der Stage
    const stageElement = stageRef.current
    if (!stageElement) return { x, y }
    
    const stageRect = stageElement.getBoundingClientRect()
    const textWidthPercent = (textWidth / stageRect.width) * 100
    const textHeightPercent = (textHeight / stageRect.height) * 100
    
    // Berechne die Ränder der Textbox
    const leftEdge = x - textWidthPercent / 2
    const rightEdge = x + textWidthPercent / 2
    const topEdge = y - textHeightPercent / 2
    const bottomEdge = y + textHeightPercent / 2
    
    // Prüfe, ob eine der Kanten nahe der Mitte ist
    const showX = Math.abs(leftEdge - centerX) < threshold || 
                 Math.abs(rightEdge - centerX) < threshold ||
                 Math.abs(x - centerX) < threshold
    
    const showY = Math.abs(topEdge - centerY) < threshold ||
                 Math.abs(bottomEdge - centerY) < threshold ||
                 Math.abs(y - centerY) < threshold
    
    setShowCenterGuide(showX || showY)
    
    // Berechne die eingerastete Position
    let snappedX = x
    let snappedY = y
    
    if (showX) {
      if (Math.abs(leftEdge - centerX) < threshold) {
        snappedX = centerX + textWidthPercent / 2
      } else if (Math.abs(rightEdge - centerX) < threshold) {
        snappedX = centerX - textWidthPercent / 2
      } else if (Math.abs(x - centerX) < threshold) {
        snappedX = centerX
      }
    }
    
    if (showY) {
      if (Math.abs(topEdge - centerY) < threshold) {
        snappedY = centerY + textHeightPercent / 2
      } else if (Math.abs(bottomEdge - centerY) < threshold) {
        snappedY = centerY - textHeightPercent / 2
      } else if (Math.abs(y - centerY) < threshold) {
        snappedY = centerY
      }
    }
    
    setGuidePosition({ 
      x: showX ? centerX : null,
      y: showY ? centerY : null
    })
    
    return {
      x: snappedX,
      y: snappedY
    }
  }, [scale, stageRef])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault()
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    } else if (activeBlock && onTextBlockUpdate) {
      e.preventDefault()
      const deltaX = (e.clientX - dragStartPos.x)
      const deltaY = (e.clientY - dragStartPos.y)
      
      // Berechne die neue Position
      let newX = elementStartPos.x + deltaX * stageSettings.dragAndDrop.textBlockSpeed / scale
      let newY = elementStartPos.y + deltaY * stageSettings.dragAndDrop.textBlockSpeed / scale
      
      // Rasten am Raster ein
      newX = snapToGrid(newX)
      newY = snapToGrid(newY)
      
      // Überprüfe und aktualisiere Hilfslinien
      const snappedPos = checkCenterGuide(newX, newY, activeBlock)
      
      onTextBlockUpdate({
        ...activeBlock,
        x: snappedPos.x,
        y: snappedPos.y
      })
    }
  }, [isDragging, dragStart, activeBlock, dragStartPos, elementStartPos, scale, onTextBlockUpdate, snapToGrid, checkCenterGuide])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    setActiveBlock(null)
    setShowCenterGuide(false)
    setGuidePosition(null)
  }, [])

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

  const handleZoomIn = useCallback(() => {
    setScale(prevScale => Math.min(stageSettings.zoom.max, prevScale + stageSettings.zoom.buttonStep))
  }, [])

  const handleZoomOut = useCallback(() => {
    setScale(prevScale => Math.max(stageSettings.zoom.min, prevScale - stageSettings.zoom.buttonStep))
  }, [])

  const handleResetView = useCallback(() => {
    setScale(stageSettings.zoom.initial)
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

  // Funktion zum Konvertieren von Pixeln in Millimeter basierend auf der DPI
  const pxToMm = useCallback((px: number) => {
    const dpi = 96 // Standard-Bildschirm-DPI
    return (px * 25.4) / dpi // 25.4mm = 1 inch
  }, [])

  // Funktion zum Erstellen der Lineal-Markierungen
  const generateRulerMarks = useCallback((length: number, isHorizontal: boolean) => {
    const marks = []
    const step = 10 // 10mm Hauptmarkierungen
    const smallStep = 1 // 1mm kleine Markierungen
    const maxValue = Math.ceil(length) // Runde auf zur nächsten ganzen Zahl
    
    // Füge alle Markierungen hinzu
    for (let i = 0; i <= maxValue; i += smallStep) {
      const position = `${(i / maxValue) * 100}%`
      const isMainMark = i % step === 0
      const isLastMark = i === maxValue
      
      // Füge Markierungslinie hinzu
      if (isMainMark || isLastMark) {
        marks.push(
          <div
            key={i}
            className={`absolute bg-gray-400 ${isHorizontal ? 'top-0' : 'left-0'}`}
            style={{
              [isHorizontal ? 'left' : 'top']: position,
              [isHorizontal ? 'height' : 'width']: isMainMark ? '6px' : '3px',
              [isHorizontal ? 'width' : 'height']: '0.5px'
            }}
          />
        )
        
        // Füge Beschriftung hinzu
        marks.push(
          <div
            key={`label-${i}`}
            className={`absolute text-[4px] text-gray-500 ${
              isHorizontal ? 'top-2' : 'left-2'
            } transform ${isHorizontal ? '-translate-x-1/2' : '-translate-y-1/2'}`}
            style={{
              [isHorizontal ? 'left' : 'top']: position
            }}
          >
            {i}
          </div>
        )
      } else {
        // Kleine Markierungen
        marks.push(
          <div
            key={i}
            className={`absolute bg-gray-400 ${isHorizontal ? 'top-0' : 'left-0'}`}
            style={{
              [isHorizontal ? 'left' : 'top']: position,
              [isHorizontal ? 'height' : 'width']: '3px',
              [isHorizontal ? 'width' : 'height']: '0.5px'
            }}
          />
        )
      }
    }
    return marks
  }, [])

  // Berechne die Gittergröße in Prozent basierend auf der Dokumentbreite/-höhe
  const calculateGridSize = useCallback((size: number) => {
    // 10mm Gitterabstand
    return (10 / size) * 100 + '%'
  }, [])

  // Finde die Seitengröße aus der JSON-Datei
  const posterSize = [
    ...paperSizes.poster.portrait,
    ...paperSizes.poster.landscape
  ].find(size => size.id === pageSize) 

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
        style={{ 
          touchAction: 'none',
          cursor: isDragging ? stageSettings.cursors.stage.panning : stageSettings.cursors.stage.default
        }}
      >
        <div 
          className="absolute left-1/2 top-1/2 origin-center bg-white shadow-[0_0_1px_rgba(0,0,0,0.4)]"
          style={{
            transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px) scale(${scale})`,
            width: posterSize?.width || 500,
            height: posterSize?.height || 700,
            backgroundColor,
            transition: isDragging ? 'none' : `transform ${stageSettings.dragAndDrop.transitionDuration}ms ease-out`,
            ...(showGrid && Grid({ width: posterSize?.width || 500, height: posterSize?.height || 700, showGrid }))
          }}
        >
          <Ruler 
            width={posterSize?.width || 500}
            height={posterSize?.height || 700}
            showRuler={showRuler}
          />
          {/* Hilfslinien */}
          {showCenterGuide && guidePosition && (
            <>
              {guidePosition.x === 50 && (
                <div 
                  className="absolute top-0 bottom-0 pointer-events-none"
                  style={{
                    left: '50%',
                    width: `${stageSettings.dragAndDrop.guides.thickness}px`,
                    backgroundColor: stageSettings.dragAndDrop.guides.color,
                    opacity: stageSettings.dragAndDrop.guides.opacity,
                    transform: 'translateX(-50%)'
                  }}
                />
              )}
              {guidePosition.y === 50 && (
                <div 
                  className="absolute left-0 right-0 pointer-events-none"
                  style={{
                    top: '50%',
                    height: `${stageSettings.dragAndDrop.guides.thickness}px`,
                    backgroundColor: stageSettings.dragAndDrop.guides.color,
                    opacity: stageSettings.dragAndDrop.guides.opacity,
                    transform: 'translateY(-50%)'
                  }}
                />
              )}
            </>
          )}
          {/* Textblöcke */}
          {textBlocks.map(block => (
            <div
              key={block.id}
              className={`absolute ${
                block.selected ? `ring-2 ring-[${stageSettings.colors.selection}]/${stageSettings.colors.selectionOpacity}` : ''
              }`}
              style={{
                position: 'absolute',
                left: `${block.x}%`,
                top: `${block.y}%`,
                color: block.color,
                fontFamily: block.fontFamily,
                fontSize: `${block.fontSize}px`,
                fontWeight: String(block.fontWeight),
                fontStyle: (block.fontStyle || '').includes('italic') ? 'italic' : 'normal',
                userSelect: 'none',
                transform: 'translate(-50%, -50%)',
                whiteSpace: block.multiline ? 'normal' : 'nowrap',
                width: editingText === block.id ? 
                       `${Math.max(block.width || 20, 30)}%` : // Mindestens 30% beim Bearbeiten
                       (block.multiline ? `${block.width || 20}%` : 'auto'),
                lineHeight: block.lineHeight || 1.2,
                textAlign: (['left', 'right', 'center'].includes(block.textAlign) ? block.textAlign : 'left'),
                letterSpacing: `${block.letterSpacing || 0}px`,
                cursor: editingText === block.id ? stageSettings.cursors.textBlock.editing : stageSettings.cursors.textBlock.default,
                zIndex: block.zIndex,
                padding: editingText === block.id ? '4px' : '0'
              }}
              onMouseDown={(e) => {
                handleMouseDown(e, block)
                onTextBlockSelect(block.id)
                setSelectedText(block.id)
              }}
              onDoubleClick={() => handleTextDoubleClick(block.id)}
            >
              {editingText === block.id ? (
                <textarea
                  value={block.text}
                  onChange={(e) => handleTextChange(block.id, e.target.value)}
                  onBlur={() => setEditingText(null)}
                  autoFocus
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: 'inherit',
                    font: 'inherit',
                    resize: 'none',
                    width: '100%',
                    height: 'auto',
                    minHeight: '1.2em',
                    display: 'block',
                    margin: 0,
                    padding: 0,
                    overflow: 'hidden'
                  }}
                  rows={Math.max((block.text.match(/\n/g) || []).length + 1, 1)}
                  onInput={(e) => {
                    // Automatische Höhenanpassung
                    const target = e.target as HTMLTextAreaElement
                    target.style.height = 'auto'
                    target.style.height = `${target.scrollHeight}px`
                  }}
                />
              ) : (
                block.text.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < block.text.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))
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
      <div className="w-20 bg-white p-4 border-l flex flex-col items-center space-y-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleZoomIn}
          className="w-12 h-12"
        >
          <ZoomIn className="w-6 h-6" />
        </Button>

        <div className="text-sm font-medium">
          {Math.round(scale * 100)}%
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleZoomOut}
          className="w-12 h-12"
        >
          <ZoomOut className="w-6 h-6" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowGrid(!showGrid)}
          className="w-12 h-12"
          title="Gitter anzeigen"
        >
          <GridIcon className="w-6 h-6" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowRuler(!showRuler)}
          className="w-12 h-12"
          title="Lineal anzeigen"
        >
          <RulerIcon className="w-6 h-6" />
        </Button>
      </div>
    </div>
  )
}
