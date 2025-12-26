import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Code Snippet Manager',
  description: 'Organize and manage your code snippets with ease',
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

