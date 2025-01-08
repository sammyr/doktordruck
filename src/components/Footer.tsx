'use client'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Doktor Druck</h3>
            <p className="text-sm text-gray-400">
              Professionelle Druckvorlagen leicht gemacht
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4">Produkt</h4>
            <ul className="space-y-2">
              <li>
                <a href="/features" className="text-sm text-gray-400 hover:text-white">
                  Funktionen
                </a>
              </li>
              <li>
                <a href="/preise" className="text-sm text-gray-400 hover:text-white">
                  Preise
                </a>
              </li>
              <li>
                <a href="/faq" className="text-sm text-gray-400 hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Rechtliches</h4>
            <ul className="space-y-2">
              <li>
                <a href="/impressum" className="text-sm text-gray-400 hover:text-white">
                  Impressum
                </a>
              </li>
              <li>
                <a href="/datenschutz" className="text-sm text-gray-400 hover:text-white">
                  Datenschutz
                </a>
              </li>
              <li>
                <a href="/agb" className="text-sm text-gray-400 hover:text-white">
                  AGB
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Kontakt</h4>
            <ul className="space-y-2">
              <li className="text-sm text-gray-400">support@doktordruck.de</li>
              <li className="text-sm text-gray-400">+49 123 456789</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Doktor Druck. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  )
}
