'use client';

import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Database, UserX, Clock, Shield, Mail, ArrowLeft } from "lucide-react";
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

export default function DataDeletion() {
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
            <div className="p-3 rounded-lg bg-red-600/20 border border-red-600/30">
              <Trash2 className="h-8 w-8 text-red-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Data Deletion</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Learn about your rights to delete your personal data and how we handle data deletion requests.
          </p>
          <Badge variant="secondary" className="mt-4 bg-gray-800 text-gray-300 border-gray-600">
            Last updated: June 11, 2025
          </Badge>
        </motion.div>

        {/* Main Content */}
        <motion.div variants={fadeInUp} className="space-y-8">
          
          {/* Your Right to Delete */}
          <Card className="bg-gray-800/60 backdrop-blur-sm border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <UserX className="h-5 w-5 text-blue-400" />
                Your Right to Data Deletion
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="text-sm leading-relaxed">
                Under various privacy laws including GDPR, CCPA, and other applicable regulations, you have the right to request deletion of your personal data. We are committed to honoring these rights while balancing legal and operational requirements.
              </p>
              <div>
                <h4 className="text-white font-semibold mb-2">What You Can Request to Delete</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Personal identification information (name, email, phone number)</li>
                  <li>Account credentials and profile data</li>
                  <li>Appointment history and preferences</li>
                  <li>Communication records with our support team</li>
                  <li>Usage analytics and behavioral data</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* What Data We Keep */}
          <Card className="bg-gray-800/60 backdrop-blur-sm border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Database className="h-5 w-5 text-amber-400" />
                Data We May Retain
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-amber-900/30 p-4 rounded-lg border border-amber-700">
                <p className="text-amber-200 text-sm font-semibold mb-2">Legal Requirements</p>
                <p className="text-amber-200 text-sm">
                  Some data may be retained for legal, regulatory, or legitimate business purposes even after a deletion request.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-white font-semibold mb-2">Required Retention</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Financial transaction records (7 years)</li>
                    <li>Medical appointment records (as required by healthcare regulations)</li>
                    <li>Legal compliance documentation</li>
                    <li>Security incident logs</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Anonymized Data</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Aggregated usage statistics</li>
                    <li>Research and analytics data</li>
                    <li>System performance metrics</li>
                    <li>Quality improvement data</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Deletion Process */}
          <Card className="bg-gray-800/60 backdrop-blur-sm border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-400" />
                Data Deletion Process
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">1</div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Submit Request</h4>
                    <p className="text-sm">Send a deletion request via email or through your account settings. Include your full name and email address associated with your account.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">2</div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Identity Verification</h4>
                    <p className="text-sm">We verify your identity to ensure the security of your data. This may require additional information or confirmation steps.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">3</div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Review & Processing</h4>
                    <p className="text-sm">We review your request, check for any legal retention requirements, and begin the deletion process for eligible data.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">4</div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Confirmation</h4>
                    <p className="text-sm">You receive confirmation once the deletion is complete, along with details about any data that was retained and why.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline & Exceptions */}
          <Card className="bg-gray-800/60 backdrop-blur-sm border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-400" />
                Timeline & Special Circumstances
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold mb-2">Processing Timeline</h4>
                  <ul className="space-y-2 text-sm">
                    <li><span className="text-blue-400">• 1-3 business days:</span> Initial review and verification</li>
                    <li><span className="text-green-400">• 7-14 business days:</span> Data deletion from active systems</li>
                    <li><span className="text-purple-400">• 30 days:</span> Complete removal from backups and archives</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Exceptions</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Active legal proceedings</li>
                    <li>Ongoing medical treatments</li>
                    <li>Fraud investigations</li>
                    <li>Regulatory compliance requirements</li>
                  </ul>
                </div>
              </div>
              <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-700">
                <p className="text-purple-200 text-sm">
                  <strong>Important:</strong> Once your data is deleted, it cannot be recovered. Please ensure you have saved any information you may need before submitting a deletion request.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Third-Party Data */}
          <Card className="bg-gray-800/60 backdrop-blur-sm border border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Database className="h-5 w-5 text-cyan-400" />
                Third-Party Data & Healthcare Providers
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p className="text-sm leading-relaxed">
                Please note that data shared with healthcare providers, hospitals, or other third-party services may not be automatically deleted from their systems when you delete your account with us.
              </p>
              <div>
                <h4 className="text-white font-semibold mb-2">Separate Deletion Requests Required For:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Hospital and clinic patient management systems</li>
                  <li>Healthcare provider electronic health records (EHR)</li>
                  <li>Insurance and billing systems</li>
                  <li>Third-party payment processors</li>
                  <li>Email and communication platforms used by providers</li>
                </ul>
              </div>
              <div className="bg-cyan-900/30 p-4 rounded-lg border border-cyan-700">
                <p className="text-cyan-200 text-sm">
                  <strong>Recommendation:</strong> Contact healthcare providers directly to request deletion of your data from their systems if desired.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-gradient-to-r from-red-900/40 to-pink-900/40 backdrop-blur-sm border border-red-700">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Submit a Data Deletion Request</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="h-4 w-4 text-red-400" />
                    <span className="text-gray-300">Email Request:</span>
                  </div>
                  <div className="space-y-1 text-red-200">
                    <p>privacy@tempus.healthcare</p>
                    <p className="text-xs">Subject: "Data Deletion Request"</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-300 mb-2">Include in your request:</p>
                  <ul className="list-disc list-inside space-y-1 text-red-200 text-xs">
                    <li>Full name and email address</li>
                    <li>Account details or appointment references</li>
                    <li>Reason for deletion (optional)</li>
                    <li>Preferred method of confirmation</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-3 bg-red-800/30 rounded-lg border border-red-600">
                <p className="text-red-200 text-xs">
                  <strong>Security Note:</strong> For your protection, we may ask for additional verification before processing deletion requests.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
