"use client";

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
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
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
import { Share2, Save, Users, Clock, Settings, UserPlus, Edit3, ChevronDown } from 'lucide-react';
import { supabase } from '@/lib/supabase';
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

// Generate random colors for anonymous users
const AVATAR_COLORS = [
  'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
  'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
];

interface CollaboratorInfo {
  id: string;
  name: string;
  color: string;
  lastSeen: Date;
}

export default function CollaborativeEditorPage() {
  const params = useParams();
  const sessionId = params.id as string;
  
  const [code, setCode] = useState('// Welcome to Collaborative Code Editor\n// Share this URL with others to collaborate in real-time!\n\nfunction collaborate() {\n  console.log("Coding together!");\n}\n\ncollaborate();');
  const [language, setLanguage] = useState('javascript');
  const [title, setTitle] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'connecting'>('connecting');
  const [collaborators, setCollaborators] = useState<CollaboratorInfo[]>([]);
  const [currentUser, setCurrentUser] = useState<CollaboratorInfo | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Generate anonymous user info
  const generateAnonymousUser = useCallback(() => {
    const adjectives = ['Swift', 'Clever', 'Bright', 'Quick', 'Smart', 'Sharp', 'Keen', 'Wise'];
    const animals = ['Fox', 'Owl', 'Cat', 'Wolf', 'Bear', 'Eagle', 'Lion', 'Tiger'];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const animal = animals[Math.floor(Math.random() * animals.length)];
    const color = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
    
    return {
      id: `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: `${adjective} ${animal}`,
      color,
      lastSeen: new Date(),
    };
  }, []);

  const loadSession = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('editor_sessions')
        .select('*')
        .eq('id', sessionId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading session:', error);
        toast.error('Failed to load session');
        return;
      }

      if (data) {
        setCode(data.content);
        setLanguage(data.language || 'javascript');
        setTitle(data.title || '');
        setLastSaved(new Date(data.updated_at));
      } else {
        // Create new session
        const { error: insertError } = await supabase
          .from('editor_sessions')
          .insert({
            id: sessionId,
            content: code,
            language,
            title: title || 'Untitled Session'
          });

        if (insertError) {
          console.error('Error creating session:', insertError);
          toast.error('Failed to create session');
        } else {
          toast.success('New collaborative session created');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to connect to session');
    } finally {
      setIsLoading(false);
      setConnectionStatus('connected');
    }
  }, [sessionId, code, language, title]);

  const saveSession = useCallback(async (newCode: string, newLanguage?: string, newTitle?: string) => {
    try {
      const { error } = await supabase
        .from('editor_sessions')
        .upsert({
          id: sessionId,
          content: newCode,
          language: newLanguage || language,
          title: newTitle || title || 'Untitled Session',
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error saving session:', error);
        toast.error('Failed to save changes');
      } else {
        setLastSaved(new Date());
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to save changes');
    }
  }, [sessionId, language, title]);

  // Initialize current user
  useEffect(() => {
    const user = generateAnonymousUser();
    setCurrentUser(user);
    setCollaborators([user]);
  }, [generateAnonymousUser]);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  useEffect(() => {
    if (!isLoading && currentUser) {
      const channel = supabase
        .channel(`session:${sessionId}`)
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'editor_sessions',
            filter: `id=eq.${sessionId}`,
          },
          (payload) => {
            const newData = payload.new as any;
            setCode(newData.content);
            setLanguage(newData.language || 'javascript');
            setTitle(newData.title || '');
            setLastSaved(new Date(newData.updated_at));
          }
        )
        .on('presence', { event: 'sync' }, () => {
          const newState = channel.presenceState();
          // Extract user data from presence state, filtering out presence metadata
          const users: CollaboratorInfo[] = [];
          Object.values(newState).forEach((presences: any) => {
            presences.forEach((presence: any) => {
              if (presence.id && presence.name && presence.color) {
                users.push({
                  id: presence.id,
                  name: presence.name,
                  color: presence.color,
                  lastSeen: new Date(presence.lastSeen || Date.now())
                });
              }
            });
          });
          setCollaborators([currentUser, ...users.filter(u => u.id !== currentUser.id)]);
        })
        .on('presence', { event: 'join' }, ({ key, newPresences }) => {
          const newUsers = newPresences as any[];
          const validUsers = newUsers.filter(u => u.name);
          if (validUsers.length > 0) {
            toast.success(`${validUsers[0].name || 'Someone'} joined the session`);
          }
        })
        .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
          const leftUsers = leftPresences as any[];
          const validUsers = leftUsers.filter(u => u.name);
          if (validUsers.length > 0) {
            toast.info(`${validUsers[0].name || 'Someone'} left the session`);
          }
        })
        .subscribe(async (status) => {
          if (status === 'SUBSCRIBED') {
            await channel.track(currentUser);
          }
        });

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [sessionId, isLoading, currentUser]);

  // Auto-save with debounce
  useEffect(() => {
    if (!isLoading) {
      const timeout = setTimeout(() => {
        saveSession(code);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [code, saveSession, isLoading]);

  const handleCodeChange = (value: string | undefined) => {
    setCode(value || '');
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    saveSession(code, newLanguage, title);
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (newTitle) {
      saveSession(code, language, newTitle);
    }
  };

  const handleTitleSubmit = () => {
    setIsEditingTitle(false);
    if (title.trim()) {
      saveSession(code, language, title.trim());
    }
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${title || 'Collaborative Session'} - RuntimePad`,
          text: 'Join me in this collaborative coding session!',
          url: shareUrl,
        });
        toast.success('Shared successfully');
      } catch (error) {
        await navigator.clipboard.writeText(shareUrl);
        toast.success('URL copied to clipboard');
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('URL copied to clipboard');
    }
  };

  const handleSaveLocal = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title || 'collaborative-session'}.${language === 'javascript' ? 'js' : language === 'typescript' ? 'ts' : 'txt'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('File saved locally');
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-8">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading collaborative session...</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        
        <main className="flex-1 py-8">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Collaborative Editor</h1>
                  <p className="text-muted-foreground">
                    Real-time collaborative code editing session
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant={connectionStatus === 'connected' ? 'secondary' : 'destructive'}>
                    <Users className="w-3 h-3 mr-1" />
                    {connectionStatus === 'connected' ? 'Connected' : 'Disconnected'}
                  </Badge>
                  {lastSaved && (
                    <Badge variant="outline">
                      <Clock className="w-3 h-3 mr-1" />
                      Saved {lastSaved.toLocaleTimeString()}
                    </Badge>
                  )}
                </div>
              </div>
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
                        placeholder="Untitled Session"
                        autoFocus
                      />
                    ) : (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <h2 
                            className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors flex items-center space-x-2"
                            onClick={() => setIsEditingTitle(true)}
                          >
                            <span>{title || 'Untitled Session'}</span>
                            <Edit3 className="w-4 h-4 opacity-50" />
                          </h2>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Click to edit title</p>
                        </TooltipContent>
                      </Tooltip>
                    )}

                    {/* Active Users */}
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-2">
                        {collaborators.slice(0, 3).map((collaborator) => (
                          <Tooltip key={collaborator.id}>
                            <TooltipTrigger asChild>
                              <Avatar className="h-8 w-8 border-2 border-background">
                                <AvatarFallback className={`${collaborator.color} text-white text-xs`}>
                                  {collaborator.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{collaborator.name}{collaborator.id === currentUser?.id && ' (You)'}</p>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                        {collaborators.length > 3 && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                                <span className="text-xs text-muted-foreground">+{collaborators.length - 3}</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{collaborators.length - 3} more collaborators</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        <UserPlus className="w-3 h-3 mr-1" />
                        {collaborators.length} active
                      </Badge>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button onClick={handleShare} variant="outline" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Share session</p>
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

                    {/* Settings Dropdown */}
                    <Collapsible open={settingsOpen} onOpenChange={setSettingsOpen}>
                      <CollapsibleTrigger asChild>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Settings className="w-4 h-4" />
                              <ChevronDown className={`w-3 h-3 ml-1 transition-transform ${settingsOpen ? 'rotate-180' : ''}`} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Settings</p>
                          </TooltipContent>
                        </Tooltip>
                      </CollapsibleTrigger>
                    </Collapsible>
                  </div>
                </div>

                {/* Settings Dropdown Content */}
                <Collapsible open={settingsOpen} onOpenChange={setSettingsOpen}>
                  <CollapsibleContent>
                    <div className="border-b bg-muted/30 p-4">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium">Language:</span>
                          <Select value={language} onValueChange={handleLanguageChange}>
                            <SelectTrigger className="w-40">
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
                        
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium">Session ID:</span>
                          <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                            {sessionId.slice(0, 8)}...
                          </code>
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Main Editor */}
                <CardContent className="p-0">
                  <MonacoEditor
                    height="600px"
                    language={language}
                    value={code}
                    onChange={handleCodeChange}
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
                🔒 <strong>Privacy Notice:</strong> Collaborative sessions are stored temporarily for 24 hours to enable real-time collaboration. 
                No personal information is collected or stored permanently.
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </TooltipProvider>
  );
}