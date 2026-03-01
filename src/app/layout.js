import './globals.css'

export const metadata = {
  title: 'CareAuto Pro',
  description: 'Gestione flotta aziendale',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body className="antialiased">{children}</body>
    </html>
  )
}
