import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RuntimePad - Developer Tools',
  description: 'Super useful dev tools — all in one place. JSON beautifier, diff checker, collaborative code editor and more.',
  icons: {
    icon: 'https://huggingface.co/datasets/jubinsoni/runtimepad/resolve/main/favicon.svg',
    shortcut: 'https://huggingface.co/datasets/jubinsoni/runtimepad/resolve/main/favicon.svg',
    apple: 'https://huggingface.co/datasets/jubinsoni/runtimepad/resolve/main/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}