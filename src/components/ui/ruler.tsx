// !!! WICHTIG: Diese Komponente ist für die Linealdarstellung zuständig und darf nicht verändert werden !!!

import React, { useCallback } from 'react'

interface RulerProps {
  width: number
  height: number
  showRuler: boolean
}

export function Ruler({ width, height, showRuler }: RulerProps) {
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
              [isHorizontal ? 'height' : 'width']: '6px',
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

  if (!showRuler) return null

  return (
    <>
      <div className="absolute -top-6 left-0 w-full h-6 bg-gray-50/70">
        {generateRulerMarks(Math.ceil(width / 10) * 10, true)}
      </div>
      <div className="absolute -left-6 top-0 w-6 h-full bg-gray-50/70">
        {generateRulerMarks(Math.ceil(height / 10) * 10, false)}
      </div>
    </>
  )
}
