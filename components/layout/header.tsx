"use client";

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';

export function Header() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const tools = [
    { name: 'JSON Beautifier', href: '/json-beautifier' },
    { name: 'Diff Checker', href: '/diff-checker' },
    { name: 'Code Editor', href: '/editor' },
    { name: 'Base64 Encoder/Decoder', href: '/base64' },
    { name: 'Markdown Previewer', href: '/markdown-preview' },
    { name: 'Regex Tester', href: '/regex-tester' },
    { name: 'UUID Generator', href: '/uuid-generator' },
    { name: 'Timestamp Converter', href: '/timestamp-converter' },
    { name: 'Case Converter', href: '/case-converter' },
    { name: 'Color Picker', href: '/color-picker' },
    { name: 'HTML Escape/Unescape', href: '/html-escape' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl mx-auto px-4 flex h-16 items-center">
        <div className="mr-8 flex">
          <Link className="mr-8 flex items-center space-x-3" href="/">
            <Image 
              src="https://huggingface.co/datasets/jubinsoni/runtimepad/resolve/main/favicon.svg" 
              alt="RuntimePad" 
              width={28} 
              height={28} 
              className="h-7 w-7"
            />
            <span className="font-bold text-lg">
              RuntimePad
            </span>
          </Link>
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium">
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground/60 hover:text-primary"
              href="/json-beautifier"
            >
              JSON Beautifier
            </Link>
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground/60 hover:text-primary"
              href="/diff-checker"
            >
              Diff Checker
            </Link>
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground/60 hover:text-primary"
              href="/editor"
            >
              Code Editor
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-foreground/60 hover:text-primary">
                  More Tools
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {tools.slice(3).map((tool) => (
                  <DropdownMenuItem key={tool.href} asChild>
                    <Link href={tool.href} className="w-full">
                      {tool.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
          {/* Mobile Menu */}
          <div className="lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 w-9 px-0">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {tools.map((tool) => (
                  <DropdownMenuItem key={tool.href} asChild>
                    <Link href={tool.href} className="w-full">
                      {tool.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button variant="ghost" size="sm" className="h-9 w-9 px-0" onClick={toggleTheme}>
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
}