import type { Metadata } from 'next';
import './globals.scss';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Mobile Store',
  description: 'Browse and buy the latest smartphones',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
