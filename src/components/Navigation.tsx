'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Navigation() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/icon.svg"
              alt="Doktor Druck Logo"
              width={40}
              height={40}
              className="mr-2"
            />
            <span className="text-xl font-bold text-gray-900">
              Doktor Druck
            </span>
          </Link>
          
          <div className="flex space-x-8">
            <Link href="/druck" className="text-gray-700 hover:text-purple-800">
              PDF erstellen
            </Link>
            <Link href="/preise" className="text-gray-700 hover:text-purple-800">
              Preise
            </Link>
            <Link href="/hilfe" className="text-gray-700 hover:text-purple-800">
              Hilfe
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
