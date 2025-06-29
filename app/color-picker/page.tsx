"use client";

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Copy, Palette, RefreshCw, Pipette } from 'lucide-react';
import { toast } from 'sonner';

interface ColorFormats {
  hex: string;
  rgb: string;
  hsl: string;
  hsv: string;
  cmyk: string;
  css: string;
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface HSL {
  h: number;
  s: number;
  l: number;
}

interface HSV {
  h: number;
  s: number;
  v: number;
}

interface CMYK {
  c: number;
  m: number;
  y: number;
  k: number;
}

export default function ColorPickerPage() {
  const [currentColor, setCurrentColor] = useState('#3b82f6');
  const [rgb, setRgb] = useState<RGB>({ r: 59, g: 130, b: 246 });
  const [hsl, setHsl] = useState<HSL>({ h: 217, s: 91, l: 60 });
  const [formats, setFormats] = useState<ColorFormats>({
    hex: '#3b82f6',
    rgb: 'rgb(59, 130, 246)',
    hsl: 'hsl(217, 91%, 60%)',
    hsv: 'hsv(217, 76%, 96%)',
    cmyk: 'cmyk(76%, 47%, 0%, 4%)',
    css: 'rgb(59, 130, 246)'
  });

  // Color conversion functions
  const hexToRgb = (hex: string): RGB | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHex = (r: number, g: number, b: number): string => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  const rgbToHsl = (r: number, g: number, b: number): HSL => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const hslToRgb = (h: number, s: number, l: number): RGB => {
    h /= 360;
    s /= 100;
    l /= 100;

    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  };

  const rgbToHsv = (r: number, g: number, b: number): HSV => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;

    let h = 0;
    if (diff !== 0) {
      switch (max) {
        case r: h = ((g - b) / diff) % 6; break;
        case g: h = (b - r) / diff + 2; break;
        case b: h = (r - g) / diff + 4; break;
      }
    }

    return {
      h: Math.round(h * 60),
      s: Math.round((max === 0 ? 0 : diff / max) * 100),
      v: Math.round(max * 100)
    };
  };

