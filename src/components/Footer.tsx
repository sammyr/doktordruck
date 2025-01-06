import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link href="/druck" className="text-gray-500 hover:text-purple-800 transition-colors">
            Editor
          </Link>
          <Link href="/impressum" className="text-gray-500 hover:text-purple-800 transition-colors">
            Impressum
          </Link>
          <Link href="/datenschutz" className="text-gray-500 hover:text-purple-800 transition-colors">
            Datenschutz
          </Link>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-sm leading-5 text-gray-500">
            &copy; {new Date().getFullYear()} PDF Designer. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  )
}
