"use client";

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { MonacoEditor } from '@/components/editors/monaco-editor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Type, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

type CaseType = 
  | 'camelCase'
  | 'PascalCase'
  | 'snake_case'
  | 'kebab-case'
  | 'SCREAMING_SNAKE_CASE'
  | 'UPPERCASE'
  | 'lowercase'
  | 'Title Case'
  | 'Sentence case'
  | 'aLtErNaTiNg CaSe'
  | 'iNVERSE cASE';

interface CaseConversion {
  type: CaseType;
  description: string;
  example: string;
  convert: (text: string) => string;
}

const caseConversions: CaseConversion[] = [
  {
    type: 'camelCase',
    description: 'First word lowercase, subsequent words capitalized',
    example: 'helloWorldExample',
    convert: (text: string) => {
      return text
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
          return index === 0 ? word.toLowerCase() : word.toUpperCase();
        })
        .replace(/\s+/g, '');
    }
  },
  {
    type: 'PascalCase',
    description: 'All words capitalized, no spaces',
    example: 'HelloWorldExample',
    convert: (text: string) => {
      return text
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
        .replace(/\s+/g, '');
    }
  },
  {
    type: 'snake_case',
    description: 'All lowercase with underscores',
    example: 'hello_world_example',
    convert: (text: string) => {
      return text
        .replace(/\W+/g, ' ')
        .split(/ |\B(?=[A-Z])/)
        .map(word => word.toLowerCase())
        .join('_');
    }
  },
  {
    type: 'kebab-case',
    description: 'All lowercase with hyphens',
    example: 'hello-world-example',
    convert: (text: string) => {
      return text
        .replace(/\W+/g, ' ')
        .split(/ |\B(?=[A-Z])/)
        .map(word => word.toLowerCase())
        .join('-');
    }
  },
  {
    type: 'SCREAMING_SNAKE_CASE',
    description: 'All uppercase with underscores',
    example: 'HELLO_WORLD_EXAMPLE',
    convert: (text: string) => {
      return text
        .replace(/\W+/g, ' ')
        .split(/ |\B(?=[A-Z])/)
        .map(word => word.toUpperCase())
        .join('_');
    }
  },
  {
    type: 'UPPERCASE',
    description: 'All characters in uppercase',
    example: 'HELLO WORLD EXAMPLE',
    convert: (text: string) => text.toUpperCase()
  },
  {
    type: 'lowercase',
    description: 'All characters in lowercase',
    example: 'hello world example',
    convert: (text: string) => text.toLowerCase()
  },
  {
    type: 'Title Case',
    description: 'First letter of each word capitalized',
    example: 'Hello World Example',
    convert: (text: string) => {
      return text.replace(/\w\S*/g, (txt) => 
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );
    }
  },
  {
    type: 'Sentence case',
    description: 'First letter capitalized, rest lowercase',
    example: 'Hello world example',
    convert: (text: string) => {
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }
  },
  {
    type: 'aLtErNaTiNg CaSe',
    description: 'Alternating uppercase and lowercase letters',
    example: 'hElLo WoRlD eXaMpLe',
    convert: (text: string) => {
      return text
        .split('')
        .map((char, index) => 
          index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
        )
        .join('');
    }
  },
  {
    type: 'iNVERSE cASE',
    description: 'Inverts the case of each character',
    example: 'hELLO wORLD eXAMPLE',
    convert: (text: string) => {
      return text
        .split('')
        .map(char => 
          char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
        )
        .join('');
    }
  }
];

const sampleText = 'Hello World Example Text';

export default function CaseConverterPage() {
  const [input, setInput] = useState(sampleText);
  const [results, setResults] = useState<{ [key in CaseType]: string }>({} as any);

  // Convert text to all cases whenever input changes
  useEffect(() => {
    if (input.trim()) {
      const newResults = {} as { [key in CaseType]: string };
      caseConversions.forEach(conversion => {
        newResults[conversion.type] = conversion.convert(input);
      });
      setResults(newResults);
    } else {
      setResults({} as any);
    }
  }, [input]);

  const handleCopy = async (text: string, caseType: string) => {
    await navigator.clipboard.writeText(text);
    toast.success(`${caseType} copied to clipboard`);
  };

  const handleReset = () => {
    setInput('');
    setResults({} as any);
    toast.success('Reset complete');
  };

  const handleLoadExample = (example: string) => {
    setInput(example);
    toast.success('Example loaded');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Case Converter</h1>
            <p className="text-muted-foreground">
              Transform text between different case formats including camelCase, snake_case, kebab-case, and more.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Input Section */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Type className="w-5 h-5" />
                    <span>Input Text</span>
                  </CardTitle>
                  <CardDescription>
                    Enter the text you want to convert to different cases.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <MonacoEditor
                    height="200px"
                    language="plaintext"
                    value={input}
                    onChange={(value) => setInput(value || '')}
                    options={{
                      wordWrap: 'on',
                      minimap: { enabled: false },
                      lineNumbers: 'off',
                      scrollBeyondLastLine: false,
                    }}
                  />
                  
                  <div className="flex space-x-2">
                    <Button onClick={handleReset} variant="outline" size="sm" className="flex-1">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Quick Examples:</h4>
                    <div className="space-y-1">
                      {[
                        'Hello World Example',
                        'user_name_field',
                        'backgroundColor',
                        'API_KEY_SECRET',
                        'my-component-name'
                      ].map((example) => (
                        <Button
                          key={example}
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start h-auto p-2 text-xs"
                          onClick={() => handleLoadExample(example)}
                        >
                          {example}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Converted Results</CardTitle>
                  <CardDescription>
                    All case format conversions of your input text. Click any result to copy it.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {Object.keys(results).length > 0 ? (
                    <div className="space-y-3">
                      {caseConversions.map((conversion) => {
                        const result = results[conversion.type];
                        return (
                          <div key={conversion.type} className="group">
                            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-1">
                                  <Badge variant="outline" className="font-mono text-xs">
                                    {conversion.type}
                                  </Badge>
                                </div>
                                <div className="font-mono text-sm break-all mb-1">
                                  {result}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {conversion.description}
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleCopy(result, conversion.type)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity ml-2"
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Type className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Enter some text to see all case format conversions.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Common Use Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <strong>camelCase:</strong> JavaScript variables, object properties</li>
                  <li>• <strong>PascalCase:</strong> Class names, component names</li>
                  <li>• <strong>snake_case:</strong> Python variables, database columns</li>
                  <li>• <strong>kebab-case:</strong> CSS classes, URL slugs</li>
                  <li>• <strong>SCREAMING_SNAKE_CASE:</strong> Constants, environment variables</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Programming Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <strong>JavaScript/TypeScript:</strong> camelCase, PascalCase</li>
                  <li>• <strong>Python:</strong> snake_case, SCREAMING_SNAKE_CASE</li>
                  <li>• <strong>CSS/HTML:</strong> kebab-case</li>
                  <li>• <strong>C#/Java:</strong> PascalCase, camelCase</li>
                  <li>• <strong>Ruby:</strong> snake_case</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Privacy Notice */}
          <div className="mt-8 p-4 bg-muted/30 rounded-lg border">
            <p className="text-sm text-muted-foreground text-center">
              🔒 <strong>Privacy First:</strong> All text transformations happen in your browser. 
              Your data never leaves your device.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}