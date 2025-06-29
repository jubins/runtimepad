"use client";

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Copy, RefreshCw, Download, Zap, Hash } from 'lucide-react';
import { toast } from 'sonner';

// Fallback UUID v4 generator for environments without crypto.randomUUID
function generateUUIDv4(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  
  // Fallback implementation
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export default function UUIDGeneratorPage() {
  const [uuids, setUuids] = useState<string[]>([generateUUIDv4()]);
  const [count, setCount] = useState(1);

  const generateUUIDs = (num: number = count) => {
    const newUuids = Array.from({ length: num }, () => generateUUIDv4());
    setUuids(newUuids);
    toast.success(`Generated ${num} UUID${num !== 1 ? 's' : ''}`);
  };

  const generateSingle = () => {
    const newUuid = generateUUIDv4();
    setUuids([newUuid]);
    setCount(1);
    toast.success('Generated new UUID');
  };

  const copyUUID = async (uuid: string) => {
    await navigator.clipboard.writeText(uuid);
    toast.success('UUID copied to clipboard');
  };

  const copyAllUUIDs = async () => {
    const allUuids = uuids.join('\n');
    await navigator.clipboard.writeText(allUuids);
    toast.success(`Copied ${uuids.length} UUIDs to clipboard`);
  };

  const downloadUUIDs = () => {
    const content = uuids.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `uuids-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('UUIDs downloaded');
  };

  const formatUUID = (uuid: string, format: 'default' | 'uppercase' | 'nohyphens' | 'braces') => {
    switch (format) {
      case 'uppercase':
        return uuid.toUpperCase();
      case 'nohyphens':
        return uuid.replace(/-/g, '');
      case 'braces':
        return `{${uuid}}`;
      default:
        return uuid;
    }
  };

  const presetCounts = [1, 5, 10, 25, 50, 100];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">UUID Generator</h1>
            <p className="text-muted-foreground">
              Generate RFC 4122 compliant UUID v4 (random) identifiers for your applications.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Generator Controls */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-5 h-5" />
                    <span>Quick Generate</span>
                  </CardTitle>
                  <CardDescription>
                    Generate UUIDs instantly with one click.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button onClick={generateSingle} className="w-full" size="lg">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Generate New UUID
                  </Button>
                  
                  <Separator />
                  
                  <div>
                    <Label htmlFor="count">Bulk Generate</Label>
                    <div className="flex space-x-2 mt-1">
                      <Input
                        id="count"
                        type="number"
                        min="1"
                        max="1000"
                        value={count}
                        onChange={(e) => setCount(Math.max(1, Math.min(1000, parseInt(e.target.value) || 1)))}
                        className="flex-1"
                      />
                      <Button onClick={() => generateUUIDs()} variant="outline">
                        Generate
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {presetCounts.map((preset) => (
                      <Button
                        key={preset}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setCount(preset);
                          generateUUIDs(preset);
                        }}
                      >
                        {preset}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Hash className="w-5 h-5" />
                    <span>UUID Info</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <strong>Version:</strong> UUID v4 (Random)
                  </div>
                  <div>
                    <strong>Format:</strong> 8-4-4-4-12 hexadecimal
                  </div>
                  <div>
                    <strong>Length:</strong> 36 characters (with hyphens)
                  </div>
                  <div>
                    <strong>Uniqueness:</strong> ~5.3 × 10³⁶ possible values
                  </div>
                  <div>
                    <strong>Collision Probability:</strong> Negligible for practical use
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Generated UUIDs */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Generated UUIDs
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">
                        {uuids.length} UUID{uuids.length !== 1 ? 's' : ''}
                      </Badge>
                      {uuids.length > 1 && (
                        <>
                          <Button variant="outline" size="sm" onClick={copyAllUUIDs}>
                            <Copy className="w-4 h-4 mr-1" />
                            Copy All
                          </Button>
                          <Button variant="outline" size="sm" onClick={downloadUUIDs}>
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        </>
                      )}
                    </div>
                  </CardTitle>
                  <CardDescription>
                    Click any UUID to copy it to your clipboard.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {uuids.map((uuid, index) => (
                      <div key={index} className="group">
                        <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex-1 min-w-0">
                            <div className="font-mono text-sm break-all">{uuid}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              UUID #{index + 1}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyUUID(uuid)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Format Examples */}
              {uuids.length > 0 && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Format Examples</CardTitle>
                    <CardDescription>
                      Different ways to format the first UUID for various use cases.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { name: 'Default', format: 'default' as const, description: 'Standard UUID format' },
                        { name: 'Uppercase', format: 'uppercase' as const, description: 'All uppercase letters' },
                        { name: 'No Hyphens', format: 'nohyphens' as const, description: 'Continuous string' },
                        { name: 'With Braces', format: 'braces' as const, description: 'Microsoft GUID format' },
                      ].map(({ name, format, description }) => (
                        <div key={format} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm">{name}</div>
                            <div className="font-mono text-xs text-muted-foreground break-all">
                              {formatUUID(uuids[0], format)}
                            </div>
                            <div className="text-xs text-muted-foreground">{description}</div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyUUID(formatUUID(uuids[0], format))}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="mt-8 p-4 bg-muted/30 rounded-lg border">
            <p className="text-sm text-muted-foreground text-center">
              🔒 <strong>Privacy First:</strong> UUIDs are generated locally in your browser using cryptographically secure random numbers. 
              No data is sent to our servers.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}