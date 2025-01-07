import { TextBlock } from '@/types/text'

export interface ProjectData {
  version: string
  pageSize: string
  backgroundColor: string
  textBlocks: TextBlock[]
}

function getProjectFileName(textBlocks: TextBlock[]): string {
  // Versuche den Namen des ersten Textblocks zu verwenden
  const firstBlock = textBlocks.find(block => block.text.trim() !== '')
  const projectName = firstBlock ? firstBlock.text.trim() : 'Projekt'
  
  // Entferne ungültige Dateinamenzeichen und ersetze Leerzeichen durch Unterstriche
  const safeName = projectName
    .replace(/[^a-zA-Z0-9äöüÄÖÜß\s-]/g, '')
    .replace(/\s+/g, '_')
    .substring(0, 50) // Begrenze die Länge auf 50 Zeichen
  
  return `${safeName}.dd`
}

export async function saveProject(data: ProjectData): Promise<void> {
  try {
    // Erstelle einen Blob mit den JSON-Daten
    const jsonString = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })
    
    // Erstelle einen Download-Link
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = getProjectFileName(data.textBlocks)
    
    // Klicke den Link an
    document.body.appendChild(link)
    link.click()
    
    // Räume auf
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Fehler beim Speichern des Projekts:', error)
    throw new Error('Projekt konnte nicht gespeichert werden')
  }
}

export async function loadProject(file: File): Promise<ProjectData> {
  try {
    // Prüfe die Dateiendung
    if (!file.name.toLowerCase().endsWith('.dd')) {
      throw new Error('Ungültiges Dateiformat. Bitte wählen Sie eine .dd-Datei.')
    }
    
    // Lese die Datei
    const text = await file.text()
    const data = JSON.parse(text) as ProjectData
    
    // Validiere die Daten
    if (!data.version || !data.pageSize || !Array.isArray(data.textBlocks)) {
      throw new Error('Ungültiges Projektformat')
    }
    
    return data
  } catch (error) {
    console.error('Fehler beim Laden des Projekts:', error)
    throw new Error('Projekt konnte nicht geladen werden')
  }
}
