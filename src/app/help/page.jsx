'use client';

import { motion } from "motion/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Phone,
  Mail,
  Clock,
  HelpCircle,
  FileText,
  Users,
  Calendar,
  CreditCard,
  Settings,
  Shield,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

export default function Help() {
  const supportChannels = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our support team",
      contact: "+91 9696415586",
      availability: "Mon-Fri, 9:00 AM - 6:00 PM IST",
      action: "Call Now",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Get detailed help via email",
      contact: "support@tiqora.in",
      availability: "24/7 - Response within 24 hours",
      action: "Send Email",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      contact: "Available on website",
      availability: "Mon-Fri, 9:00 AM - 6:00 PM IST",
      action: "Start Chat",
    },
  ];

  const faqCategories = [
    { icon: Calendar, title: "Appointment Management", description: "How to book, reschedule, and manage appointments", articles: 8 },
    { icon: Users, title: "Patient Management", description: "Managing patient information and records", articles: 12 },
    { icon: CreditCard, title: "Billing & Payments", description: "Payment processing and billing questions", articles: 6 },
    { icon: Settings, title: "Account Settings", description: "Managing your account and preferences", articles: 10 },
    { icon: Shield, title: "Security & Privacy", description: "Data protection and security features", articles: 5 },
    { icon: FileText, title: "Documentation", description: "User guides and technical documentation", articles: 15 },
  ];

  const quickHelp = [
    { question: "How do I book an appointment?", answer: "Navigate to the appointment booking section, select your doctor, choose a time slot, and fill in patient details." },
    { question: "Can I reschedule my appointment?", answer: "Yes, you can reschedule up to 2 hours before your appointment time using the reschedule option." },
    { question: "How do I upload medical documents?", answer: "Use the document upload feature in your appointment details or patient portal." },
    { question: "What payment methods are accepted?", answer: "We accept all major credit cards, debit cards, UPI, and net banking." },
  ];

  return (
    <div className="min-h-screen bg-background dark:bg-[#0f172a]">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="container mx-auto px-4 py-8 max-w-6xl">
        <motion.div variants={fadeInUp} className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </motion.div>

        <motion.div variants={fadeInUp} className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-300 dark:border-indigo-700">
              <HelpCircle className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Help & Support</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Get the help you need with our comprehensive support resources and dedicated team</p>
        </motion.div>
      </motion.div>

      <motion.div variants={fadeInUp} className="mb-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Contact Support</h2>
          <p className="text-muted-foreground text-lg">Choose the best way to reach our support team</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {supportChannels.map((channel, index) => {
            const Icon = channel.icon;
            return (
              <Card key={index} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{channel.title}</h3>
                  <p className="text-muted-foreground mb-4">{channel.description}</p>
                  <div className="space-y-2 mb-6">
                    <p className="font-medium text-foreground">{channel.contact}</p>
                    <div className="flex items-center justify-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />{channel.availability}
                    </div>
                  </div>
                  <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600">{channel.action}</Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </motion.div>

      <motion.div variants={fadeInUp} className="mb-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-lg">Browse our knowledge base by category</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faqCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card key={index} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all group">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{category.title}</h3>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                      <Badge className="bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-white">{category.articles} articles</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </motion.div>

      <section className="mb-16 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Quick Help</h2>
          <p className="text-muted-foreground text-lg">Common questions and quick answers</p>
        </div>
        <div className="space-y-4">
          {quickHelp.map((item, index) => (
            <Card key={index} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">{item.question}</h3>
                <p className="text-muted-foreground">{item.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-16 px-4 max-w-6xl mx-auto">
        <Card className="bg-gradient-to-r from-orange-100/50 to-orange-50 dark:from-orange-900/30 dark:to-orange-900/10 border border-orange-300 dark:border-orange-700">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-orange-200 dark:bg-orange-800/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Emergency Support</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              For urgent technical issues affecting patient care, our emergency support line is available 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white dark:bg-orange-400 dark:hover:bg-orange-500">
                <Phone className="h-5 w-5 mr-2" /> Emergency: +91 9696415586
              </Button>
              <p className="text-sm text-muted-foreground">For non-urgent queries, please use regular support channels</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="px-4 max-w-6xl mx-auto">
        <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">&lt; 200ms</div>
                <div className="text-sm text-muted-foreground">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">Operational</div>
                <div className="text-sm text-muted-foreground">All Systems</div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-border text-sm text-muted-foreground text-center">
              Last updated: {new Date().toLocaleString()} |
              <a href="/status" className="text-indigo-600 dark:text-indigo-400 hover:underline ml-1">View detailed status page</a>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}