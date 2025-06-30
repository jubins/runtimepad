"use client";

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, Clock, Calendar, RefreshCw, ArrowRightLeft } from 'lucide-react';
import { toast } from 'sonner';

type TimestampUnit = 'seconds' | 'milliseconds' | 'microseconds' | 'nanoseconds';

export default function TimestampConverterPage() {
  const [timestamp, setTimestamp] = useState('');
  const [unit, setUnit] = useState<TimestampUnit>('seconds');
  const [humanDate, setHumanDate] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mode, setMode] = useState<'timestamp-to-date' | 'date-to-timestamp'>('timestamp-to-date');

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Initialize with current timestamp
  useEffect(() => {
    const now = new Date();
    setTimestamp(Math.floor(now.getTime() / 1000).toString());
    setHumanDate(now.toISOString().slice(0, 16)); // Format for datetime-local input
  }, []);

  const convertTimestampToDate = (ts: string, unit: TimestampUnit): Date | null => {
    const num = parseFloat(ts);
    if (isNaN(num)) return null;

    let milliseconds: number;
    switch (unit) {
      case 'seconds':
        milliseconds = num * 1000;
        break;
      case 'milliseconds':
        milliseconds = num;
        break;
      case 'microseconds':
        milliseconds = num / 1000;
        break;
      case 'nanoseconds':
        milliseconds = num / 1000000;
        break;
      default:
        return null;
    }

    return new Date(milliseconds);
  };

  const convertDateToTimestamp = (dateStr: string, unit: TimestampUnit): string => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '';

    const milliseconds = date.getTime();
    
    switch (unit) {
      case 'seconds':
        return Math.floor(milliseconds / 1000).toString();
      case 'milliseconds':
        return milliseconds.toString();
      case 'microseconds':
        return (milliseconds * 1000).toString();
      case 'nanoseconds':
        return (milliseconds * 1000000).toString();
      default:
        return '';
    }
  };

  const formatDate = (date: Date): { [key: string]: string } => {
    return {
      'ISO 8601': date.toISOString(),
      'UTC': date.toUTCString(),
      'Local': date.toString(),
      'Date Only': date.toDateString(),
      'Time Only': date.toTimeString(),
      'Locale': date.toLocaleString(),
      'Relative': getRelativeTime(date),
    };
  };

  const getRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (Math.abs(diffSeconds) < 60) {
      return diffSeconds === 0 ? 'now' : `${Math.abs(diffSeconds)} seconds ${diffSeconds > 0 ? 'ago' : 'from now'}`;
    } else if (Math.abs(diffMinutes) < 60) {
      return `${Math.abs(diffMinutes)} minutes ${diffMinutes > 0 ? 'ago' : 'from now'}`;
    } else if (Math.abs(diffHours) < 24) {
      return `${Math.abs(diffHours)} hours ${diffHours > 0 ? 'ago' : 'from now'}`;
    } else {
      return `${Math.abs(diffDays)} days ${diffDays > 0 ? 'ago' : 'from now'}`;
    }
  };

  const handleTimestampChange = (value: string) => {
    setTimestamp(value);
  };

  const handleDateChange = (value: string) => {
    setHumanDate(value);
    if (mode === 'date-to-timestamp') {
      const ts = convertDateToTimestamp(value, unit);
      setTimestamp(ts);
    }
  };

  const handleUnitChange = (newUnit: TimestampUnit) => {
    setUnit(newUnit);
    if (mode === 'date-to-timestamp' && humanDate) {
      const ts = convertDateToTimestamp(humanDate, newUnit);
      setTimestamp(ts);
    }
  };

  const handleCurrentTime = () => {
    const now = new Date();
    if (mode === 'timestamp-to-date') {
      const ts = convertDateToTimestamp(now.toISOString(), unit);
      setTimestamp(ts);
    } else {
      setHumanDate(now.toISOString().slice(0, 16));
      const ts = convertDateToTimestamp(now.toISOString(), unit);
      setTimestamp(ts);
    }
    toast.success('Set to current time');
  };

  const copyToClipboard = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const convertedDate = mode === 'timestamp-to-date' ? convertTimestampToDate(timestamp, unit) : null;
  const formattedDates = convertedDate ? formatDate(convertedDate) : {};

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Timestamp Converter</h1>
            <p className="text-muted-foreground">
              Convert between UNIX timestamps and human-readable dates with support for different time units.
            </p>
          </div>

          {/* Current Time Display */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="font-mono text-lg">{currentTime.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Current local time</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-lg">{Math.floor(currentTime.getTime() / 1000)}</div>
                  <div className="text-sm text-muted-foreground">UNIX timestamp (seconds)</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs value={mode} onValueChange={(value) => setMode(value as typeof mode)} className="mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="timestamp-to-date" className="flex items-center space-x-2">
                <ArrowRightLeft className="w-4 h-4" />
                <span>Timestamp → Date</span>
              </TabsTrigger>
              <TabsTrigger value="date-to-timestamp" className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Date → Timestamp</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {mode === 'timestamp-to-date' ? 'UNIX Timestamp Input' : 'Date Input'}
                </CardTitle>
                <CardDescription>
                  {mode === 'timestamp-to-date' 
                    ? 'Enter a UNIX timestamp to convert to human-readable date.'
                    : 'Select a date and time to convert to UNIX timestamp.'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mode === 'timestamp-to-date' ? (
                  <div>
                    <Label htmlFor="timestamp">Timestamp</Label>
                    <div className="flex space-x-2 mt-1">
                      <Input
                        id="timestamp"
                        value={timestamp}
                        onChange={(e) => handleTimestampChange(e.target.value)}
                        placeholder="Enter timestamp..."
                        className="font-mono"
                      />
                      <Button variant="outline" onClick={handleCurrentTime}>
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="datetime">Date & Time</Label>
                    <div className="flex space-x-2 mt-1">
                      <Input
                        id="datetime"
                        type="datetime-local"
                        value={humanDate}
                        onChange={(e) => handleDateChange(e.target.value)}
                        className="flex-1"
                      />
                      <Button variant="outline" onClick={handleCurrentTime}>
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                <div>
                  <Label>Time Unit</Label>
                  <Select value={unit} onValueChange={handleUnitChange}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="seconds">Seconds</SelectItem>
                      <SelectItem value="milliseconds">Milliseconds</SelectItem>
                      <SelectItem value="microseconds">Microseconds</SelectItem>
                      <SelectItem value="nanoseconds">Nanoseconds</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {mode === 'date-to-timestamp' && timestamp && (
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <Label className="text-sm font-medium">Generated Timestamp</Label>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-mono text-sm">{timestamp}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(timestamp, 'Timestamp')}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Output Section */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {mode === 'timestamp-to-date' ? 'Converted Date' : 'Timestamp Formats'}
                </CardTitle>
                <CardDescription>
                  {mode === 'timestamp-to-date' 
                    ? 'The timestamp converted to various date formats.'
                    : 'The same timestamp in different units.'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {mode === 'timestamp-to-date' ? (
                  convertedDate ? (
                    <div className="space-y-3">
                      {Object.entries(formattedDates).map(([format, value]) => (
                        <div key={format} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm">{format}</div>
                            <div className="font-mono text-xs text-muted-foreground break-all">
                              {value}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(value, format)}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Enter a valid timestamp to see the converted date.</p>
                    </div>
                  )
                ) : (
                  humanDate ? (
                    <div className="space-y-3">
                      {(['seconds', 'milliseconds', 'microseconds', 'nanoseconds'] as TimestampUnit[]).map((timeUnit) => {
                        const ts = convertDateToTimestamp(humanDate, timeUnit);
                        return (
                          <div key={timeUnit} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm capitalize">{timeUnit}</div>
                              <div className="font-mono text-xs text-muted-foreground break-all">
                                {ts}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {timeUnit === unit && <Badge variant="secondary">Current</Badge>}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(ts, timeUnit)}
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Select a date to see the timestamp in different units.</p>
                    </div>
                  )
                )}
              </CardContent>
            </Card>
          </div>

          {/* Info Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What is UNIX Timestamp?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A UNIX timestamp is the number of seconds (or other time units) that have elapsed since 
                  January 1, 1970, 00:00:00 UTC (the UNIX epoch). It's a standard way to represent time 
                  in computing systems and is timezone-independent.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Time Units</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <strong>Seconds:</strong> Standard UNIX timestamp</li>
                  <li>• <strong>Milliseconds:</strong> JavaScript Date.getTime()</li>
                  <li>• <strong>Microseconds:</strong> High-precision timing</li>
                  <li>• <strong>Nanoseconds:</strong> Ultra-high precision</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Privacy Notice */}
          <div className="mt-8 p-4 bg-muted/30 rounded-lg border">
            <p className="text-sm text-muted-foreground text-center">
              🔒 <strong>Privacy First:</strong> All timestamp conversions happen in your browser. 
              No data is sent to our servers.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}