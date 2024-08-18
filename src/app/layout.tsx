import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/header/header'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'Doce Evangelho',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark antialiased">
      <body className="flex flex-col w-full h-screen">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
