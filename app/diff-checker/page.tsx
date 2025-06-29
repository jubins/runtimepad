"use client";

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { MonacoEditor } from '@/components/editors/monaco-editor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { GitCompare, RotateCcw } from 'lucide-react';
import { generateDiff, DiffLine } from '@/utils/diff-utils';
import { toast } from 'sonner';

const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'json', label: 'JSON' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'python', label: 'Python' },
  { value: 'markdown', label: 'Markdown' },
  { value: 'plaintext', label: 'Plain Text' },
];

export default function DiffCheckerPage() {
  const [leftText, setLeftText] = useState('function hello() {\n  console.log("Hello World!");\n}');
  const [rightText, setRightText] = useState('function hello() {\n  console.log("Hello Universe!");\n  return true;\n}');
  const [language, setLanguage] = useState('javascript');
  const [diffResult, setDiffResult] = useState<DiffLine[]>([]);
  const [showDiff, setShowDiff] = useState(false);

  const handleCompare = () => {
    const diff = generateDiff(leftText, rightText);
    setDiffResult(diff);
    setShowDiff(true);
    
    const addedLines = diff.filter(line => line.type === 'added').length;
    const removedLines = diff.filter(line => line.type === 'removed').length;
    
    toast.success(`Comparison complete: ${addedLines} additions, ${removedLines} deletions`);
  };

  const handleReset = () => {
    setLeftText('');
    setRightText('');
    setDiffResult([]);
    setShowDiff(false);
    toast.success('Editor reset');
  };

  const getDiffStats = () => {
    const added = diffResult.filter(line => line.type === 'added').length;
    const removed = diffResult.filter(line => line.type === 'removed').length;
    const unchanged = diffResult.filter(line => line.type === 'unchanged').length;
    return { added, removed, unchanged };
  };

  const stats = getDiffStats();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Diff Checker</h1>
            <p className="text-muted-foreground">
              Compare text and code files with advanced diff visualization and syntax highlighting.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            <div className="flex items-center space-x-4">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button onClick={handleCompare} size="lg">
                <GitCompare className="w-4 h-4 mr-2" />
                Compare
              </Button>
              <Button onClick={handleReset} variant="outline" size="lg">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>

          {showDiff && (
            <div className="mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Comparison Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      +{stats.added} additions
                    </Badge>
                    <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
                      -{stats.removed} deletions
                    </Badge>
                    <Badge variant="secondary">
                      {stats.unchanged} unchanged
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {!showDiff ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Original Text</CardTitle>
                  <CardDescription>
                    Paste the original text or code here.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <MonacoEditor
                    height="500px"
                    language={language}
                    value={leftText}
                    onChange={(value) => setLeftText(value || '')}
                    className="border-t"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Modified Text</CardTitle>
                  <CardDescription>
                    Paste the modified text or code here.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <MonacoEditor
                    height="500px"
                    language={language}
                    value={rightText}
                    onChange={(value) => setRightText(value || '')}
                    className="border-t"
                  />
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Diff Results</CardTitle>
                <CardDescription>
                  Lines highlighted in green are additions, red are deletions.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[600px] overflow-auto border-t">
                  <div className="font-mono text-sm">
                    {diffResult.map((line, index) => (
                      <div
                        key={index}
                        className={`px-4 py-1 ${
                          line.type === 'added'
                            ? 'bg-green-100 dark:bg-green-900/30 border-l-4 border-green-500'
                            : line.type === 'removed'
                            ? 'bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500'
                            : 'hover:bg-muted/50'
                        }`}
                      >
                        <span className="text-muted-foreground mr-4 select-none">
                          {line.lineNumber || ' '}
                        </span>
                        <span className={`${
                          line.type === 'added' ? 'text-green-800 dark:text-green-200' :
                          line.type === 'removed' ? 'text-red-800 dark:text-red-200' :
                          ''
                        }`}>
                          {line.type === 'added' ? '+ ' : line.type === 'removed' ? '- ' : '  '}
                          {line.content}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}