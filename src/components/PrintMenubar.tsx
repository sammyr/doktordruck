'use client'

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { saveProject } from '@/lib/project-manager'
import { TextBlock } from '@/types/text'

interface PrintMenubarProps {
  backgroundColor: string
  pageSize: string
  textBlocks: TextBlock[]
  onGeneratePDF: () => void
}

export function PrintMenubar({
  backgroundColor,
  pageSize,
  textBlocks,
  onGeneratePDF
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
      // Hier könnte eine Benutzerbenachrichtigung eingefügt werden
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
          <MenubarItem>
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
    </Menubar>
  )
}
