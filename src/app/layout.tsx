import { UserProvider } from '@auth0/nextjs-auth0/client';
import { TRPCProvider } from '@/lib/trpc/provider';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ChatGPT Clone',
  description: 'A mobile-first ChatGPT clone using Next.js and Gemini API',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
