import { TextBlock } from '../types/text'

export interface ProjectData {
  version: string
  pageSize: string
  backgroundColor: string
  textBlocks: TextBlock[]
}

export async function saveProject(data: ProjectData): Promise<void> {
  const json = JSON.stringify(data)
  const blob = new Blob([json], { type: 'application/json' })
  
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = `projekt-${Date.now()}.dd`
  a.click()
  
  URL.revokeObjectURL(a.href)
}

export async function loadProject(file: File): Promise<ProjectData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string)
        
        // Validierung der Projektdaten
        if (!data.version || !data.pageSize || !data.backgroundColor || !data.textBlocks) {
          throw new Error('Ungültiges Projektformat')
        }
        
        resolve({
          version: data.version,
          pageSize: data.pageSize,
          backgroundColor: data.backgroundColor,
          textBlocks: data.textBlocks.map((block: any) => ({
            id: block.id || crypto.randomUUID(),
            text: block.text || block.content || '',
            x: block.x || (block.position?.x || 0),
            y: block.y || (block.position?.y || 0),
            color: block.color || '#000000',
            fontFamily: block.fontFamily || 'Arial',
            fontSize: block.fontSize || 16,
            fontWeight: block.fontWeight || 400,
            fontStyle: block.fontStyle || 'normal',
            width: block.width || 100,
            height: block.height || 30,
            zIndex: block.zIndex || 0,
            textAlign: block.textAlign || 'left',
            lineHeight: block.lineHeight || 1.2,
            letterSpacing: block.letterSpacing || 0,
            multiline: block.multiline || false,
            selected: block.selected || false
          }))
        })
      } catch (error) {
        reject(new Error('Ungültiges Projektformat'))
      }
    }
    
    reader.onerror = () => {
      reject(new Error('Fehler beim Lesen der Datei'))
    }
    
    reader.readAsText(file)
  })
}
