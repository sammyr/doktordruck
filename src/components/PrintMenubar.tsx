'use client'

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from './ui/menubar'
import { saveProject, loadProject } from '../lib/project-manager'
import { TextBlock } from '../types/text'

interface ProjectData {
  version: string
  pageSize: string
  backgroundColor: string
  textBlocks: TextBlock[]
}

interface PrintMenubarProps {
  backgroundColor: string
  pageSize: string
  textBlocks: TextBlock[]
  onGeneratePDF: () => void
  onLoadProject: (data: ProjectData) => void
}

export function PrintMenubar({
  backgroundColor,
  pageSize,
  textBlocks,
  onGeneratePDF,
  onLoadProject
}: PrintMenubarProps) {
  const handleSave = async () => {
    try {
      await saveProject({
        version: '1.0.0',
        pageSize,
        backgroundColor,
        textBlocks
      })
    } catch (error) {
      console.error('Fehler beim Speichern:', error)
    }
  }

  const handleOpen = async () => {
    try {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = '.dd'
      
      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0]
        if (!file) return
        
        try {
          const projectData = await loadProject(file)
          console.log('Geladene Projektdaten:', projectData)
          onLoadProject(projectData)
        } catch (error) {
          console.error('Fehler beim Laden:', error)
          alert('Fehler beim Laden der Datei: ' + (error instanceof Error ? error.message : 'Unbekannter Fehler'))
        }
      }
      
      input.click()
    } catch (error) {
      console.error('Fehler beim Öffnen:', error)
      alert('Fehler beim Öffnen der Datei: ' + (error instanceof Error ? error.message : 'Unbekannter Fehler'))
    }
  }

  return (
    <Menubar className="rounded-none border-0 border-b shadow-sm">
      <MenubarMenu>
        <MenubarTrigger>Datei</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Neu <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onClick={handleOpen}>
            Öffnen <MenubarShortcut>⌘O</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={handleSave}>
            Speichern <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onClick={onGeneratePDF}>Als PDF exportieren...</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Bearbeiten</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Rückgängig <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Wiederholen <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Ausschneiden <MenubarShortcut>⌘X</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Kopieren <MenubarShortcut>⌘C</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Einfügen <MenubarShortcut>⌘V</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Ansicht</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Zoom In</MenubarItem>
          <MenubarItem>Zoom Out</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Gitter anzeigen</MenubarItem>
          <MenubarItem>Lineale anzeigen</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Hilfe</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => window.open('CHANGELOG.md', '_blank')}>
            Changelog
          </MenubarItem>
          <MenubarItem onClick={() => window.open('https://github.com/sammyrun/doktordruck/issues/new', '_blank')}>
            Feature anfragen
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={() => window.open('https://github.com/sammyrun/doktordruck', '_blank')}>
            Info
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
