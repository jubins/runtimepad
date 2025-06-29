"use client";

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { MessageCircle, Send, HelpCircle, Lightbulb } from 'lucide-react';
import { toast } from 'sonner';

function FeedbackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    setIsSubmitting(true);
    // Form will be handled by FormSubmit
    toast.success('Thank you for your feedback!');
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">📝 RuntimePad Feedback</h2>
      <p className="mb-6 text-muted-foreground">
        We'd love to hear your thoughts! Your feedback helps us improve RuntimePad.
      </p>

      <form
        action="https://formsubmit.co/jubinsoni27@gmail.com"
        method="POST"
        className="space-y-4"
        onSubmit={handleSubmit}
      >
        {/* FormSubmit configuration */}
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_subject" value="RuntimePad Feedback" />
        <input type="hidden" name="_next" value="https://runtimepad.vercel.app/thank-you" />

        <div>
          <label className="block font-medium mb-2">Name *</label>
          <Input
            type="text"
            name="name"
            placeholder="Your name"
            className="w-full"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Email *</label>
          <Input
            type="email"
            name="email"
            placeholder="you@example.com"
            className="w-full"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Rate your experience *</label>
          <select name="rating" className="w-full p-2 border rounded-md bg-background" required>
            <option value="">Select a rating</option>
            <option value="5">⭐⭐⭐⭐⭐ - Excellent</option>
            <option value="4">⭐⭐⭐⭐ - Good</option>
            <option value="3">⭐⭐⭐ - Average</option>
            <option value="2">⭐⭐ - Poor</option>
            <option value="1">⭐ - Bad</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-2">Feedback *</label>
          <Textarea
            name="feedback"
            required
            rows={4}
            className="w-full"
            placeholder="Tell us what you think..."
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={isSubmitting}
        >
          <Send className="w-4 h-4 mr-2" />
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </Button>
      </form>
    </div>
  );
}

export default function FAQPage() {
  const [showFeedback, setShowFeedback] = useState(false);

  const faqs = [
    {
      question: "What is RuntimePad?",
      answer: "RuntimePad is a collection of free, privacy-focused developer tools including a JSON beautifier, diff checker, and collaborative code editor. All tools are designed to work in your browser without requiring sign-ups or data collection."
    },
    {
      question: "Is RuntimePad free to use?",
      answer: "Yes! RuntimePad is completely free to use. We don't charge for any features and there are no premium tiers or subscriptions."
    },
    {
      question: "Do I need to create an account?",
      answer: "No account required! You can use all RuntimePad tools immediately without signing up, logging in, or providing any personal information."
    },
    {
      question: "Is my data safe and private?",
      answer: "Absolutely. Most tools (JSON Beautifier, Diff Checker) process your data entirely in your browser - it never leaves your device. For collaborative sessions, data is temporarily stored for 24 hours maximum and then automatically deleted."
    },
    {
      question: "How does the collaborative code editor work?",
      answer: "Create a session and share the URL with others. Multiple people can edit the same code in real-time. Sessions are automatically deleted after 24 hours for privacy."
    },
    {
      question: "What file formats are supported?",
      answer: "The JSON Beautifier works with JSON data. The Diff Checker supports any text format. The Code Editor supports JavaScript, TypeScript, Python, HTML, CSS, JSON, Markdown, and plain text with syntax highlighting."
    },
    {
      question: "Can I save my work?",
      answer: "Yes! You can download your formatted JSON, diff results, or code files directly to your computer. For collaborative sessions, remember that they're automatically deleted after 24 hours."
    },
    {
      question: "Does RuntimePad work offline?",
      answer: "The JSON Beautifier and Diff Checker work offline once the page is loaded since they process data in your browser. The collaborative editor requires an internet connection for real-time sync."
    },
    {
      question: "What browsers are supported?",
      answer: "RuntimePad works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version for the best experience."
    },
    {
      question: "How do I report bugs or issues?",
      answer: "You can report bugs through our feedback form below, or contact us through our GitHub repository. We appreciate detailed bug reports and will work to fix issues quickly."
    },
    {
      question: "Can I use RuntimePad for commercial projects?",
      answer: "Yes! RuntimePad is free for both personal and commercial use. There are no restrictions on using it for business or commercial projects."
    },
    {
      question: "Are there any usage limits?",
      answer: "We don't impose strict usage limits, but please use the tools reasonably. For collaborative sessions, we limit session duration to 24 hours and may implement fair usage policies if needed."
    }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-primary/10 rounded-full">
                <HelpCircle className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about RuntimePad and our developer tools.
            </p>
          </div>

          {!showFeedback ? (
            <div className="space-y-8">
              {/* FAQ Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <HelpCircle className="h-5 w-5" />
                    <span>Still have questions?</span>
                  </CardTitle>
                  <CardDescription>
                    Common questions and answers about RuntimePad
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>

              {/* Feature Requests Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Lightbulb className="h-5 w-5" />
                    <span>Feature Requests & Feedback</span>
                  </CardTitle>
                  <CardDescription>
                    Have an idea for a new tool or feature? Let us know!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => setShowFeedback(true)}
                    className="w-full"
                  >
                    Submit Feedback
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="p-0">
                <FeedbackForm />
                <div className="p-6 border-t">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowFeedback(false)}
                    className="w-full"
                  >
                    Back to FAQ
                  </Button>
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