export const metadata = { title: 'CareAuto Pro' };
export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body style={{ margin: 0, backgroundColor: "#f8fafc" }}>{children}</body>
    </html>
  );
}
