import type { Metadata, Viewport } from "next";
import { Nunito, Rhodium_Libre, Metrophobic } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ToastProvider } from "@/components/ui/ToastProvider";
import "./globals.css";
import "@/styles/general.css";

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Don't cache

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: 'swap',
  preload: true,
});

const rhodiumLibre = Rhodium_Libre({
  variable: "--font-rhodium-libre",
  subsets: ["latin"],
  weight: ["400"],
  display: 'swap',
  preload: true,
});

const metrophobic = Metrophobic({
  variable: "--font-metrophobic",
  subsets: ["latin"],
  weight: ["400"],
  display: 'swap',
  preload: true,
});

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FCD116' }, // Ghana flag gold
    { media: '(prefers-color-scheme: dark)', color: '#006B3F' }   // Ghana flag green
  ],
  colorScheme: 'light dark',
};

// Metadata configuration
export const metadata: Metadata = {
  // Basic metadata
  title: {
    default: 'Ghana Notice Board - Community Hub for Ghanaians',
    template: '%s | Ghana Notice Board'
  },
  description: 'Your community hub for Ghana news, events, opportunities, and announcements. Connect with Ghanaians at home and in the diaspora. Discover jobs, scholarships, events, and breaking news.',
  keywords: [
    'Ghana news',
    'Ghana events',
    'Ghana jobs',
    'Ghana scholarships',
    'Ghana opportunities',
    'Ghana announcements',
    'Ghana community',
    'Ghanaian diaspora',
    'Ghana internships',
    'Ghana grants',
    'Ghana fellowships',
    'Ghana business opportunities',
    'breaking news Ghana',
    'Ghana tech jobs',
    'study in Ghana',
    'Ghana conferences',
    'Ghana networking'
  ],
  authors: [{ name: 'Ghana Notice Board Team' }],
  creator: 'Ghana Notice Board',
  publisher: 'Ghana Notice Board',
  
  // Application name
  applicationName: 'Ghana Notice Board',
  
  // Referrer policy
  referrer: 'origin-when-cross-origin',
  
  // Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_GH',
    url: 'https://www.ghananoticeboard.com',
    siteName: 'Ghana Notice Board',
    title: 'Ghana Notice Board - Community Hub for Ghanaians',
    description: 'Your hub for Ghana news, events, jobs, scholarships, and opportunities. Connect with Ghanaians at home and in the diaspora.',
    images: [
      {
        url: 'https://www.ghananoticeboard.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ghana Notice Board - Community Hub',
        type: 'image/png',
      }
    ],
  },
  
  // Twitter
  twitter: {
    card: 'summary_large_image',
    site: '@ghananotice',
    creator: '@ghananotice',
    title: 'Ghana Notice Board - Community Hub for Ghanaians',
    description: 'Your hub for Ghana news, events, jobs, scholarships, and opportunities. Connect with Ghanaians worldwide.',
    images: ['https://www.ghananoticeboard.com/twitter-image.png'],
  },
  
  // Icons
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icons/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/icons/safari-pinned-tab.svg',
        color: '#006B3F', // Ghana flag green
      },
    ],
  },
  
  // Manifest
  manifest: '/manifest.json',
  
  // App links
  appLinks: {
    web: {
      url: 'https://www.ghananoticeboard.com',
      should_fallback: true,
    },
  },
  
  // Other
  category: 'news',
  classification: 'Community News & Information Platform',
  
  // Alternate languages (Ghana's major languages)
  alternates: {
    canonical: 'https://www.ghananoticeboard.com',
    languages: {
      'en-GH': 'https://www.ghananoticeboard.com',
      'tw-GH': 'https://www.ghananoticeboard.com/tw', // Twi
      'ga-GH': 'https://www.ghananoticeboard.com/ga', // Ga
      'ee-GH': 'https://www.ghananoticeboard.com/ee', // Ewe
    },
  },
  
  // Other metadata
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Ghana Notice',
    'format-detection': 'telephone=no',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        
        {/* Additional meta tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Ghana Notice" />
        <meta name="geo.region" content="GH" />
        <meta name="geo.placename" content="Ghana" />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Ghana Notice Board',
              url: 'https://www.ghananoticeboard.com',
              logo: 'https://www.ghananoticeboard.com/logo.png',
              description: 'Community platform for Ghana news, events, jobs, scholarships, and opportunities for Ghanaians worldwide',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'GH',
                addressLocality: 'Accra'
              },
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'info@ghananoticeboard.com',
                contactType: 'Customer Support',
                availableLanguage: ['English', 'Twi', 'Ga', 'Ewe'],
                areaServed: 'GH'
              },
              sameAs: [
                'https://twitter.com/ghananotice',
                'https://facebook.com/ghananotice',
                'https://linkedin.com/company/ghananotice'
              ]
            })
          }}
        />
        
        {/* Structured Data - WebSite with SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Ghana Notice Board',
              url: 'https://www.ghananoticeboard.com',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://www.ghananoticeboard.com/search?q={search_term_string}'
                },
                'query-input': 'required name=search_term_string'
              }
            })
          }}
        />
      </head>
      <body
        className={`${nunito.variable} ${rhodiumLibre.variable} ${metrophobic.variable} antialiased`}
      >
        <ToastProvider>
          <Analytics />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
