import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function Impressum() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Impressum</h1>
        
        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold mt-8 mb-4">Angaben gemäß § 5 TMG</h2>
          <p>
            Richter & Freunde UG<br />
            Krummestraße 26<br />
            10627 Berlin
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Vertreten durch</h2>
          <p>
            Geschäftsführung der Richter & Freunde UG
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Kontakt</h2>
          <p>
            Telefon: 030 31807707<br />
            E-Mail: info@reichterundfreunde.de
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Registereintrag</h2>
          <p>
            Eintragung im Handelsregister.<br />
            Registergericht: Amtsgericht Berlin<br />
            Registernummer: [Ihre Registernummer]
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Umsatzsteuer-ID</h2>
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
            [Ihre USt-IdNr.]
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <p>
            Richter & Freunde UG<br />
            Krummestraße 26<br />
            10627 Berlin
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Streitschlichtung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
            <a href="https://ec.europa.eu/consumers/odr" className="text-purple-800 hover:text-purple-900">
              https://ec.europa.eu/consumers/odr
            </a>.<br />
            Unsere E-Mail-Adresse finden Sie oben im Impressum.
          </p>
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Haftung für Inhalte</h2>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den 
            allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht 
            verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen 
            zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}
