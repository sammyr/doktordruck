'use client'

import { fonts } from '@/data/fonts'
import { useEffect } from 'react'

export function FontLoader() {
  useEffect(() => {
    fonts.forEach(font => {
      font.weights.forEach(weight => {
        const fontFace = new FontFace(font.family, `url(${font.path}/${weight.file})`, {
          weight: weight.value.toString(),
        })

        fontFace.load().then(loadedFace => {
          document.fonts.add(loadedFace)
        }).catch(error => {
          console.error(`Error loading font ${font.family} ${weight.name}:`, error)
        })
      })
    })
  }, [])

  return null
}
