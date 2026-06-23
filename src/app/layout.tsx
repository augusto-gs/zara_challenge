import type { Metadata } from 'next';
import './globals.scss';
import { Providers } from './providers';
import { Navbar } from '@/components/navbar/Navbar';
import { Container } from '@/components/container/Container';

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
        <Providers>
          <Navbar />
          <main>
            <Container>{children}</Container>
          </main>
        </Providers>
      </body>
    </html>
  );
}
