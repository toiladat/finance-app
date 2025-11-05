import { sfPro } from '@/app/fonts/sfPro';
import TanstackProviders from '@/components/providers/TanstackProvider';
import RefreshToken from '@/components/refresh-token';
import { Toaster } from '@/components/ui/sonner';
import { routing } from '@/libs/i18nRouting';
import '@/styles/global.css';
import RootTemplate from '@/templates/RootTemplate';
import type { Metadata, Viewport } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import NextTopLoader from 'nextjs-toploader';

// -------------------------------
// 🌍 Viewport Config
// -------------------------------
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

// -------------------------------
// 🧠 SEO Metadata
// -------------------------------
export const metadata: Metadata = {
  metadataBase: new URL('https://gasy-9x9-plus-fe.vercel.app/'),
  title: {
    default: 'Finance Management',
    template: '%s | Finance Management',
  },
  description: 'HÀNH TRÌNH LAN TOẢ GIÁ TRỊ BẮT ĐẦU TỪ ĐÂY',
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/icon0.svg', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Finance Management',
    description: 'HÀNH TRÌNH LAN TOẢ GIÁ TRỊ BẮT ĐẦU TỪ ĐÂY',
    url: 'https://gasy-9x9-plus-fe.vercel.app/',
    siteName: 'Finance Management',
    images: [
      {
        url: '/apple-icon.png',
        width: 1200,
        height: 630,
        alt: 'Finance Management Logo',
      },
    ],
    type: 'website',
  },
};

// -------------------------------
// 🗺️ Static Params cho i18n
// -------------------------------
export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

// -------------------------------
// 🧩 Root Layout Component
// -------------------------------
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale hợp lệ
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${sfPro.variable} scroll-smooth`}>
      <head>
        {/* iOS Progressive Web Meta */}
        <meta name="apple-mobile-web-app-title" content="Finance Management" />
        <meta name="theme-color" content="#1C5BB9" />
      </head>

      <body className="min-h-screen bg-[#0B0F1A] text-[#E0F7FF] antialiased">
        {/* Loading bar trên cùng */}
        <NextTopLoader color="#0A84FF" showSpinner={false} height={3} />

        {/* i18n Provider */}
        <NextIntlClientProvider>
          {/* Refresh Token Logic */}
          <RefreshToken />

          {/* Tanstack Query / React Query */}
          <TanstackProviders>
            {/* Main Template */}
            <RootTemplate>{children}</RootTemplate>
          </TanstackProviders>

          {/* Toast Notifications */}
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                color: '#E0F7FF',
                background: 'linear-gradient(180deg, #0A84FF 0%, #0041A8 100%)',
                border: '1px solid rgba(0, 224, 255, 0.25)',
                boxShadow: '0 4px 20px rgba(0, 132, 255, 0.25)',
                borderRadius: '10px',
              },
            }}
          />

        </NextIntlClientProvider>
      </body>
    </html>
  );
}
