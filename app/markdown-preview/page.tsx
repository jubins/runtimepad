"use client";

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { MonacoEditor } from '@/components/editors/monaco-editor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Download, Eye, Edit, FileText } from 'lucide-react';
import { toast } from 'sonner';

// Simple markdown parser (basic implementation)
function parseMarkdown(markdown: string): string {
  let html = markdown;
  
  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  
  // Bold
  html = html.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');
  html = html.replace(/__(.*?)__/gim, '<strong>$1</strong>');
  
  // Italic
  html = html.replace(/\*(.*)\*/gim, '<em>$1</em>');
  html = html.replace(/_(.*?)_/gim, '<em>$1</em>');
  
  // Code blocks
  html = html.replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>');
  
  // Inline code
  html = html.replace(/`(.*?)`/gim, '<code>$1</code>');
  
  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  
  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/gim, '<img alt="$1" src="$2" style="max-width: 100%; height: auto;" />');
  
  // Lists
  html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
  html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
  html = html.replace(/^\+ (.*$)/gim, '<li>$1</li>');
  html = html.replace(/^(\d+)\. (.*$)/gim, '<li>$2</li>');
  
  // Wrap consecutive list items in ul/ol
  html = html.replace(/(<li>.*<\/li>)/gims, (match) => {
    return `<ul>${match}</ul>`;
  });
  
  // Blockquotes
  html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');
  
  // Horizontal rules
  html = html.replace(/^---$/gim, '<hr>');
  html = html.replace(/^\*\*\*$/gim, '<hr>');
  
  // Line breaks
  html = html.replace(/\n\n/gim, '</p><p>');
  html = html.replace(/\n/gim, '<br>');
  
  // Wrap in paragraphs
  html = `<p>${html}</p>`;
  
  // Clean up empty paragraphs
  html = html.replace(/<p><\/p>/gim, '');
  html = html.replace(/<p>(<h[1-6]>)/gim, '$1');
  html = html.replace(/(<\/h[1-6]>)<\/p>/gim, '$1');
  html = html.replace(/<p>(<ul>)/gim, '$1');
  html = html.replace(/(<\/ul>)<\/p>/gim, '$1');
  html = html.replace(/<p>(<blockquote>)/gim, '$1');
  html = html.replace(/(<\/blockquote>)<\/p>/gim, '$1');
  html = html.replace(/<p>(<hr>)<\/p>/gim, '$1');
  html = html.replace(/<p>(<pre>)/gim, '$1');
  html = html.replace(/(<\/pre>)<\/p>/gim, '$1');
  
  return html;
}

const sampleMarkdown = `# Markdown Preview Demo

Welcome to the **RuntimePad Markdown Previewer**! This tool lets you write markdown and see the HTML preview in real-time.

## Features

- **Real-time preview** as you type
- Support for all common markdown syntax
- Clean, readable output
- Export to HTML

### Supported Syntax

#### Text Formatting
- **Bold text** using \`**bold**\` or \`__bold__\`
- *Italic text* using \`*italic*\` or \`_italic_\`
- \`Inline code\` using backticks

#### Lists
- Unordered lists with \`-\`, \`*\`, or \`+\`
- Ordered lists with numbers
- Nested lists supported

#### Links and Images
- [Links](https://example.com) using \`[text](url)\`
- Images using \`![alt](url)\`

#### Code Blocks
\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

#### Blockquotes
> This is a blockquote
> It can span multiple lines

#### Horizontal Rules
---

### Try It Out!
Start editing this markdown to see the preview update in real-time.`;

export default function MarkdownPreviewPage() {
  const [markdown, setMarkdown] = useState(sampleMarkdown);
  const [html, setHtml] = useState('');
  const [activeTab, setActiveTab] = useState('split');

  useEffect(() => {
    const parsedHtml = parseMarkdown(markdown);
    setHtml(parsedHtml);
  }, [markdown]);

  const handleCopyMarkdown = async () => {
    await navigator.clipboard.writeText(markdown);
    toast.success('Markdown copied to clipboard');
  };

  const handleCopyHtml = async () => {
    await navigator.clipboard.writeText(html);
    toast.success('HTML copied to clipboard');
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Markdown file downloaded');
  };

  const handleDownloadHtml = () => {
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown Document</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1, h2, h3 { color: #333; }
        code { background: #f4f4f4; padding: 2px 4px; border-radius: 3px; }
        pre { background: #f4f4f4; padding: 10px; border-radius: 5px; overflow-x: auto; }
        blockquote { border-left: 4px solid #ddd; margin: 0; padding-left: 20px; color: #666; }
        a { color: #0066cc; }
        hr { border: none; border-top: 1px solid #ddd; margin: 20px 0; }
    </style>
</head>
<body>
    ${html}
</body>
</html>`;
    
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('HTML file downloaded');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Markdown Previewer</h1>
            <p className="text-muted-foreground">
              Write markdown and see the HTML preview in real-time. Perfect for documentation, README files, and content creation.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="edit" className="flex items-center space-x-2">
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </TabsTrigger>
              <TabsTrigger value="split" className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Split</span>
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <TabsContent value="edit" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Markdown Editor
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={handleCopyMarkdown}>
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleDownloadMarkdown}>
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription>
                  Write your markdown content here. Use the preview tab to see the rendered output.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <MonacoEditor
                  height="600px"
                  language="markdown"
                  value={markdown}
                  onChange={(value) => setMarkdown(value || '')}
                  className="border-t"
                  options={{
                    wordWrap: 'on',
                    minimap: { enabled: false },
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="split" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Markdown Editor
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={handleCopyMarkdown}>
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleDownloadMarkdown}>
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <MonacoEditor
                    height="600px"
                    language="markdown"
                    value={markdown}
                    onChange={(value) => setMarkdown(value || '')}
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
                    HTML Preview
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={handleCopyHtml}>
                        <Copy className="w-4 h-4 mr-1" />
                        Copy HTML
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleDownloadHtml}>
                        <Download className="w-4 h-4 mr-1" />
                        Download HTML
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 border-t">
                  <div 
                    className="prose prose-sm max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: html }}
                    style={{
                      minHeight: '500px',
                      lineHeight: '1.6',
                    }}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  HTML Preview
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={handleCopyHtml}>
                      <Copy className="w-4 h-4 mr-1" />
                      Copy HTML
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleDownloadHtml}>
                      <Download className="w-4 h-4 mr-1" />
                      Download HTML
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription>
                  Live preview of your markdown rendered as HTML.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 border-t">
                <div 
                  className="prose prose-sm max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: html }}
                  style={{
                    minHeight: '500px',
                    lineHeight: '1.6',
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Notice */}
          <div className="mt-8 p-4 bg-muted/30 rounded-lg border">
            <p className="text-sm text-muted-foreground text-center">
              🔒 <strong>Privacy First:</strong> All markdown processing happens in your browser. 
              Your content never leaves your device.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}