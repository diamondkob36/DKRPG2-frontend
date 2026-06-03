import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DKRPG - Fantasy RPG Game',
  description: 'เกม RPG แฟนตาซีออนไลน์',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  )
}
