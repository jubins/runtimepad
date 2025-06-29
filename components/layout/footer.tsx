import Link from 'next/link';
import Image from 'next/image';
import { Github, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Image 
                src="https://huggingface.co/datasets/jubinsoni/runtimepad/resolve/main/favicon.svg" 
                alt="RuntimePad" 
                width={32} 
                height={32} 
                className="h-8 w-8"
              />
              <h3 className="text-xl font-bold">RuntimePad</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              Professional developer tools designed for productivity, privacy, and collaboration. 
              Built by developers, for developers.
            </p>
            <div className="flex items-center space-x-4">
              <Link 
                href="https://github.com/jubins" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Tools */}
          <div className="space-y-6">
            <h4 className="font-semibold text-foreground">Developer Tools</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/json-beautifier" 
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  JSON Beautifier
                </Link>
              </li>
              <li>
                <Link 
                  href="/diff-checker" 
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Diff Checker
                </Link>
              </li>
              <li>
                <Link 
                  href="/editor" 
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Code Editor
                </Link>
              </li>
              <li>
                <span className="text-muted-foreground/60 text-sm">More tools coming soon...</span>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div className="space-y-6">
            <h4 className="font-semibold text-foreground">Support & Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/faq" 
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link 
                  href="/privacy" 
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link 
                  href="/security" 
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2025 RuntimePad. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>for developers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}