import './globals.css'

export const metadata = {
  title: 'CareAuto Pro',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body className="antialiased">{children}</body>
    </html>
  )
}
