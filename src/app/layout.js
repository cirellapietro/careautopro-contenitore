export const metadata = {
  title: 'CareAuto Pro',
  description: 'Gestione flotta aziendale',
}

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  )
}
