import fs from 'fs'
import path from 'path'

export interface Font {
  name: string;
  url: string;
  family: string;
}

export function loadFonts(): Font[] {
  const fontsDir = path.join(process.cwd(), 'public', 'fonts')
  const fontExtensions = ['.ttf', '.otf', '.woff', '.woff2']
  
  try {
    const files = fs.readdirSync(fontsDir)
    return files
      .filter(file => fontExtensions.includes(path.extname(file).toLowerCase()))
      .map(file => {
        // Entferne die Dateiendung und ersetze Bindestriche/Unterstriche durch Leerzeichen
        const name = path.basename(file, path.extname(file))
          .replace(/[-_]/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase()) // Kapitalisiere erste Buchstaben
        
        return {
          name,
          family: name,
          url: `/fonts/${file}`
        }
      })
  } catch (error) {
    console.error('Error loading fonts:', error)
    return []
  }
}

// Lade die Schriftarten beim Start
export const availableFonts = loadFonts()
