"use client";

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, AlertTriangle, Users, Gavel } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-blue-500/10 rounded-full">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Please read these terms carefully before using RuntimePad.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: January 2025
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Acceptance of Terms</CardTitle>
                <CardDescription>
                  By using RuntimePad, you agree to these terms.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  By accessing and using RuntimePad ("the Service"), you accept and agree to be bound by the terms 
                  and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Description of Service</CardTitle>
                <CardDescription>
                  What RuntimePad provides to users.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  RuntimePad is a collection of web-based developer tools including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>JSON Beautifier and validator</li>
                  <li>Text and code diff checker</li>
                  <li>Collaborative code editor</li>
                  <li>Additional developer utilities</li>
                </ul>
                <p className="text-muted-foreground">
                  The Service is provided free of charge and without the need for user registration.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>User Responsibilities</span>
                </CardTitle>
                <CardDescription>
                  What we expect from users of the service.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  When using RuntimePad, you agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Use the Service only for lawful purposes</li>
                  <li>Not attempt to harm, disable, or overburden the Service</li>
                  <li>Not use the Service to store or share illegal, harmful, or offensive content</li>
                  <li>Not attempt to gain unauthorized access to the Service or its systems</li>
                  <li>Respect the collaborative nature of shared sessions</li>
                  <li>Not use the Service for commercial spam or automated abuse</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content and Data</CardTitle>
                <CardDescription>
                  How we handle content you create or share.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Your Content</h4>
                    <p className="text-muted-foreground">
                      You retain all rights to any content you create or input into RuntimePad. 
                      We do not claim ownership of your code, text, or other materials.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Collaborative Sessions</h4>
                    <p className="text-muted-foreground">
                      When you create a collaborative session, you understand that other users with 
                      the session link can view and edit the content. Sessions are automatically 
                      deleted after 24 hours.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Data Processing</h4>
                    <p className="text-muted-foreground">
                      Most tools process your data locally in your browser. For collaborative features, 
                      data is temporarily stored on our servers as described in our Privacy Policy.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Disclaimers and Limitations</span>
                </CardTitle>
                <CardDescription>
                  Important limitations and disclaimers.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Service Availability</h4>
                    <p className="text-muted-foreground">
                      We strive to keep RuntimePad available 24/7, but we cannot guarantee uninterrupted service. 
                      The Service may be temporarily unavailable due to maintenance, updates, or technical issues.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Data Loss</h4>
                    <p className="text-muted-foreground">
                      While we take precautions to protect your data, we cannot guarantee against data loss. 
                      Always save important work locally as a backup.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Accuracy</h4>
                    <p className="text-muted-foreground">
                      We provide tools to the best of our ability, but we cannot guarantee the accuracy 
                      or completeness of results. Always verify important work independently.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Gavel className="h-5 w-5" />
                  <span>Limitation of Liability</span>
                </CardTitle>
                <CardDescription>
                  Legal limitations on our liability.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  To the fullest extent permitted by law, RuntimePad and its operators shall not be liable for any:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Direct, indirect, incidental, or consequential damages</li>
                  <li>Loss of data, profits, or business opportunities</li>
                  <li>Service interruptions or technical failures</li>
                  <li>Actions of other users in collaborative sessions</li>
                  <li>Third-party content or services</li>
                </ul>
                <p className="text-muted-foreground">
                  The Service is provided "as is" without warranties of any kind, either express or implied.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Modifications to Terms</CardTitle>
                <CardDescription>
                  How we handle changes to these terms.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We reserve the right to modify these terms at any time. Changes will be posted on this page 
                  with an updated revision date. Your continued use of the Service after changes constitutes 
                  acceptance of the new terms.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Termination</CardTitle>
                <CardDescription>
                  How service access may be terminated.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We reserve the right to terminate or suspend access to the Service at any time, 
                  without prior notice, for conduct that we believe violates these terms or is harmful 
                  to other users or the Service.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  How to reach us regarding these terms.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  If you have any questions about these Terms of Service, please contact us through 
                  our GitHub repository or support channels.
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