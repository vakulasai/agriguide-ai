import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AgriGuide AI - Smart Farming, Better Tomorrow',
  description:
    'AI-powered smart farming platform: crop recommendations, organic farming guide, weather forecasting, disease scanner, and market price intelligence.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#f4f8f5] text-slate-900 antialiased selection:bg-emerald-200 selection:text-emerald-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}
