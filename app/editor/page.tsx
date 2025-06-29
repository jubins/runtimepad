// app/editor/page.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { MonacoEditor } from '@/components/editors/monaco-editor';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Share2, Save, Plus, Settings, Edit3, X, ChevronDown } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
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

export default function EditorPage() {
  const router = useRouter();
  const [code, setCode] = useState('// Welcome to RuntimePad Code Editor\n// Start typing your code here...\n\nfunction hello() {\n  console.log("Hello, World!");\n}\n\nhello();');
  const [language, setLanguage] = useState('javascript');
  const [title, setTitle] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleCreateSession = () => {
    const sessionId = uuidv4();
    router.push(`/editor/${sessionId}`);
  };

  const handleSaveLocal = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title || 'code'}.${language === 'javascript' ? 'js' : language === 'typescript' ? 'ts' : 'txt'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('File saved locally');
  };

  const handleShare = async () => {
    const shareData = {
      title: 'RuntimePad Code Editor',
      text: 'Check out my code snippet',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success('Shared successfully');
      } catch (error) {
        // Fallback to clipboard
        await navigator.clipboard.writeText(window.location.href);
        toast.success('URL copied to clipboard');
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('URL copied to clipboard');
    }
  };

  const handleTitleSubmit = () => {
    setIsEditingTitle(false);
  };

  return (
    <TooltipProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        
        <main className="flex-1 py-8">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Code Editor</h1>
              <p className="text-muted-foreground">
                Write, edit, and share your code with syntax highlighting and collaborative features.
              </p>
            </div>

            <div className="relative">
              <Card>
                {/* Editor Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <div className="flex items-center space-x-4">
                    {/* Editable Title */}
                    {isEditingTitle ? (
                      <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={handleTitleSubmit}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleTitleSubmit();
                          }
                          if (e.key === 'Escape') {
                            setIsEditingTitle(false);
                          }
                        }}
                        className="text-lg font-semibold border-none p-0 h-auto focus-visible:ring-0"
                        placeholder="Untitled"
                        autoFocus
                      />
                    ) : (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <h2 
                            className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors flex items-center space-x-2"
                            onClick={() => setIsEditingTitle(true)}
                          >
                            <span>{title || 'Untitled'}</span>
                            <Edit3 className="w-4 h-4 opacity-50" />
                          </h2>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Click to edit title</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button onClick={handleCreateSession} variant="default" size="sm">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>New Collaborative Session</p>
                      </TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button onClick={handleShare} variant="outline" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Share</p>
                      </TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button onClick={handleSaveLocal} variant="outline" size="sm">
                          <Save className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Save to computer</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSettingsOpen(!settingsOpen)}
                        >
                          <Settings className="w-4 h-4" />
                          <ChevronDown className={`w-3 h-3 ml-1 transition-transform ${settingsOpen ? 'rotate-180' : ''}`} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Settings</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                {/* Settings Side Panel Overlay */}
                {settingsOpen && (
                  <div className="absolute inset-0 z-50 flex">
                    {/* Backdrop */}
                    <div 
                      className="absolute inset-0 bg-black/20 backdrop-blur-sm" 
                      onClick={() => setSettingsOpen(false)}
                    />
                    
                    {/* Side Panel */}
                    <div className="relative w-80 bg-background border-r shadow-lg ml-auto">
                      <div className="p-6 space-y-6 h-full overflow-y-auto">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">Editor Settings</h3>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSettingsOpen(false)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Language</label>
                            <Select value={language} onValueChange={setLanguage}>
                              <SelectTrigger>
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

                          <div>
                            <label className="text-sm font-medium mb-2 block">Editor Mode</label>
                            <div className="p-3 bg-muted/50 rounded-lg">
                              <p className="text-sm text-muted-foreground">
                                Single-user editor
                              </p>
                            </div>
                          </div>

                          <div>
                            <label className="text-sm font-medium mb-2 block">Editor Options</label>
                            <div className="p-3 bg-muted/50 rounded-lg">
                              <p className="text-sm text-muted-foreground">
                                This is a single-user editor. Create a collaborative session to work with others in real-time.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Main Editor */}
                <CardContent className="p-0">
                  <MonacoEditor
                    height="600px"
                    language={language}
                    value={code}
                    onChange={(value) => setCode(value || '')}
                    options={{
                      wordWrap: 'on',
                      minimap: { enabled: true },
                    }}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Privacy Notice */}
            <div className="mt-8 p-4 bg-muted/30 rounded-lg border">
              <p className="text-sm text-muted-foreground text-center">
                🔒 <strong>Privacy First:</strong> Your code is processed entirely in your browser. 
                We don't store or transmit any of your data to our servers.
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </TooltipProvider>
  );
}