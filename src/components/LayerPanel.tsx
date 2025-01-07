'use client'

import { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { TextBlock } from '@/types'

interface LayerPanelProps {
  blocks: TextBlock[];
  onTextBlockUpdate: (block: TextBlock) => void;
}

export function LayerPanel({ blocks, onTextBlockUpdate }: LayerPanelProps) {
  const [innerBlocks, setInnerBlocks] = useState<TextBlock[]>(blocks)

  useEffect(() => {
    setInnerBlocks(blocks)
  }, [blocks])

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const newBlocks = Array.from(innerBlocks)
    const [removed] = newBlocks.splice(result.source.index, 1)
    newBlocks.splice(result.destination.index, 0, removed)

    // Update z-indices for all blocks
    newBlocks.forEach((block, index) => {
      if (block.zIndex !== newBlocks.length - index) {
        onTextBlockUpdate({
          ...block,
          zIndex: newBlocks.length - index
        })
      }
    })
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Ebenen</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="layers">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              {innerBlocks.map((block, index) => (
                <Draggable key={block.id} draggableId={block.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="bg-gray-50 p-3 rounded flex items-center justify-between hover:bg-gray-100 cursor-move"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium">
                          {block.text || 'Leerer Text'}
                        </span>
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
