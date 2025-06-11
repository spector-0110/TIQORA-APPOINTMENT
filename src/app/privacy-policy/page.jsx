'use client';

import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Eye, Lock, UserCheck, Database, Globe, ArrowLeft } from "lucide-react";
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

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-gray-700 to-neutral-900">
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
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-blue-600/20 border border-blue-600/30">
              <Shield className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <Badge variant="secondary" className="mt-4 bg-gray-800 text-gray-300 border-gray-600">
            Last updated: June 11, 2025
          </Badge>
        </motion.div>

        {/* Main Content */}
        <motion.div variants={fadeInUp} className="space-y-8">
          
          {/* Information We Collect */}
          <Card className="bg-gray-800/60 backdrop-blur-sm border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Eye className="h-5 w-5 text-blue-400" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div>
                <h4 className="text-white font-semibold mb-2">Personal Information</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Name, age, and contact information (phone number, email)</li>
                  <li>Medical appointment details and preferences</li>
                  <li>Hospital or healthcare facility information</li>
                  <li>Payment information (processed securely through third-party providers)</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Technical Information</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>IP address, browser type, and device information</li>
                  <li>Usage data and interaction patterns on our platform</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card className="bg-gray-800/60 backdrop-blur-sm border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-green-400" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>To schedule, manage, and confirm your medical appointments</li>
                <li>To communicate with you about your appointments and healthcare services</li>
                <li>To improve our platform and develop new features</li>
                <li>To ensure platform security and prevent fraud</li>
                <li>To comply with legal obligations and healthcare regulations</li>
                <li>To provide customer support and technical assistance</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Protection */}
          <Card className="bg-gray-800/60 backdrop-blur-sm border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lock className="h-5 w-5 text-purple-400" />
                Data Protection & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div>
                <h4 className="text-white font-semibold mb-2">Security Measures</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>End-to-end encryption for all sensitive data transmission</li>
                  <li>Secure storage with industry-standard encryption protocols</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Access controls and authentication mechanisms</li>
                  <li>Compliance with healthcare data protection standards (HIPAA, GDPR)</li>
                </ul>
              </div>
              <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-700">
                <p className="text-blue-200 text-sm">
                  <strong>Note:</strong> We never sell your personal information to third parties. Your health data is treated with the highest level of confidentiality.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Sharing */}
          <Card className="bg-gray-800/60 backdrop-blur-sm border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Globe className="h-5 w-5 text-orange-400" />
                Data Sharing & Third Parties
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="text-sm">We may share your information only in the following circumstances:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>With healthcare providers and hospitals for appointment management</li>
                <li>With payment processors for secure transaction handling</li>
                <li>With cloud service providers who maintain strict data protection standards</li>
                <li>When required by law or to protect our legal rights</li>
                <li>With your explicit consent for specific purposes</li>
              </ul>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card className="bg-gray-800/60 backdrop-blur-sm border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Database className="h-5 w-5 text-cyan-400" />
                Your Rights & Choices
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-white font-semibold mb-2">Access & Control</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Request access to your personal data</li>
                    <li>Update or correct your information</li>
                    <li>Delete your account and data</li>
                    <li>Export your data in a portable format</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Communication Preferences</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Opt-out of marketing communications</li>
                    <li>Manage notification preferences</li>
                    <li>Control cookie settings</li>
                    <li>Withdraw consent where applicable</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 backdrop-blur-sm border border-blue-700">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Contact Us About Privacy</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-300 mb-2">For privacy-related questions or requests:</p>
                  <div className="space-y-1 text-blue-200">
                    <p>Email: privacy@tempus.healthcare</p>
                    <p>Phone: +91 (555) 123-4567</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-300 mb-2">Response Time:</p>
                  <p className="text-blue-200">We respond to privacy requests within 30 days as required by applicable laws.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