  const rgbToCmyk = (r: number, g: number, b: number): CMYK => {
    r /= 255;
    g /= 255;
    b /= 255;

    const k = 1 - Math.max(r, g, b);
    const c = k === 1 ? 0 : (1 - r - k) / (1 - k);
    const m = k === 1 ? 0 : (1 - g - k) / (1 - k);
    const y = k === 1 ? 0 : (1 - b - k) / (1 - k);

    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100)
    };
  };

  const updateAllFormats = (newRgb: RGB) => {
    const hex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    const hslColor = rgbToHsl(newRgb.r, newRgb.g, newRgb.b);
    const hsvColor = rgbToHsv(newRgb.r, newRgb.g, newRgb.b);
    const cmykColor = rgbToCmyk(newRgb.r, newRgb.g, newRgb.b);

    setCurrentColor(hex);
    setRgb(newRgb);
    setHsl(hslColor);
    
    setFormats({
      hex: hex.toUpperCase(),
      rgb: `rgb(${newRgb.r}, ${newRgb.g}, ${newRgb.b})`,
      hsl: `hsl(${hslColor.h}, ${hslColor.s}%, ${hslColor.l}%)`,
      hsv: `hsv(${hsvColor.h}, ${hsvColor.s}%, ${hsvColor.v}%)`,
      cmyk: `cmyk(${cmykColor.c}%, ${cmykColor.m}%, ${cmykColor.y}%, ${cmykColor.k}%)`,
      css: `rgb(${newRgb.r}, ${newRgb.g}, ${newRgb.b})`
    });
  };

  const handleHexChange = (hex: string) => {
    if (hex.match(/^#[0-9A-F]{6}$/i)) {
      const newRgb = hexToRgb(hex);
      if (newRgb) {
        updateAllFormats(newRgb);
      }
    }
  };

  const handleRgbChange = (component: keyof RGB, value: number) => {
    const newRgb = { ...rgb, [component]: value };
    updateAllFormats(newRgb);
  };

  const handleHslChange = (component: keyof HSL, value: number) => {
    const newHsl = { ...hsl, [component]: value };
    const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
    updateAllFormats(newRgb);
  };

  const generateRandomColor = () => {
    const newRgb = {
      r: Math.floor(Math.random() * 256),
      g: Math.floor(Math.random() * 256),
      b: Math.floor(Math.random() * 256)
    };
    updateAllFormats(newRgb);
    toast.success('Random color generated');
  };

  const copyToClipboard = async (text: string, format: string) => {
    await navigator.clipboard.writeText(text);
    toast.success(`${format} copied to clipboard`);
  };

  const colorPalettes = [
    { name: 'Material Design', colors: ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4'] },
    { name: 'Tailwind CSS', colors: ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'] },
    { name: 'Flat UI', colors: ['#e74c3c', '#f39c12', '#f1c40f', '#2ecc71', '#1abc9c', '#3498db', '#9b59b6', '#34495e'] },
    { name: 'Pastel', colors: ['#ffb3ba', '#ffdfba', '#ffffba', '#baffc9', '#bae1ff', '#c9baff', '#ffbaff', '#bababa'] }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Color Picker & Converter</h1>
            <p className="text-muted-foreground">
              Pick colors and convert between HEX, RGB, HSL, HSV, and CMYK formats with real-time preview.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Color Picker */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Palette className="w-5 h-5" />
                    <span>Color Picker</span>
                  </CardTitle>
                  <CardDescription>
                    Pick a color or enter values manually.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Color Preview */}
                  <div className="space-y-2">
                    <Label>Color Preview</Label>
                    <div 
                      className="w-full h-24 rounded-lg border-2 border-border shadow-inner"
                      style={{ backgroundColor: currentColor }}
                    />
                  </div>

                  {/* Native Color Picker */}
                  <div className="space-y-2">
                    <Label htmlFor="color-picker">Color Picker</Label>
                    <input
                      id="color-picker"
                      type="color"
                      value={currentColor}
                      onChange={(e) => handleHexChange(e.target.value)}
                      className="w-full h-12 rounded-lg border border-border cursor-pointer"
                    />
                  </div>

                  {/* HEX Input */}
                  <div className="space-y-2">
                    <Label htmlFor="hex-input">HEX</Label>
                    <Input
                      id="hex-input"
                      value={currentColor}
                      onChange={(e) => handleHexChange(e.target.value)}
                      className="font-mono"
                      placeholder="#000000"
                    />
                  </div>

                  <Button onClick={generateRandomColor} className="w-full">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Random Color
                  </Button>
                </CardContent>
              </Card>

              {/* RGB Sliders */}
              <Card>
                <CardHeader>
                  <CardTitle>RGB Values</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Red</Label>
                      <span className="text-sm text-muted-foreground">{rgb.r}</span>
                    </div>
                    <Slider
                      value={[rgb.r]}
                      onValueChange={([value]) => handleRgbChange('r', value)}
                      max={255}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Green</Label>
                      <span className="text-sm text-muted-foreground">{rgb.g}</span>
                    </div>
                    <Slider
                      value={[rgb.g]}
                      onValueChange={([value]) => handleRgbChange('g', value)}
                      max={255}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Blue</Label>
                      <span className="text-sm text-muted-foreground">{rgb.b}</span>
                    </div>
                    <Slider
                      value={[rgb.b]}
                      onValueChange={([value]) => handleRgbChange('b', value)}
                      max={255}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* HSL Sliders */}
              <Card>
                <CardHeader>
                  <CardTitle>HSL Values</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Hue</Label>
                      <span className="text-sm text-muted-foreground">{hsl.h}°</span>
                    </div>
                    <Slider
                      value={[hsl.h]}
                      onValueChange={([value]) => handleHslChange('h', value)}
                      max={360}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Saturation</Label>
                      <span className="text-sm text-muted-foreground">{hsl.s}%</span>
                    </div>
                    <Slider
                      value={[hsl.s]}
                      onValueChange={([value]) => handleHslChange('s', value)}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Lightness</Label>
                      <span className="text-sm text-muted-foreground">{hsl.l}%</span>
                    </div>
                    <Slider
                      value={[hsl.l]}
                      onValueChange={([value]) => handleHslChange('l', value)}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Color Formats and Palettes */}
            <div className="lg:col-span-2 space-y-6">
              {/* Color Formats */}
              <Card>
                <CardHeader>
                  <CardTitle>Color Formats</CardTitle>
                  <CardDescription>
                    All color format representations. Click any format to copy it.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(formats).map(([format, value]) => (
                      <div key={format} className="group">
                        <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <Badge variant="outline" className="text-xs">
                                {format.toUpperCase()}
                              </Badge>
                            </div>
                            <div className="font-mono text-sm break-all">
                              {value}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(value, format.toUpperCase())}
                            className="opacity-0 group-hover:opacity-100 transition-opacity ml-2"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Color Palettes */}
              <Card>
                <CardHeader>
                  <CardTitle>Color Palettes</CardTitle>
                  <CardDescription>
                    Click any color to select it.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {colorPalettes.map((palette) => (
                      <div key={palette.name}>
                        <h4 className="text-sm font-medium mb-2">{palette.name}</h4>
                        <div className="flex flex-wrap gap-2">
                          {palette.colors.map((color) => (
                            <button
                              key={color}
                              className="w-12 h-12 rounded-lg border-2 border-border hover:border-primary transition-colors shadow-sm hover:shadow-md"
                              style={{ backgroundColor: color }}
                              onClick={() => handleHexChange(color)}
                              title={color}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Color Harmony */}
              <Card>
                <CardHeader>
                  <CardTitle>Color Harmony</CardTitle>
                  <CardDescription>
                    Complementary and analogous colors based on your selection.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Complementary</h4>
                      <div className="flex space-x-2">
                        {[0, 180].map((offset) => {
                          const h = (hsl.h + offset) % 360;
                          const complementaryRgb = hslToRgb(h, hsl.s, hsl.l);
                          const complementaryHex = rgbToHex(complementaryRgb.r, complementaryRgb.g, complementaryRgb.b);
                          return (
                            <button
                              key={offset}
                              className="w-12 h-12 rounded-lg border-2 border-border hover:border-primary transition-colors shadow-sm hover:shadow-md"
                              style={{ backgroundColor: complementaryHex }}
                              onClick={() => handleHexChange(complementaryHex)}
                              title={complementaryHex}
                            />
                          );
                        })}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Analogous</h4>
                      <div className="flex space-x-2">
                        {[-30, 0, 30].map((offset) => {
                          const h = (hsl.h + offset + 360) % 360;
                          const analogousRgb = hslToRgb(h, hsl.s, hsl.l);
                          const analogousHex = rgbToHex(analogousRgb.r, analogousRgb.g, analogousRgb.b);
                          return (
                            <button
                              key={offset}
                              className="w-12 h-12 rounded-lg border-2 border-border hover:border-primary transition-colors shadow-sm hover:shadow-md"
                              style={{ backgroundColor: analogousHex }}
                              onClick={() => handleHexChange(analogousHex)}
                              title={analogousHex}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="mt-8 p-4 bg-muted/30 rounded-lg border">
            <p className="text-sm text-muted-foreground text-center">
              🔒 <strong>Privacy First:</strong> All color conversions happen in your browser. 
              No data is sent to our servers.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}