import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { FontLoader } from '@/components/FontLoader'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PDF Design Tool',
  description: 'Erstellen Sie professionelle PDF-Dokumente für den Druck',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <FontLoader />
        {children}
      </body>
    </html>
  )
}
