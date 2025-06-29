"use client";

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Eye, AlertTriangle, CheckCircle, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function SecurityPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-red-500/10 rounded-full">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">Security</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Learn about our security measures and how we protect your data and privacy.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: January 2025
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Security Overview</span>
                </CardTitle>
                <CardDescription>
                  Our commitment to keeping your data secure.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Security is fundamental to RuntimePad's design. We implement multiple layers of protection 
                  to ensure your data remains safe and private while using our developer tools.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    HTTPS/TLS Encryption
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                    Client-Side Processing
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
                    No Data Collection
                  </Badge>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100">
                    Auto-Delete Sessions
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="h-5 w-5" />
                  <span>Data Encryption</span>
                </CardTitle>
                <CardDescription>
                  How we protect data in transit and at rest.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">In Transit</h4>
                    <p className="text-muted-foreground">
                      All communication between your browser and our servers is encrypted using TLS 1.3, 
                      the latest and most secure version of Transport Layer Security. This ensures that 
                      any data transmitted cannot be intercepted or tampered with.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">At Rest</h4>
                    <p className="text-muted-foreground">
                      For collaborative sessions, any temporarily stored data is encrypted at rest using 
                      industry-standard AES-256 encryption. This data is automatically deleted after 24 hours.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">WebSocket Security</h4>
                    <p className="text-muted-foreground">
                      Real-time collaborative features use secure WebSocket connections (WSS) with the same 
                      level of encryption as HTTPS, ensuring secure real-time communication.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="h-5 w-5" />
                  <span>Privacy by Design</span>
                </CardTitle>
                <CardDescription>
                  How we minimize data exposure and collection.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Client-Side Processing</h4>
                    <p className="text-muted-foreground">
                      Our JSON Beautifier and Diff Checker tools process your data entirely in your browser. 
                      Your sensitive code and data never leaves your device, providing the highest level of privacy.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Minimal Data Storage</h4>
                    <p className="text-muted-foreground">
                      We only store data when absolutely necessary for functionality (collaborative sessions). 
                      Even then, we store only the minimum required data and delete it automatically.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">No Tracking</h4>
                    <p className="text-muted-foreground">
                      We don't use analytics, tracking cookies, or any form of user monitoring. 
                      Your usage patterns and behavior remain completely private.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>Infrastructure Security</span>
                </CardTitle>
                <CardDescription>
                  Security measures at the infrastructure level.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li><strong>Secure Hosting:</strong> Hosted on enterprise-grade cloud infrastructure with built-in DDoS protection</li>
                  <li><strong>Regular Updates:</strong> All systems and dependencies are regularly updated with security patches</li>
                  <li><strong>Access Controls:</strong> Strict access controls and authentication for all administrative functions</li>
                  <li><strong>Monitoring:</strong> 24/7 security monitoring and automated threat detection</li>
                  <li><strong>Backup Security:</strong> Encrypted backups with secure key management</li>
                  <li><strong>Network Security:</strong> Firewalls and network segmentation to isolate services</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Security Best Practices for Users</span>
                </CardTitle>
                <CardDescription>
                  How you can help keep your data secure.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  While we implement strong security measures, here are some best practices for users:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li><strong>Sensitive Data:</strong> Avoid pasting highly sensitive information like passwords or API keys</li>
                  <li><strong>Collaborative Sessions:</strong> Only share session URLs with trusted collaborators</li>
                  <li><strong>Local Backups:</strong> Always save important work locally as a backup</li>
                  <li><strong>Browser Security:</strong> Keep your browser updated and use reputable security extensions</li>
                  <li><strong>Network Security:</strong> Use secure networks when working with sensitive code</li>
                  <li><strong>Session Management:</strong> Close collaborative sessions when finished to prevent unauthorized access</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vulnerability Reporting</CardTitle>
                <CardDescription>
                  How to report security vulnerabilities responsibly.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We take security vulnerabilities seriously and appreciate responsible disclosure. 
                  If you discover a security issue, please:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Contact us privately through our GitHub repository or security contact</li>
                  <li>Provide detailed information about the vulnerability</li>
                  <li>Allow reasonable time for us to address the issue before public disclosure</li>
                  <li>Avoid accessing or modifying other users' data</li>
                </ul>
                <p className="text-muted-foreground">
                  We commit to acknowledging reports within 48 hours and providing regular updates 
                  on our progress toward resolution.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Updates</CardTitle>
                <CardDescription>
                  How we communicate security-related changes.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We regularly review and update our security measures. Any significant security-related 
                  changes will be communicated through:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Updates to this security page</li>
                  <li>Notifications on our GitHub repository</li>
                  <li>In-app notifications for critical security updates</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
                <CardDescription>
                  Questions about security or reporting issues.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  For security-related questions, vulnerability reports, or other security concerns, 
                  please contact us through our GitHub repository or designated security channels.
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