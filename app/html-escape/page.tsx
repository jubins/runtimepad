"use client";

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { MonacoEditor } from '@/components/editors/monaco-editor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, CheckCircle, Copy, Download, Shield, ShieldOff, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

const htmlEntities: { [key: string]: string } = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

const htmlEntitiesReverse: { [key: string]: string } = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#x27;': "'",
  '&#39;': "'",
  '&#x2F;': '/',
  '&#x60;': '`',
  '&#x3D;': '=',
  '&nbsp;': ' ',
  '&copy;': '©',
  '&reg;': '®',
  '&trade;': '™',
  '&hellip;': '…',
  '&mdash;': '—',
  '&ndash;': '–',
  '&lsquo;': '‘',
  '&rsquo;': '’',
  '&ldquo;': '"',
  '&rdquo;': '"'
};

const sampleHtml = `<div class="example">
  <h1>Welcome to "My Website"</h1>
  <p>This is a sample HTML with special characters:</p>
  <ul>
    <li>Ampersand: AT&T</li>
    <li>Less than: 5 < 10</li>
    <li>Greater than: 10 > 5</li>
    <li>Quotes: "Hello" & 'World'</li>
  </ul>
  <script>
    const message = "Hello & welcome!";
    if (x < y && y > z) {
      console.log('Complex condition');
    }
  </script>
</div>`;

