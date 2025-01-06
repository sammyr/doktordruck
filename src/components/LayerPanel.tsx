'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { TextBlock } from '@/types/text'
import { Card } from './ui/card'
import { Input } from './ui/input'

interface LayerPanelProps {
  textBlocks: TextBlock[]
  onTextBlockSelect: (id: string | null) => void
  onDeleteTextBlock: (id: string) => void
  onTextBlockUpdate?: (block: TextBlock) => void
}

export function LayerPanel({ 
  textBlocks, 
  onTextBlockSelect, 
  onDeleteTextBlock,
  onTextBlockUpdate 
}: LayerPanelProps) {
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [dragOverId, setDragOverId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDragStart = useCallback((e: React.DragEvent, id: string) => {
    setDraggingId(id)
    e.dataTransfer.effectAllowed = 'move'
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent, id: string) => {
    e.preventDefault()
    setDragOverId(id)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent, targetId: string) => {
    e.preventDefault()
    if (!draggingId || draggingId === targetId) return

    const sourceIndex = textBlocks.findIndex(block => block.id === draggingId)
    const targetIndex = textBlocks.findIndex(block => block.id === targetId)
    
    if (sourceIndex === -1 || targetIndex === -1) return

    const newBlocks = [...textBlocks]
    const [movedBlock] = newBlocks.splice(sourceIndex, 1)
    newBlocks.splice(targetIndex, 0, movedBlock)
    
    newBlocks.forEach((block, index) => {
      if (onTextBlockUpdate) {
        onTextBlockUpdate({
          ...block,
          zIndex: newBlocks.length - index
        })
      }
    })

    setDraggingId(null)
    setDragOverId(null)
  }, [draggingId, textBlocks, onTextBlockUpdate])

  const handleDragEnd = useCallback(() => {
    setDraggingId(null)
    setDragOverId(null)
  }, [])

  const startEditing = useCallback((block: TextBlock) => {
    setEditingId(block.id)
    setEditText(block.text || '')
  }, [])

  const handleDoubleClick = useCallback((e: React.MouseEvent, block: TextBlock) => {
    e.stopPropagation()
    startEditing(block)
  }, [startEditing])

  const handleKeyDown = useCallback((e: React.KeyboardEvent, block: TextBlock) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (onTextBlockUpdate && editingId) {
        onTextBlockUpdate({
          ...block,
          text: editText
        })
        setEditingId(null)
      }
    } else if (e.key === 'Escape') {
      setEditingId(null)
    }
  }, [editingId, editText, onTextBlockUpdate])

  useEffect(() => {
    if (editingId && inputRef.current) {
      inputRef.current.focus()
    }
  }, [editingId])

  return (
    <div className="bg-white border-t p-4 overflow-y-auto">
      <div className="text-sm font-semibold mb-4 text-gray-700">Textebenen</div>
      <div className="space-y-2">
        {textBlocks.map((block, index) => (
          <div
            key={block.id}
            draggable={!editingId}
            onDragStart={(e) => handleDragStart(e, block.id)}
            onDragOver={(e) => handleDragOver(e, block.id)}
            onDrop={(e) => handleDrop(e, block.id)}
            onDragEnd={handleDragEnd}
            onDoubleClick={(e) => handleDoubleClick(e, block)}
            className={`
              flex items-center p-2 rounded-lg cursor-move select-none
              ${block.selected ? 'bg-blue-50 ring-1 ring-blue-500' : 'hover:bg-gray-50'}
              ${dragOverId === block.id ? 'border-2 border-blue-500' : 'border border-gray-200'}
              ${editingId === block.id ? 'cursor-text' : ''}
              relative group transition-all duration-150
            `}
            onClick={() => !editingId && onTextBlockSelect(block.id)}
          >
            <div className="flex items-center gap-2 w-full min-h-[32px]">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 group-hover:bg-blue-500/20 rounded-r" />
              <span className="text-gray-400 text-sm font-medium w-6 text-right">
                {textBlocks.length - index}.
              </span>
              {editingId === block.id ? (
                <Input
                  ref={inputRef}
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, block)}
                  onBlur={() => {
                    if (onTextBlockUpdate) {
                      onTextBlockUpdate({
                        ...block,
                        text: editText
                      })
                      setEditingId(null)
                    }
                  }}
                  className="flex-1 h-7 min-w-0"
                />
              ) : (
                <span className="flex-1 truncate text-gray-700">
                  {block.text || 'Leerer Text'}
                </span>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDeleteTextBlock(block.id)
                }}
                className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity duration-150"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
      {textBlocks.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          Keine Textebenen vorhanden
        </div>
      )}
    </div>
  )
}
