'use client';

import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Users, Scale, AlertTriangle, CreditCard, Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-8 max-w-4xl"
      >
        {/* Back Button */}
        <motion.div variants={fadeInUp} className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-primary/20 border border-primary/30">
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Terms of Service</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Please read these terms carefully before using our healthcare appointment scheduling platform.
          </p>
          <Badge variant="secondary" className="mt-4">
            Last updated: June 11, 2025
          </Badge>
        </motion.div>

        {/* Main Content */}
        <motion.div variants={fadeInUp} className="space-y-8">
          
          {/* Acceptance of Terms */}
          <Card className="bg-card/60 backdrop-blur-sm border border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Scale className="h-5 w-5 text-primary" />
                Acceptance of Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p className="text-sm leading-relaxed">
                By accessing and using our healthcare appointment scheduling platform ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
              <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
                <p className="text-yellow-600 dark:text-yellow-400 text-sm">
                  <strong>Important:</strong> These terms constitute a legally binding agreement between you and our service. Please read them carefully.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Use of Service */}
          <Card className="bg-card/60 backdrop-blur-sm border border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Users className="h-5 w-5 text-green-500" />
                Use of Service
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <div>
                <h4 className="text-foreground font-semibold mb-2">Permitted Uses</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Schedule and manage medical appointments with healthcare providers</li>
                  <li>Access appointment confirmations and reminders</li>
                  <li>Update your personal and medical information</li>
                  <li>Communicate with healthcare facilities through our platform</li>
                </ul>
              </div>
              <div>
                <h4 className="text-foreground font-semibold mb-2">Prohibited Uses</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Using the service for any unlawful purpose or activity</li>
                  <li>Providing false or misleading information</li>
                  <li>Attempting to gain unauthorized access to other users' accounts</li>
                  <li>Interfering with the proper functioning of the service</li>
                  <li>Using the service to spam or harass other users</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* User Accounts */}
          <Card className="bg-card/60 backdrop-blur-sm border border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-500" />
                User Accounts & Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-foreground font-semibold mb-2">Account Security</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Maintain confidentiality of your login credentials</li>
                    <li>Notify us immediately of any unauthorized access</li>
                    <li>Use strong, unique passwords</li>
                    <li>Log out from shared devices</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-foreground font-semibold mb-2">Information Accuracy</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Provide accurate and current information</li>
                    <li>Update your details when they change</li>
                    <li>Ensure medical information is complete</li>
                    <li>Verify appointment details before confirmation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medical Disclaimer */}
          <Card className="bg-card/60 backdrop-blur-sm border border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Medical Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                <p className="text-red-600 dark:text-red-400 text-sm font-semibold mb-2">Important Medical Information</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-red-600 dark:text-red-400">
                  <li>This platform is for appointment scheduling only, not medical advice</li>
                  <li>Always consult healthcare professionals for medical decisions</li>
                  <li>In case of emergency, contact emergency services immediately</li>
                  <li>We do not provide medical diagnosis or treatment recommendations</li>
                </ul>
              </div>
              <p className="text-sm">
                Our service facilitates communication between patients and healthcare providers but does not replace professional medical consultation, examination, diagnosis, or treatment.
              </p>
            </CardContent>
          </Card>

          {/* Payment Terms */}
          <Card className="bg-card/60 backdrop-blur-sm border border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-yellow-500" />
                Payment Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <div>
                <h4 className="text-foreground font-semibold mb-2">Booking Fees</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Appointment booking may be subject to convenience fees</li>
                  <li>All fees are clearly displayed before payment confirmation</li>
                  <li>Payment is processed securely through third-party providers</li>
                  <li>Refunds are subject to the cancellation policy of the healthcare provider</li>
                </ul>
              </div>
              <div>
                <h4 className="text-foreground font-semibold mb-2">Cancellations & Refunds</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Cancellation policies vary by healthcare provider</li>
                  <li>Refund eligibility depends on timing and provider policies</li>
                  <li>Processing fees may be non-refundable</li>
                  <li>Contact support for assistance with refund requests</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card className="bg-card/60 backdrop-blur-sm border border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Scale className="h-5 w-5 text-cyan-500" />
                Limitation of Liability
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p className="text-sm leading-relaxed">
                To the maximum extent permitted by applicable law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of the service.
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="text-foreground font-semibold mb-2">Service Availability</h4>
                  <p>We strive for 99.9% uptime but cannot guarantee uninterrupted service availability.</p>
                </div>
                <div>
                  <h4 className="text-foreground font-semibold mb-2">Third-Party Actions</h4>
                  <p>We are not liable for actions or decisions made by healthcare providers or their staff.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm border border-primary/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Questions About These Terms?</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-2">For legal or terms-related inquiries:</p>
                  <div className="space-y-1 text-primary">
                    <p>Email: legal@tiqora.in</p>
                    <p>Phone: +91 (555) 123-4567</p>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground mb-2">Changes to Terms:</p>
                  <p className="text-primary">We will notify users of significant changes to these terms via email and platform notifications.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
