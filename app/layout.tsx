import type { Metadata } from 'next';
import '@/app/globals.css';
import { BRAND } from '@/lib/brand';

export const metadata: Metadata = {
  title: `${BRAND.name} - ${BRAND.tagline}`,
  description: BRAND.tagline,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
