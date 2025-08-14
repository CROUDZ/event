import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Runkko - 100 Abonnés Célébration !',
  description: 'Une aventure spéciale pour célébrer les 100 abonnés de Runkko ! Résous l\'enquête et découvre le serveur Minecraft exclusif.',
  keywords: 'Runkko, 100 abonnés, Minecraft, serveur, enquête, aventure',
  authors: [{ name: 'Équipe Runkko' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
