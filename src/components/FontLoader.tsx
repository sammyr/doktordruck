'use client'

import { fonts } from '@/data/fonts'
import { useEffect } from 'react'

export function FontLoader() {
  useEffect(() => {
    fonts.forEach(font => {
      if (font.url) {
        const link = document.createElement('link')
        link.href = font.url
        link.rel = 'stylesheet'
        document.head.appendChild(link)
      }
    })
  }, [])

  return null
}
