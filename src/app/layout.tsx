import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Crop Image - Pixi JS',
  description: 'Demo app to crop images',
  authors: {
    name: 'Laczko-Albert Tamas',
    url: '',
  },
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
