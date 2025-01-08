'use client'

import { useEffect } from 'react'
import { loadFonts } from '../lib/fonts'

export default function FontLoader() {
  useEffect(() => {
    // Load fonts from public directory
    const fontFiles = [
      '/fonts/Inter/regular.ttf',
      '/fonts/Lato/regular.ttf',
      '/fonts/Merriweather/regular.ttf'
    ]
    
    fontFiles.forEach(fontPath => {
      const font = new FontFace('CustomFont', `url(${fontPath})`)
      font.load().then(loadedFont => {
        document.fonts.add(loadedFont)
      })
    })
  }, [])

  return null
}
