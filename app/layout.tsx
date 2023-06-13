import './styles/general.css'

export const metadata = {
  title: 'Typewriter',
  description: 'Created by Om Lab',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
