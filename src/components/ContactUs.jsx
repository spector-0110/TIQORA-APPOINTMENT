import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useState } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.2,
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
      delayChildren: 0.1
    }
  }
};

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    location: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // For mobile number, only allow digits and limit to 10 characters
    if (name === 'mobile') {
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length <= 10) {
        setFormData(prev => ({ ...prev, [name]: digitsOnly }));
      }
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name.trim() || !formData.email.trim() || !formData.mobile.trim() || !formData.location.trim()) {
      setSubmitStatus({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    // Validate mobile number (must be exactly 10 digits)
    if (formData.mobile.length !== 10) {
      setSubmitStatus({ type: 'error', message: 'Mobile number must be exactly 10 digits.' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.mobile,
          location: formData.location
        }),
      });

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Form submitted successfully! We will contact you within 24 hours.' });
        setFormData({ name: '', email: '', mobile: '', location: '' }); // Reset form
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({ type: 'error', message: 'Failed to submit form. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return ( 
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div 
            variants={fadeInUp}
            className="text-center mb-12"
          >
            {/* <Badge variant="secondary" className="bg-blue-900/50 text-blue-300 border-blue-700 mb-4">
              Partner with Us
            </Badge> */}
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join the Tiqora
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400"> Network</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Upgrade your healthcare facility—trusted by top hospitals for seamless patient management with Tiqora, the all-in-one hospital CRM
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-8"
          >
            {/* Contact Form */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Begin Your Journey Today</CardTitle>
                  <CardDescription className="text-gray-300">
                    Complete the form, and our team will contact you within 24 hours to create your personalized healthcare portal.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {submitStatus && (
                    <div className={`mb-4 p-3 rounded-md ${
                      submitStatus.type === 'success' 
                        ? 'bg-green-900/50 border border-green-700 text-green-300' 
                        : 'bg-red-900/50 border border-red-700 text-red-300'
                    }`}>
                      {submitStatus.message}
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="text-sm font-medium text-gray-200 mb-2 block">
                        Full Name *
                      </label>
                      <Input 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Dr. Ram"
                        className="bg-gray-900/50 border-gray-600 text-white placeholder-gray-400"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-200 mb-2 block">
                        Email Address *
                      </label>
                      <Input 
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="admin@hospital.com"
                        className="bg-gray-900/50 border-gray-600 text-white placeholder-gray-400"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-200 mb-2 block">
                        Mobile Number * (10 digits)
                      </label>
                      <Input 
                        name="mobile"
                        type="tel"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        placeholder="9876543210"
                        className="bg-gray-900/50 border-gray-600 text-white placeholder-gray-400"
                        maxLength={10}
                        required
                      />
                      <p className="text-xs text-gray-400 mt-1">Enter 10-digit mobile number without country code</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-200 mb-2 block">
                        Location/City *
                      </label>
                      <Input 
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Mumbai, Maharashtra"
                        className="bg-gray-900/50 border-gray-600 text-white placeholder-gray-400"
                        required
                      />
                    </div>

                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Submitting...' : 'Request Demo & Setup'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Benefits & Info */}
            <motion.div 
              variants={containerVariants}
              className="space-y-6"
            >
              <motion.div variants={fadeInUp}>
                <Card className="bg-gray-800/40 backdrop-blur-sm border border-gray-700">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Why Choose Tiqora?</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start space-x-3">
                        <div className="w-5 h-5 bg-green-600 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>Instant setup in minutes</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-5 h-5 bg-green-600 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>Custom branding and domain</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-5 h-5 bg-green-600 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>24/7 technical support</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-5 h-5 bg-green-600 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>Secured payment method</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-5 h-5 bg-green-600 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>Seamless integration with your systems</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 backdrop-blur-sm border border-blue-700">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-semibold text-white mb-2">Enterprise Solution</h3>
                    <p className="text-blue-200 mb-4">
                      Serving 200+ healthcare facilities worldwide with 99.9% uptime
                    </p>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-300">50K+</div>
                        <div className="text-xs text-blue-200">Daily Appointments</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-300">99.9%</div>
                        <div className="text-xs text-blue-200">System Uptime</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-300">24/7</div>
                        <div className="text-xs text-blue-200">Support Available</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="bg-gray-800/30 backdrop-blur-sm border border-gray-400">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Contact Information</h3>
                    <div className="space-y-2 text-gray-300">
                      <div className="flex items-center space-x-3">
                        <svg className="w-4 h-4 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a 
                          href="mailto:info@tiqora.in" 
                          className="hover:text-gray-400 transition-colors cursor-pointer"
                        >
                          info@tiqora.in
                        </a>
                      </div>
                      <div className="flex items-center space-x-3">
                        <svg className="w-4 h-4 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <a 
                          href="tel:+919696415586" 
                          className="hover:text-gray-400 transition-colors cursor-pointer"
                        >
                          +91 9696415586
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}