import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import './styles/globals.css';

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: "AstroAware - AI-Powered Astrological Readings",
  description: "Discover your cosmic path through personalized AI-powered astrological readings, tailored uniquely to your birth details.",
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  themeColor: '#0A0A0A',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <body>
        {children}
      </body>
    </html>
  );
}