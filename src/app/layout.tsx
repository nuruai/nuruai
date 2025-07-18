import './globals.css';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Providers } from '@/components/providers';
import { app_url } from '@/lib/constants';

const fontSans = FontSans({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'nuruAI — AI Automation Agency for Modern Businesses',
  description:
    'nuruAI is an AI automation agency helping businesses streamline operations, save time, and scale faster using intelligent systems. We build smart tools, custom automations, and AI-powered solutions tailored to your unique workflows.',
  keywords: [
    'AI automation agency',
    'business automation',
    'nuruAI',
    'workflow automation',
    'intelligent automation',
    'AI tools for business',
    'GPT automation',
    'Zapier alternatives',
    'n8n automations',
    'custom AI solutions',
    'AI for startups',
    'automation for SMEs',
    'automated workflows',
  ],
  openGraph: {
    title: 'nuruAI — AI Automation Agency for Modern Businesses',
    description:
      'We help companies automate repetitive tasks, optimize workflows, and unlock growth with AI-powered tools and systems.',
    url: `${app_url}`,
    siteName: 'nuruAI',
    images: [
      {
        url: `${app_url}/main_img.png`,
        width: 1200,
        height: 630,
        alt: 'nuruAI — AI Automation Agency',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'nuruAI — AI Automation Agency for Modern Businesses',
    description:
      'Unlock your business potential with AI-powered automation. Let nuruAI build custom smart systems for your needs.',
    site: '@nuruAI',
    // images: ['https://nuruai.com/twitter-image.jpg'],
  },
  metadataBase: new URL(`${app_url}`),
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/fivicon.png" />
      </head>
      <body
        className={cn(
          "min-h-screen font-sans antialiased bg-background",
          fontSans.variable
        )}
      >
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}