import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Navigation } from '@/components/Navigation'
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Professionelle Druckvorlagen<br />leicht gemacht
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Erstellen Sie druckreife PDF-Dokumente mit perfekter Qualität. 
          Ideal für Druckereien, Designer und alle, die hochwertige Druckvorlagen benötigen.
        </p>
        <Link href="/druck">
          <Button size="lg" className="bg-purple-800 hover:bg-purple-900 text-white">
            Jetzt PDF erstellen
          </Button>
        </Link>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Druckoptimierte Ausgabe</h3>
            <p className="text-gray-600">
              Automatische Farbkonvertierung (CMYK), Beschnittzugabe und Druckermarken 
              für professionelle Druckergebnisse.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Präzise Textbearbeitung</h3>
            <p className="text-gray-600">
              Umfangreiche Schriftbibliothek, Kerning-Kontrolle und 
              vektorbasierte Texte für gestochen scharfe Ergebnisse.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Druckerei-Standards</h3>
            <p className="text-gray-600">
              PDF/X-konform, eingebettete Schriften und ICC-Profile 
              für reibungslose Druckabläufe.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Bereit für professionelle Druckvorlagen?
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Starten Sie jetzt und erstellen Sie druckreife PDFs 
          in Ihrem Browser - schnell, einfach und professionell.
        </p>
        <Link href="/druck">
          <Button size="lg" className="bg-purple-800 hover:bg-purple-900 text-white">
            Kostenlos testen
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}