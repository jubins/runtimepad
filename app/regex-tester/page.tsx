"use client";

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { MonacoEditor } from '@/components/editors/monaco-editor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, CheckCircle, Search, Copy, RotateCcw, Lightbulb } from 'lucide-react';
import { toast } from 'sonner';

interface Match {
  match: string;
  index: number;
  groups: string[];
}

const regexExamples = [
  { name: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', description: 'Matches email addresses' },
  { name: 'Phone (US)', pattern: '\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})', description: 'Matches US phone numbers' },
  { name: 'URL', pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)', description: 'Matches HTTP/HTTPS URLs' },
  { name: 'IPv4', pattern: '\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b', description: 'Matches IPv4 addresses' },
  { name: 'Date (MM/DD/YYYY)', pattern: '\\b(0?[1-9]|1[0-2])\\/(0?[1-9]|[12][0-9]|3[01])\\/(19|20)\\d\\d\\b', description: 'Matches MM/DD/YYYY dates' },
  { name: 'Hex Color', pattern: '#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})', description: 'Matches hex color codes' },
];

const sampleText = `Here are some sample data to test regex patterns:

Email addresses:
john.doe@example.com
jane_smith@company.org
user123+tag@domain.co.uk

Phone numbers:
(555) 123-4567
555-123-4567
555.123.4567
5551234567

URLs:
https://www.example.com
http://subdomain.site.org/path?param=value
https://github.com/user/repo

IP Addresses:
192.168.1.1
10.0.0.1
172.16.254.1

Dates:
12/25/2023
1/1/2024
03/15/2023

Hex Colors:
#FF5733
#3498db
#2ecc71
#f39c12`;

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
  const [testText, setTestText] = useState(sampleText);
  const [flags, setFlags] = useState({
    global: true,
    ignoreCase: false,
    multiline: true,
    dotAll: false,
    unicode: false,
    sticky: false,
  });
  const [matches, setMatches] = useState<Match[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    testRegex();
  }, [pattern, testText, flags]);

  const testRegex = () => {
    if (!pattern.trim()) {
      setMatches([]);
      setError(null);
      setIsValid(null);
      return;
    }

    try {
      const flagString = Object.entries(flags)
        .filter(([_, enabled]) => enabled)
        .map(([flag, _]) => {
          switch (flag) {
            case 'global': return 'g';
            case 'ignoreCase': return 'i';
            case 'multiline': return 'm';
            case 'dotAll': return 's';
            case 'unicode': return 'u';
            case 'sticky': return 'y';
            default: return '';
          }
        })
        .join('');

      const regex = new RegExp(pattern, flagString);
      const foundMatches: Match[] = [];
      
      if (flags.global) {
        let match;
        while ((match = regex.exec(testText)) !== null) {
          foundMatches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
          });
          
          // Prevent infinite loop on zero-length matches
          if (match.index === regex.lastIndex) {
            regex.lastIndex++;
          }
        }
      } else {
        const match = regex.exec(testText);
        if (match) {
          foundMatches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
          });
        }
      }

      setMatches(foundMatches);
      setError(null);
      setIsValid(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid regular expression');
      setMatches([]);
      setIsValid(false);
    }
  };

  const handleFlagChange = (flag: keyof typeof flags, checked: boolean) => {
    setFlags(prev => ({ ...prev, [flag]: checked }));
  };

  const handleExampleSelect = (example: typeof regexExamples[0]) => {
    setPattern(example.pattern);
    toast.success(`Loaded example: ${example.name}`);
  };

  const handleCopyPattern = async () => {
    await navigator.clipboard.writeText(pattern);
    toast.success('Pattern copied to clipboard');
  };

  const handleReset = () => {
    setPattern('');
    setTestText('');
    setMatches([]);
    setError(null);
    setIsValid(null);
    setFlags({
      global: true,
      ignoreCase: false,
      multiline: true,
      dotAll: false,
      unicode: false,
      sticky: false,
    });
    toast.success('Reset complete');
  };

  const getValidationBadge = () => {
    if (isValid === null) return null;
    
    if (isValid) {
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
          <CheckCircle className="w-3 h-3 mr-1" />
          Valid Pattern
        </Badge>
      );
    } else {
      return (
        <Badge variant="destructive">
          <AlertCircle className="w-3 h-3 mr-1" />
          Invalid Pattern
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
            <h1 className="text-3xl font-bold mb-2">Regex Tester</h1>
            <p className="text-muted-foreground">
              Test regular expressions against sample text with real-time matching and detailed results.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pattern Input and Flags */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Regular Expression
                    <div className="flex items-center space-x-2">
                      {getValidationBadge()}
                    </div>
                  </CardTitle>
                  <CardDescription>
                    Enter your regex pattern and configure flags.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="pattern">Pattern</Label>
                    <div className="flex space-x-2 mt-1">
                      <Input
                        id="pattern"
                        value={pattern}
                        onChange={(e) => setPattern(e.target.value)}
                        placeholder="Enter regex pattern..."
                        className="font-mono"
                      />
                      <Button variant="outline" size="sm" onClick={handleCopyPattern}>
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {error && (
                    <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                      <p className="text-sm text-destructive flex items-center">
                        <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>{error}</span>
                      </p>
                    </div>
                  )}

                  <div>
                    <Label>Flags</Label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {Object.entries(flags).map(([flag, enabled]) => (
                        <div key={flag} className="flex items-center space-x-2">
                          <Checkbox
                            id={flag}
                            checked={enabled}
                            onCheckedChange={(checked) => handleFlagChange(flag as keyof typeof flags, checked as boolean)}
                          />
                          <Label htmlFor={flag} className="text-sm">
                            {flag === 'global' && 'Global (g)'}
                            {flag === 'ignoreCase' && 'Ignore Case (i)'}
                            {flag === 'multiline' && 'Multiline (m)'}
                            {flag === 'dotAll' && 'Dot All (s)'}
                            {flag === 'unicode' && 'Unicode (u)'}
                            {flag === 'sticky' && 'Sticky (y)'}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button onClick={testRegex} size="sm" className="flex-1">
                      <Search className="w-4 h-4 mr-2" />
                      Test
                    </Button>
                    <Button onClick={handleReset} variant="outline" size="sm">
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Examples */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Lightbulb className="w-5 h-5" />
                    <span>Common Patterns</span>
                  </CardTitle>
                  <CardDescription>
                    Click to load common regex examples.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {regexExamples.map((example, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start h-auto p-3"
                        onClick={() => handleExampleSelect(example)}
                      >
                        <div className="text-left">
                          <div className="font-medium">{example.name}</div>
                          <div className="text-xs text-muted-foreground">{example.description}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Test Text and Results */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Test Text</CardTitle>
                  <CardDescription>
                    Enter or paste the text you want to test your regex against.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <MonacoEditor
                    height="300px"
                    language="plaintext"
                    value={testText}
                    onChange={(value) => setTestText(value || '')}
                    className="border-t"
                    options={{
                      wordWrap: 'on',
                      minimap: { enabled: false },
                    }}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Matches
                    <Badge variant="outline">
                      {matches.length} match{matches.length !== 1 ? 'es' : ''}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    All matches found in the test text with their positions and capture groups.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {matches.length > 0 ? (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {matches.map((match, index) => (
                        <div key={index} className="p-3 border rounded-lg bg-muted/30">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="secondary">Match {index + 1}</Badge>
                            <span className="text-xs text-muted-foreground">
                              Position: {match.index}-{match.index + match.match.length}
                            </span>
                          </div>
                          <div className="font-mono text-sm bg-background p-2 rounded border">
                            {match.match}
                          </div>
                          {match.groups.length > 0 && (
                            <div className="mt-2">
                              <Label className="text-xs">Capture Groups:</Label>
                              <div className="space-y-1 mt-1">
                                {match.groups.map((group, groupIndex) => (
                                  <div key={groupIndex} className="text-xs">
                                    <span className="text-muted-foreground">Group {groupIndex + 1}:</span>
                                    <span className="font-mono ml-2 bg-muted px-1 rounded">
                                      {group || '(empty)'}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No matches found. Try adjusting your pattern or test text.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="mt-8 p-4 bg-muted/30 rounded-lg border">
            <p className="text-sm text-muted-foreground text-center">
              🔒 <strong>Privacy First:</strong> All regex testing happens in your browser. 
              Your patterns and test data never leave your device.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}