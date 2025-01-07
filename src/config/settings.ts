// PDF-Einstellungen
export const pdfSettings = {
  // Skalierungsfaktor für die Schriftgröße (Bildschirm zu PDF)
  fontScaleFactor: 2.5,
  
  // Beschnitt in mm
  bleed: 3,
  
  // Minimaler Randabstand in mm
  minMargin: 10,
  
  // Standard-Schriftarten-Mapping
  fontMapping: {
    'Inter': 'helvetica',
    'Roboto': 'helvetica',
    'Playfair Display': 'times',
    'Helvetica Neue': 'helvetica',
    'Futura': 'helvetica',
    'Garamond': 'times',
    'Bodoni': 'times',
    'Frutiger': 'helvetica',
    'Avenir': 'helvetica',
    'Proxima Nova': 'helvetica',
    'Montserrat': 'helvetica',
    'Open Sans': 'helvetica',
    'Gotham': 'helvetica',
    'Oswald': 'helvetica',
    'Merriweather': 'times',
    'Quicksand': 'helvetica',
    'Work Sans': 'helvetica',
    'Lato': 'helvetica',
    'Poppins': 'helvetica',
    'Source Sans Pro': 'helvetica',
    'Raleway': 'helvetica',
    'PT Sans': 'helvetica',
    'Nunito': 'helvetica',
    'Ubuntu': 'helvetica'
  },
  
  // Gewicht-Mapping für Schriftarten
  weightMapping: {
    100: 'normal',
    200: 'normal',
    300: 'normal',
    400: 'normal',
    500: 'normal',
    600: 'bold',
    700: 'bold',
    800: 'bold',
    900: 'bold'
  }
} as const

// Stage-Einstellungen
export const stageSettings = {
  // Standard-Breite des Stage-Bereichs in %
  defaultWidth: 75,
  
  // Standard-Höhe des Layer-Panels in vh
  layerPanelHeight: 40,
  
  // Standard-Textblock-Einstellungen
  defaultTextBlock: {
    text: 'Neuer Text',
    color: '#000000',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: 400,
    fontStyle: 'normal',
    multiline: false,      // Standardmäßig einzeilig
    width: 20,            // 20% der Stage-Breite
    lineHeight: 1.2,      // 120% Zeilenhöhe
    textAlign: 'left'     // Linksbündig
  },

  // Zoom-Einstellungen
  zoom: {
    initial: 1.8,     // Initiale Zoom-Stufe (180%)
    min: 0.1,         // Minimale Zoom-Stufe (10%)
    max: 5,           // Maximale Zoom-Stufe (500%)
    step: 0.15,       // Zoom-Schritt bei Mausrad
    buttonStep: 0.1,  // Zoom-Schritt bei Button-Klick
    speed: {
      wheel: 1.5,     // Multiplikator für Mausrad-Zoom-Geschwindigkeit
      smooth: true    // Aktiviert sanftes Zoomen
    }
  },

  // Drag & Drop Einstellungen
  dragAndDrop: {
    textBlockSpeed: 0.2,  // Geschwindigkeitsfaktor für Textbox-Bewegung
    transitionDuration: 10, // Übergangsanimation in ms
    grid: {
      size: 1,           // Rastergröße in Prozent
      snapThreshold: 1  // Einrastbereich in Pixeln
    },
    guides: {
      color: '#000',  // Farbe der Hilfslinien
      opacity: 0.5,      // Deckkraft der Hilfslinien
      thickness: 0.5       // Dicke der Hilfslinien in Pixeln
    }
  },

  // Farb-Einstellungen
  colors: {
    background: '#ffffff',    // Standard-Hintergrundfarbe für Blätter
    selection: '#6b21a8',     // Auswahlfarbe für Textblöcke
    selectionOpacity: 0.5,    // Deckkraft der Auswahlfarbe
    stageBackground: '#f3f4f6', // Hintergrundfarbe der Stage-Fläche
    paper: {
      background: '#ffffff',  // Hintergrundfarbe des Papiers
      shadow: 'rgba(0, 0, 0, 0.1)'  // Schattenfarbe des Papiers
    }
  },

  // UI-Einstellungen
  ui: {
    resizeHandleWidth: 8,     // Breite der Resize-Handles in px
    resizeHandleColor: {
      default: '#d1d5db',     // Standard-Farbe
      hover: '#9ca3af'        // Hover-Farbe
    }
  }
} as const

// Toolbar-Einstellungen
export const toolbarSettings = {
  // Minimale und maximale Schriftgröße
  fontSize: {
    min: 10,
    max: 150,
    step: 1
  }
} as const
