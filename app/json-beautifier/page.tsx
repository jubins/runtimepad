"use client";

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { MonacoEditor } from '@/components/editors/monaco-editor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Copy, Download, Sparkles, Minimize2 } from 'lucide-react';
import { formatJson, minifyJson, validateJson } from '@/utils/json-formatter';
import { toast } from 'sonner';

export default function JsonBeautifierPage() {
  const [input, setInput] = useState('{\n  "name": "John Doe",\n  "age": 30,\n  "city": "New York",\n  "hobbies": ["reading", "coding", "traveling"],\n  "address": {\n    "street": "123 Main St",\n    "zipCode": "10001"\n  }\n}');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  // Validate JSON on input change
  const handleInputChange = (value: string | undefined) => {
    const newInput = value || '';
    setInput(newInput);
    
    if (newInput.trim()) {
      const result = validateJson(newInput);
      setIsValid(result.valid);
      setError(result.error || null);
    } else {
      setIsValid(null);
      setError(null);
    }
  };

  const handleBeautify = () => {
    if (!input.trim()) {
      toast.error('Please enter some JSON to beautify');
      return;
    }

    const result = formatJson(input);
    if (result.error) {
      setError(result.error);
      setIsValid(false);
      setOutput('');
      toast.error('Invalid JSON format');
    } else {
      setOutput(result.formatted);
      setError(null);
      setIsValid(true);
      toast.success('JSON beautified successfully');
    }
  };

  const handleMinify = () => {
    if (!input.trim()) {
      toast.error('Please enter some JSON to minify');
      return;
    }

    const result = minifyJson(input);
    if (result.error) {
      setError(result.error);
      setIsValid(false);
      setOutput('');
      toast.error('Invalid JSON format');
    } else {
      setOutput(result.minified);
      setError(null);
      setIsValid(true);
      toast.success('JSON minified successfully');
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
      const blob = new Blob([output], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'formatted.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('File downloaded');
    }
  };

  const getValidationBadge = () => {
    if (isValid === null) return null;
    
    if (isValid) {
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
          <CheckCircle className="w-3 h-3 mr-1" />
          Valid JSON
        </Badge>
      );
    } else {
      return (
        <Badge variant="destructive">
          <AlertCircle className="w-3 h-3 mr-1" />
          Invalid JSON
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
            <h1 className="text-3xl font-bold mb-2">JSON Beautifier</h1>
            <p className="text-muted-foreground">
              Format, validate, and beautify your JSON data with syntax highlighting and error detection.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-6">
            <Button onClick={handleBeautify} size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
              <Sparkles className="w-4 h-4 mr-2" />
              Beautify JSON
            </Button>
            <Button onClick={handleMinify} variant="outline" size="lg">
              <Minimize2 className="w-4 h-4 mr-2" />
              Minify JSON
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Input JSON
                  <div className="flex items-center space-x-2">
                    {getValidationBadge()}
                  </div>
                </CardTitle>
                <CardDescription>
                  Paste your JSON data here to format or validate it.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <MonacoEditor
                  height="500px"
                  language="json"
                  value={input}
                  onChange={handleInputChange}
                  className="border-t"
                />
                {error && (
                  <div className="p-4 bg-destructive/10 border-t">
                    <p className="text-sm text-destructive flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="break-all">{error}</span>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Formatted Output
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
                  The formatted JSON will appear here after processing.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <MonacoEditor
                  height="500px"
                  language="json"
                  value={output}
                  options={{
                    readOnly: true,
                  }}
                  className="border-t"
                />
                {!output && (
                  <div className="p-8 text-center text-muted-foreground">
                    <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Click "Beautify JSON" or "Minify JSON" to see the formatted output here.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Privacy Notice */}
          <div className="mt-8 p-4 bg-muted/30 rounded-lg border">
            <p className="text-sm text-muted-foreground text-center">
              🔒 <strong>Privacy First:</strong> Your JSON data is processed entirely in your browser. 
              We don't store or transmit any of your data to our servers.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}