export default function HtmlEscapePage() {
  const [input, setInput] = useState(sampleHtml);
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [mode, setMode] = useState<'escape' | 'unescape'>('escape');

  const escapeHtml = (text: string): string => {
    return text.replace(/[&<>"'`=\/]/g, (match) => htmlEntities[match] || match);
  };

  const unescapeHtml = (text: string): string => {
    // First handle named entities
    let result = text.replace(/&[a-zA-Z][a-zA-Z0-9]*;/g, (match) => {
      return htmlEntitiesReverse[match] || match;
    });
    
    // Then handle numeric entities
    result = result.replace(/&#(\d+);/g, (match, dec) => {
      return String.fromCharCode(parseInt(dec, 10));
    });
    
    // Handle hex entities
    result = result.replace(/&#x([a-fA-F0-9]+);/g, (match, hex) => {
      return String.fromCharCode(parseInt(hex, 16));
    });
    
    return result;
  };

  const handleEscape = () => {
    if (!input.trim()) {
      toast.error('Please enter some HTML to escape');
      return;
    }

    try {
      const escaped = escapeHtml(input);
      setOutput(escaped);
      setError(null);
      setIsValid(true);
      toast.success('HTML escaped successfully');
    } catch (error) {
      setError('Failed to escape HTML');
      setIsValid(false);
      setOutput('');
      toast.error('Failed to escape HTML');
    }
  };

  const handleUnescape = () => {
    if (!input.trim()) {
      toast.error('Please enter some escaped HTML to unescape');
      return;
    }

    try {
      const unescaped = unescapeHtml(input);
      setOutput(unescaped);
      setError(null);
      setIsValid(true);
      toast.success('HTML unescaped successfully');
    } catch (error) {
      setError('Failed to unescape HTML');
      setIsValid(false);
      setOutput('');
      toast.error('Failed to unescape HTML');
    }
  };

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      toast.success('Copied to clipboard');
    }
  };

  const handleDownload = () => {
    if (output) {
      const blob = new Blob([output], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${mode === 'escape' ? 'escaped' : 'unescaped'}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('File downloaded');
    }
  };

  const handleReset = () => {
    setInput('');
    setOutput('');
    setError(null);
    setIsValid(null);
    toast.success('Reset complete');
  };

  const handleSwap = () => {
    if (output) {
      setInput(output);
      setOutput('');
      setMode(mode === 'escape' ? 'unescape' : 'escape');
      setError(null);
      setIsValid(null);
      toast.success('Input and output swapped');
    }
  };

  const getValidationBadge = () => {
    if (isValid === null) return null;
    
    if (isValid) {
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
          <CheckCircle className="w-3 h-3 mr-1" />
          Success
        </Badge>
      );
    } else {
      return (
        <Badge variant="destructive">
          <AlertCircle className="w-3 h-3 mr-1" />
          Error
        </Badge>
      );
    }
  };

  const commonEntities = [
    { char: '&', entity: '&amp;', description: 'Ampersand' },
    { char: '<', entity: '&lt;', description: 'Less than' },
    { char: '>', entity: '&gt;', description: 'Greater than' },
    { char: '"', entity: '&quot;', description: 'Double quote' },
    { char: "'", entity: '&#x27;', description: 'Single quote' },
    { char: '/', entity: '&#x2F;', description: 'Forward slash' },
    { char: ' ', entity: '&nbsp;', description: 'Non-breaking space' },
    { char: '©', entity: '&copy;', description: 'Copyright' },
    { char: '®', entity: '&reg;', description: 'Registered trademark' },
    { char: '™', entity: '&trade;', description: 'Trademark' }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">HTML Escape / Unescape</h1>
            <p className="text-muted-foreground">
              Escape HTML entities to prevent XSS attacks or unescape HTML entities back to readable characters.
            </p>
          </div>

          <Tabs value={mode} onValueChange={(value) => setMode(value as 'escape' | 'unescape')} className="mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="escape" className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Escape</span>
              </TabsTrigger>
              <TabsTrigger value="unescape" className="flex items-center space-x-2">
                <ShieldOff className="w-4 h-4" />
                <span>Unescape</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-6">
            <Button 
              onClick={mode === 'escape' ? handleEscape : handleUnescape} 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            >
              {mode === 'escape' ? (
                <>
                  <Shield className="w-4 h-4 mr-2" />
                  Escape HTML
                </>
              ) : (
                <>
                  <ShieldOff className="w-4 h-4 mr-2" />
                  Unescape HTML
                </>
              )}
            </Button>
            <Button onClick={handleSwap} variant="outline" size="lg" disabled={!output}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Swap & Switch Mode
            </Button>
            <Button onClick={handleReset} variant="outline" size="lg">
              Reset
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Input and Output */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {mode === 'escape' ? 'HTML Input' : 'Escaped HTML Input'}
                    <div className="flex items-center space-x-2">
                      {getValidationBadge()}
                    </div>
                  </CardTitle>
                  <CardDescription>
                    {mode === 'escape' 
                      ? 'Enter HTML content that you want to escape for safe display.'
                      : 'Paste escaped HTML entities that you want to convert back to readable text.'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <MonacoEditor
                    height="300px"
                    language="html"
                    value={input}
                    onChange={(value) => setInput(value || '')}
                    className="border-t"
                    options={{
                      wordWrap: 'on',
                      minimap: { enabled: false },
                    }}
                  />
                  {error && (
                    <div className="p-4 bg-destructive/10 border-t">
                      <p className="text-sm text-destructive flex items-center">
                        <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>{error}</span>
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {mode === 'escape' ? 'Escaped HTML Output' : 'Unescaped HTML Output'}
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopy}
                        disabled={!output}
                      >
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDownload}
                        disabled={!output}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    {mode === 'escape' 
                      ? 'The HTML with escaped entities, safe for display in web pages.'
                      : 'The unescaped HTML with readable characters.'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <MonacoEditor
                    height="300px"
                    language={mode === 'escape' ? 'plaintext' : 'html'}
                    value={output}
                    options={{
                      readOnly: true,
                      wordWrap: 'on',
                      minimap: { enabled: false },
                    }}
                    className="border-t"
                  />
                  {!output && (
                    <div className="p-8 text-center text-muted-foreground">
                      <div className="w-12 h-12 mx-auto mb-4 opacity-50">
                        {mode === 'escape' ? <Shield className="w-12 h-12" /> : <ShieldOff className="w-12 h-12" />}
                      </div>
                      <p>
                        Click "{mode === 'escape' ? 'Escape HTML' : 'Unescape HTML'}" to see the result here.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Reference */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>HTML Entity Reference</CardTitle>
                  <CardDescription>
                    Common HTML entities and their escaped forms.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {commonEntities.map((item, index) => (
                      <div key={index} className="p-3 border rounded-lg bg-muted/30">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-lg">{item.char}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigator.clipboard.writeText(item.entity)}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                        <div className="font-mono text-xs text-muted-foreground mb-1">
                          {item.entity}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {item.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Why Escape HTML?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  HTML escaping prevents Cross-Site Scripting (XSS) attacks by converting special characters 
                  into their HTML entity equivalents. This ensures that user input is displayed as text 
                  rather than being interpreted as HTML or JavaScript code.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Common Use Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Displaying user-generated content safely</li>
                  <li>• Preventing XSS attacks in web applications</li>
                  <li>• Storing HTML content in databases</li>
                  <li>• Email template preparation</li>
                  <li>• API response sanitization</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Privacy Notice */}
          <div className="mt-8 p-4 bg-muted/30 rounded-lg border">
            <p className="text-sm text-muted-foreground text-center">
              🔒 <strong>Privacy First:</strong> All HTML escaping and unescaping happens in your browser. 
              Your data never leaves your device.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}