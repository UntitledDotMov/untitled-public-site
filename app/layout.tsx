import type { Metadata } from 'next';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { NextAppDirEmotionCacheProvider } from 'tss-react/next/appDir';
import { theme } from '@/lib/theme';
import Navbar from '@/components/Navbar';
import '@mantine/core/styles.css';

export const metadata: Metadata = {
  title: 'Untitled.mov',
  description:
    'This repo can be used as a template for using Mantine V7 in a Nextjs 14 project with TSS for styling.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <ColorSchemeScript defaultColorScheme='dark' />
      </head>
      <body>
        <NextAppDirEmotionCacheProvider options={{ key: 'css' }}>
          <MantineProvider defaultColorScheme='dark' theme={theme}>
            <Navbar>
            {children}
            </Navbar>
          </MantineProvider>
        </NextAppDirEmotionCacheProvider>
      </body>
    </html>
  );
}
