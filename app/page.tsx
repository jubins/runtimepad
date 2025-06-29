"use client";

import { motion } from 'framer-motion';
import { ArrowRight, FileText, GitCompare, Sparkles, Zap, Shield, Users, Code, Lock, Search, Hash, Clock, Type, Palette, ShieldOff } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ToolCard } from '@/components/ui/tool-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

const tools = [
  {
    title: 'JSON Beautifier',
    description: 'Format, validate, and beautify JSON data with syntax highlighting and error detection.',
    href: '/json-beautifier',
    icon: FileText,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Diff Checker',
    description: 'Compare text and code files with advanced diff visualization and syntax highlighting.',
    href: '/diff-checker',
    icon: GitCompare,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Code Editor',
    description: 'Collaborative code editor with real-time sync, syntax highlighting, and shareable links.',
    href: '/editor',
    icon: Code,
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    title: 'Base64 Encoder/Decoder',
    description: 'Encode text to Base64 or decode Base64 back to readable text with real-time validation.',
    href: '/base64',
    icon: Lock,
    gradient: 'from-orange-500 to-red-500',
  },
  {
    title: 'Markdown Previewer',
    description: 'Write markdown and see the HTML preview in real-time with export options.',
    href: '/markdown-preview',
    icon: FileText,
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    title: 'Regex Tester',
    description: 'Test regular expressions against sample text with detailed match results and examples.',
    href: '/regex-tester',
    icon: Search,
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    title: 'UUID Generator',
    description: 'Generate RFC 4122 compliant UUID v4 identifiers with bulk generation options.',
    href: '/uuid-generator',
    icon: Hash,
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    title: 'Timestamp Converter',
    description: 'Convert between UNIX timestamps and human-readable dates with multiple time units.',
    href: '/timestamp-converter',
    icon: Clock,
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    title: 'Case Converter',
    description: 'Transform text between camelCase, snake_case, kebab-case, and other formats.',
    href: '/case-converter',
    icon: Type,
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    title: 'Color Picker',
    description: 'Pick colors and convert between HEX, RGB, HSL, HSV, and CMYK formats.',
    href: '/color-picker',
    icon: Palette,
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    title: 'HTML Escape/Unescape',
    description: 'Escape HTML entities for security or unescape them back to readable characters.',
    href: '/html-escape',
    icon: ShieldOff,
    gradient: 'from-teal-500 to-cyan-500',
  },
];

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized for speed with instant processing and real-time updates.',
    gradient: 'from-yellow-400 to-orange-500',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'No data collection. Your code stays private and secure.',
    gradient: 'from-green-400 to-emerald-500',
  },
  {
    icon: Users,
    title: 'Real-time Collaboration',
    description: 'Work together seamlessly with live collaborative editing.',
    gradient: 'from-blue-400 to-indigo-500',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    rotate: [0, 5, 0, -5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <Header />
      
      <main className="flex-1 relative">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.1),transparent_50%)]" />
        </div>

        {/* Floating Elements */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '2s' }}
          className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '4s' }}
          className="absolute bottom-40 left-1/4 w-24 h-24 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-xl"
        />

        {/* Hero Section */}
        <section className="relative py-32 px-4 text-center">
          <div className="container max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="space-y-8"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center justify-center space-x-3 mb-8"
              >
                <div className="relative">
                  <Image 
                    src="https://huggingface.co/datasets/jubinsoni/runtimepad/resolve/main/favicon.svg" 
                    alt="RuntimePad" 
                    width={48} 
                    height={48} 
                    className="h-12 w-12 relative z-10"
                  />
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg animate-pulse" />
                </div>
                <h1 className="text-6xl font-bold bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  RuntimePad
                </h1>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-8 w-8 text-yellow-500" />
                </motion.div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6"
              >
                <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Super useful dev tools — all in one place
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed">
                  Built for developers who need reliable, fast, and beautiful tools for their daily workflow. 
                  No sign-ups, no data collection, just pure productivity.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Button asChild size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg hover:shadow-xl transition-all duration-300">
                  <Link href="#tools">
                    Explore Tools
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 border-2 hover:bg-muted/50 transition-all duration-300">
                  <Link href="/editor">
                    Start Coding
                    <Image 
                      src="https://huggingface.co/datasets/jubinsoni/runtimepad/resolve/main/favicon.svg" 
                      alt="Code" 
                      width={20} 
                      height={20} 
                      className="ml-2 h-5 w-5"
                    />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-24 px-4">
          <div className="container max-w-6xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-6">
                Why Choose RuntimePad?
              </motion.h2>
              <motion.p variants={itemVariants} className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Experience the perfect blend of functionality, performance, and privacy in your development workflow.
              </motion.p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl from-primary/20 to-blue-600/20" />
                  <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 text-center hover:border-primary/50 transition-all duration-300">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Tools Section */}
        <section id="tools" className="relative py-24 px-4">
          <div className="container max-w-7xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-6">
                Developer Tools
              </motion.h2>
              <motion.p variants={itemVariants} className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Professional-grade tools designed to boost your productivity and streamline your development workflow.
              </motion.p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.title}
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group"
                >
                  <ToolCard {...tool} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 px-4">
          <div className="container max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-primary/10 via-blue-600/10 to-purple-600/10 rounded-3xl p-12 border border-primary/20 backdrop-blur-sm"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to boost your productivity?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of developers who trust RuntimePad for their daily development tasks.
              </p>
              <Button asChild size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg hover:shadow-xl transition-all duration-300">
                <Link href="/editor">
                  Start Building Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}