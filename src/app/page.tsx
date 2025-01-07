import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

/**
 * WICHTIG: KEINE LÖSCHUNGEN OHNE EXPLIZITE ANWEISUNG
 * - Jede Komponente und Sektion wurde sorgfältig entwickelt
 * - Auch wenn bestimmte Elemente redundant erscheinen, könnten sie für spezielle Anwendungsfälle erforderlich sein
 * - NIEMALS Komponenten oder Sektionen entfernen, auch wenn sie scheinbar ungenutzt sind
 * - Bei Unsicherheit IMMER nachfragen, bevor Änderungen vorgenommen werden
 */

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">
                Professionelle Druckvorlagen leicht gemacht
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Erstellen Sie druckreife PDF-Dokumente mit perfekter Qualität. 
                Ideal für Druckereien, Designer und alle, die hochwertige Druckvorlagen benötigen.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="/druck"
                  className="bg-purple-800 text-white px-8 py-3 rounded-lg hover:bg-purple-900 transition-colors"
                >
                  Jetzt PDF erstellen
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/footage/editor-preview.png"
                alt="PDF Editor Vorschau"
                fill
                className="object-contain bg-gray-100"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Professionelle Funktionen
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/footage/print-settings.png"
                  alt="Druckoptimierte Ausgabe"
                  fill
                  className="object-contain bg-gray-100"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Druckoptimierte Ausgabe
              </h3>
              <p className="text-gray-600">
                Automatische Farbkonvertierung (CMYK), Beschnittzugabe und Druckermarken 
                für professionelle Druckergebnisse.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/footage/text-editing.png"
                  alt="Präzise Textbearbeitung"
                  fill
                  className="object-contain bg-gray-100"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Präzise Textbearbeitung
              </h3>
              <p className="text-gray-600">
                Umfangreiche Textformatierung mit verschiedenen Schriftarten, 
                Größen und Stilen für perfekte Typografie.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/footage/export-options.png"
                  alt="Flexible Export-Optionen"
                  fill
                  className="object-contain bg-gray-100"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Flexible Export-Optionen
              </h3>
              <p className="text-gray-600">
                Speichern Sie Ihre Dokumente im druckfertigen PDF-Format oder 
                als bearbeitbare Projektdatei.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Unsere Preise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Basic</h3>
              <p className="text-4xl font-bold text-purple-800 mb-6">
                0€<span className="text-base font-normal text-gray-600">/Monat</span>
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Bis zu 5 PDF-Dokumente
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Grundlegende Textformatierung
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  PDF/X-1a Export
                </li>
              </ul>
              <Link
                href="/druck"
                className="block text-center bg-purple-800 text-white px-6 py-3 rounded-lg hover:bg-purple-900 transition-colors"
              >
                Kostenlos starten
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-purple-800 rounded-lg p-8 border border-purple-700 transform scale-105 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-4">Pro</h3>
              <p className="text-4xl font-bold text-white mb-6">
                29€<span className="text-base font-normal text-purple-200">/Monat</span>
              </p>
              <ul className="space-y-4 mb-8 text-white">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-purple-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Unbegrenzte PDF-Dokumente
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-purple-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Erweiterte Textformatierung
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-purple-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Alle PDF/X Standards
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-purple-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Prioritäts-Support
                </li>
              </ul>
              <Link
                href="/druck"
                className="block text-center bg-white text-purple-800 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Pro werden
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Enterprise</h3>
              <p className="text-4xl font-bold text-purple-800 mb-6">
                99€<span className="text-base font-normal text-gray-600">/Monat</span>
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Alles aus Pro
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  API-Zugang
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Dedizierter Account Manager
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  99,9% SLA
                </li>
              </ul>
              <Link
                href="/druck"
                className="block text-center bg-purple-800 text-white px-6 py-3 rounded-lg hover:bg-purple-900 transition-colors"
              >
                Kontakt aufnehmen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              Bereit für professionelle Druckvorlagen?
            </h2>
            <p className="text-xl mb-8">
              Starten Sie jetzt und erstellen Sie Ihre erste druckfertige PDF-Datei.
            </p>
            <Link
              href="/druck"
              className="inline-block bg-white text-purple-800 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Kostenlos ausprobieren
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}