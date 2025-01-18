// !!! WICHTIG: Diese Komponente ist für die Gitterdarstellung zuständig und darf nicht verändert werden !!!

import React from 'react'

interface GridProps {
  width: number
  height: number
  showGrid: boolean
}

// Berechne die Gittergröße in Millimetern
function calculateGrid(size: number) {
  // Runde auf die nächsten 10mm auf
  const maxValue = Math.ceil(size / 10) * 10
  
  return {
    // Größe eines 1mm-Gitterquadrats in Prozent
    smallSize: (1 / maxValue) * 100,
    // Größe eines 10mm-Gitterquadrats in Prozent
    largeSize: (10 / maxValue) * 100,
    // Offset in Prozent
    offset: (size % 10) / maxValue * 100
  }
}

export function Grid({ width, height, showGrid }: GridProps) {
  if (!showGrid) return null

  const horizontalGrid = calculateGrid(width)
  const verticalGrid = calculateGrid(height)

  return {
    backgroundImage: `
      linear-gradient(to right, rgba(221, 221, 221, 0.15) 0.5px, transparent 0.5px), 
      linear-gradient(to bottom, rgba(221, 221, 221, 0.15) 0.5px, transparent 0.5px),
      linear-gradient(to right, rgba(221, 221, 221, 0.3) 0.5px, transparent 0.5px), 
      linear-gradient(to bottom, rgba(221, 221, 221, 0.3) 0.5px, transparent 0.5px)
    `,
    backgroundSize: `
      ${horizontalGrid.smallSize}% ${verticalGrid.smallSize}%,
      ${horizontalGrid.smallSize}% ${verticalGrid.smallSize}%,
      ${horizontalGrid.largeSize}% ${verticalGrid.largeSize}%,
      ${horizontalGrid.largeSize}% ${verticalGrid.largeSize}%
    `,
    backgroundPosition: `
      ${-horizontalGrid.offset}% ${-verticalGrid.offset}%,
      ${-horizontalGrid.offset}% ${-verticalGrid.offset}%,
      ${-horizontalGrid.offset}% ${-verticalGrid.offset}%,
      ${-horizontalGrid.offset}% ${-verticalGrid.offset}%
    `
  }
}
