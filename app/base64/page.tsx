"use client";

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { MonacoEditor } from '@/components/editors/monaco-editor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, CheckCircle, Copy, Download, Lock, Unlock, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

export default function Base64Page() {
  const [input, setInput] = useState('Hello, World! This is a sample text to encode.');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const handleEncode = () => {
    if (!input.trim()) {
      toast.error('Please enter some text to encode');
      return;
    }

    try {
      const encoded = btoa(unescape(encodeURIComponent(input)));
      setOutput(encoded);
      setError(null);
      setIsValid(true);
      toast.success('Text encoded successfully');
    } catch (error) {
      setError('Failed to encode text');
      setIsValid(false);
      setOutput('');
      toast.error('Failed to encode text');
    }
  };

  const handleDecode = () => {
    if (!input.trim()) {
      toast.error('Please enter some Base64 to decode');
      return;
    }

    try {
      const decoded = decodeURIComponent(escape(atob(input)));
      setOutput(decoded);
      setError(null);
      setIsValid(true);
      toast.success('Base64 decoded successfully');
    } catch (error) {
      setError('Invalid Base64 format');
      setIsValid(false);
      setOutput('');
      toast.error('Invalid Base64 format');
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
      const blob = new Blob([output], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${mode === 'encode' ? 'encoded' : 'decoded'}.txt`;
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
      setMode(mode === 'encode' ? 'decode' : 'encode');
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

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Base64 Encoder / Decoder</h1>
            <p className="text-muted-foreground">
              Encode text to Base64 or decode Base64 back to readable text with real-time validation.
            </p>
          </div>

          <Tabs value={mode} onValueChange={(value) => setMode(value as 'encode' | 'decode')} className="mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="encode" className="flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>Encode</span>
              </TabsTrigger>
              <TabsTrigger value="decode" className="flex items-center space-x-2">
                <Unlock className="w-4 h-4" />
                <span>Decode</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-6">
            <Button 
              onClick={mode === 'encode' ? handleEncode : handleDecode} 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            >
              {mode === 'encode' ? (
                <>
                  <Lock className="w-4 h-4 mr-2" />
                  Encode to Base64
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4 mr-2" />
                  Decode from Base64
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {mode === 'encode' ? 'Plain Text Input' : 'Base64 Input'}
                  <div className="flex items-center space-x-2">
                    {getValidationBadge()}
                  </div>
                </CardTitle>
                <CardDescription>
                  {mode === 'encode' 
                    ? 'Enter the text you want to encode to Base64.'
                    : 'Paste the Base64 string you want to decode.'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <MonacoEditor
                  height="400px"
                  language="plaintext"
                  value={input}
                  onChange={(value) => setInput(value || '')}
                  className="border-t"
                  options={{
                    wordWrap: 'on',
                    minimap: { enabled: false },
                    lineNumbers: 'off',
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
                  {mode === 'encode' ? 'Base64 Output' : 'Decoded Text Output'}
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
                  {mode === 'encode' 
                    ? 'The Base64 encoded result will appear here.'
                    : 'The decoded plain text will appear here.'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <MonacoEditor
                  height="400px"
                  language="plaintext"
                  value={output}
                  options={{
                    readOnly: true,
                    wordWrap: 'on',
                    minimap: { enabled: false },
                    lineNumbers: 'off',
                  }}
                  className="border-t"
                />
                {!output && (
                  <div className="p-8 text-center text-muted-foreground">
                    <div className="w-12 h-12 mx-auto mb-4 opacity-50">
                      {mode === 'encode' ? <Lock className="w-12 h-12" /> : <Unlock className="w-12 h-12" />}
                    </div>
                    <p>
                      Click "{mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}" to see the result here.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Info Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What is Base64?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. 
                  It's commonly used for encoding data in email, storing complex data in XML or JSON, and embedding 
                  images in HTML/CSS.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Common Use Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Embedding images in HTML/CSS (data URLs)</li>
                  <li>• Email attachments (MIME encoding)</li>
                  <li>• API authentication tokens</li>
                  <li>• Storing binary data in JSON/XML</li>
                  <li>• URL-safe data transmission</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Privacy Notice */}
          <div className="mt-8 p-4 bg-muted/30 rounded-lg border">
            <p className="text-sm text-muted-foreground text-center">
              🔒 <strong>Privacy First:</strong> All encoding and decoding happens in your browser. 
              Your data never leaves your device.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}