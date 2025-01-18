'use client'

import { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { TextBlock } from '@/types/text'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Grip, Trash2, Eye, EyeOff } from 'lucide-react'

interface LayerPanelProps {
  textBlocks: TextBlock[]
  onTextBlockUpdate: (block: TextBlock) => void
  onDeleteBlock: (id: string) => void
  onReorderBlocks: (blocks: TextBlock[]) => void
  selectedBlockId: string | null
  onBlockSelect: (id: string | null) => void
}

export function LayerPanel({
  textBlocks,
  onTextBlockUpdate,
  onDeleteBlock,
  onReorderBlocks,
  selectedBlockId,
  onBlockSelect
}: LayerPanelProps) {
  const [innerBlocks, setInnerBlocks] = useState<TextBlock[]>(textBlocks)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingText, setEditingText] = useState('')
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    setInnerBlocks(textBlocks)
  }, [textBlocks])

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(innerBlocks)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    onReorderBlocks(items)
    setIsDragging(false)
  }

  const handleDragStart = () => {
    setIsDragging(true)
  }

  const handleDoubleClick = (block: TextBlock) => {
    setEditingId(block.id)
    setEditingText(block.text)
  }

  const handleEditSave = (block: TextBlock) => {
    if (editingText.trim() !== '') {
      onTextBlockUpdate({
        ...block,
        text: editingText
      })
    }
    setEditingId(null)
    setEditingText('')
  }

  const toggleVisibility = (block: TextBlock) => {
    onTextBlockUpdate({
      ...block,
      visible: block.visible === undefined ? false : !block.visible
    })
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold select-none">Ebenen</h2>
      </div>
      
      <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <Droppable droppableId="layers">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="p-2 space-y-2 max-h-[calc(40vh-4rem)] overflow-y-auto"
            >
              {innerBlocks.map((block, index) => (
                <Draggable key={block.id} draggableId={block.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors ${
                        block.visible === false ? 'opacity-50' : ''
                      } ${selectedBlockId === block.id ? 'bg-accent' : ''} ${
                        snapshot.isDragging ? 'opacity-50' : ''
                      } hover:bg-accent/50 cursor-pointer`}
                      onClick={() => onBlockSelect(block.id)}
                    >
                      <div className="p-3 flex items-center space-x-3">
                        {/* Drag Handle */}
                        <div
                          {...provided.dragHandleProps}
                          className="flex items-center text-gray-400 hover:text-gray-600"
                        >
                          <Grip className="h-4 w-4" />
                        </div>

                        {/* Visibility Toggle */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-1 h-6 w-6"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleVisibility(block)
                          }}
                        >
                          {block.visible === false ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>

                        {/* Text Content */}
                        <div
                          className="flex-1 min-w-0"
                          onDoubleClick={() => handleDoubleClick(block)}
                        >
                          {editingId === block.id ? (
                            <Input
                              value={editingText}
                              onChange={(e) => setEditingText(e.target.value)}
                              onBlur={() => handleEditSave(block)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleEditSave(block)
                                }
                              }}
                              className="h-6 text-sm"
                              autoFocus
                            />
                          ) : (
                            <span className="text-sm font-medium truncate block select-none">
                              {block.text || 'Leerer Text'}
                            </span>
                          )}
                        </div>

                        {/* Delete Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-1 h-6 w-6 text-gray-400 hover:text-red-600"
                          onClick={(e) => {
                            e.stopPropagation()
                            onDeleteBlock(block.id)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
