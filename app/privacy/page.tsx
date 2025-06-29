"use client";

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, Database, Lock } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-green-500/10 rounded-full">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your privacy is our priority. Learn how we protect your data and respect your privacy.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: January 2025
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="h-5 w-5" />
                  <span>What We Don't Collect</span>
                </CardTitle>
                <CardDescription>
                  We believe in privacy by design and minimize data collection.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  RuntimePad is built with privacy as a core principle. We do not collect:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Personal information (names, emails, addresses)</li>
                  <li>User accounts or login credentials</li>
                  <li>Tracking cookies or analytics data</li>
                  <li>IP addresses or location data</li>
                  <li>Device fingerprinting information</li>
                  <li>Usage analytics or behavioral data</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>How Our Tools Work</span>
                </CardTitle>
                <CardDescription>
                  Most processing happens entirely in your browser.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">JSON Beautifier & Diff Checker</h4>
                    <p className="text-muted-foreground">
                      These tools process your data entirely in your browser using client-side JavaScript. 
                      Your data never leaves your device or gets sent to our servers.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Collaborative Code Editor</h4>
                    <p className="text-muted-foreground">
                      For real-time collaboration, we temporarily store session data on our servers. 
                      This includes only the code content and session metadata. Sessions are automatically 
                      deleted after 24 hours, and no personal information is associated with them.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="h-5 w-5" />
                  <span>Data Security</span>
                </CardTitle>
                <CardDescription>
                  How we protect the minimal data we do handle.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>All data transmission is encrypted using HTTPS/TLS</li>
                  <li>Collaborative sessions use secure WebSocket connections</li>
                  <li>Session data is stored with encryption at rest</li>
                  <li>Automatic data deletion after 24 hours</li>
                  <li>No permanent storage of user content</li>
                  <li>Regular security audits and updates</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Third-Party Services</CardTitle>
                <CardDescription>
                  External services we use and their privacy implications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  RuntimePad uses minimal third-party services:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li><strong>Supabase:</strong> Used for collaborative session storage with automatic data deletion</li>
                  <li><strong>Vercel/Netlify:</strong> Hosting platform for the application</li>
                  <li><strong>CDN Services:</strong> For fast content delivery (no tracking)</li>
                </ul>
                <p className="text-muted-foreground">
                  We do not use Google Analytics, Facebook Pixel, or any other tracking services.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Rights</CardTitle>
                <CardDescription>
                  What rights you have regarding your data.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Since we don't collect personal data, most traditional data rights don't apply. However:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>You can delete collaborative sessions by closing the browser tab</li>
                  <li>All session data is automatically deleted after 24 hours</li>
                  <li>You can use all tools without providing any personal information</li>
                  <li>You can contact us with any privacy concerns</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Changes to This Policy</CardTitle>
                <CardDescription>
                  How we handle updates to our privacy policy.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We may update this privacy policy from time to time. Any changes will be posted on this page 
                  with an updated revision date. Since we don't collect contact information, we cannot notify 
                  users directly of changes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
                <CardDescription>
                  Questions about our privacy practices.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  If you have any questions about this privacy policy or our data practices, 
                  please contact us through our GitHub repository or support channels.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}