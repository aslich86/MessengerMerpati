import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MerpatiMessenger',
  description: 'Created by aslich - KambingCoding',
  generator: 'Merpati AI',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
