"use client";

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container max-w-2xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-green-500/10 rounded-full">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
            <p className="text-xl text-muted-foreground">
              Your feedback has been successfully submitted.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Feedback Received</CardTitle>
              <CardDescription>
                We appreciate you taking the time to share your thoughts with us.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Your feedback helps us improve RuntimePad and build better tools for developers. 
                We review all submissions and use them to guide our development priorities.
              </p>
              <p className="text-muted-foreground">
                If you provided your email address, we may reach out to you for follow-up questions 
                or to let you know when we've implemented your suggestions.
              </p>
              <div className="pt-4">
                <Button asChild>
                  <Link href="/">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to RuntimePad
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}