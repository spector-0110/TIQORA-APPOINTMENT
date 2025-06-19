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
      className="relative"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div 
            variants={fadeInUp}
            className="text-center mb-12 md:mb-20"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mx-auto mb-8 shadow-2xl hover:scale-110 transition-transform">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-900 mb-6">
              Ready to <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">Transform</span>
              <br />Your Healthcare?
            </h2>
            <p className="text-xl md:text-2xl text-slate-700 max-w-4xl mx-auto leading-relaxed">
              Join hundreds of healthcare providers who trust Tiqora for seamless patient management. 
              <span className="text-blue-900 font-semibold"> Let's build your personalized portal together.</span>
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="grid lg:grid-cols-2 gap-8 md:gap-16"
          >
            {/* Contact Form */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-white/95 backdrop-blur-xl border-0 shadow-strong hover:shadow-xl transition-all duration-500 rounded-3xl">
                <CardHeader className="relative">
                  <div className="absolute -top-6 left-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="pt-8">
                    <CardTitle className="text-3xl text-blue-900 mb-3">Get Started Today</CardTitle>
                    <CardDescription className="text-slate-700 text-lg">
                      Complete this form and our team will contact you within 24 hours to create your personalized healthcare portal.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  {submitStatus && (
                    <div className={`mb-4 p-3 rounded-md ${
                      submitStatus.type === 'success' 
                        ? 'bg-green-50 border border-green-200 text-green-700' 
                        : 'bg-red-50 border border-red-200 text-red-700'
                    }`}>
                      {submitStatus.message}
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="text-sm font-medium text-slate-800 mb-2 block">
                        Full Name *
                      </label>
                      <Input 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Dr. Ram"
                        className="bg-white border-blue-200 text-slate-800 placeholder-slate-500 focus:border-blue-400"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-800 mb-2 block">
                        Email Address *
                      </label>
                      <Input 
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="admin@hospital.com"
                        className="bg-white border-blue-200 text-slate-800 placeholder-slate-500 focus:border-blue-400"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-800 mb-2 block">
                        Mobile Number * (10 digits)
                      </label>
                      <Input 
                        name="mobile"
                        type="tel"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        placeholder="9876543210"
                        className="bg-white border-blue-200 text-slate-800 placeholder-slate-500 focus:border-blue-400"
                        maxLength={10}
                        required
                      />
                      <p className="text-xs text-slate-600 mt-1">Enter 10-digit mobile number without country code</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-800 mb-2 block">
                        Location/City *
                      </label>
                      <Input 
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Mumbai, Maharashtra"
                        className="bg-white border-blue-200 text-slate-800 placeholder-slate-500 focus:border-blue-400"
                        required
                      />
                    </div>

                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full cta-primary text-white font-semibold py-3 disabled:opacity-50 disabled:cursor-not-allowed"
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
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-medium hover:shadow-strong transition-all duration-300 rounded-2xl">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">Why Choose Tiqora?</h3>
                    <ul className="space-y-3 text-slate-700">
                      <li className="flex items-start space-x-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>Instant setup in minutes</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>Custom branding and domain</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>24/7 technical support</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>Secured payment method</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center">
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
                <Card className="bg-gradient-to-r from-blue-50 to-purple-50 backdrop-blur-sm border border-blue-200 shadow-medium hover:shadow-strong transition-all duration-300 rounded-2xl">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">Enterprise Solution</h3>
                    <p className="text-slate-700 mb-4">
                      Serving 200+ healthcare facilities worldwide with 99.9% uptime
                    </p>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">50K+</div>
                        <div className="text-xs text-slate-600">Daily Appointments</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">99.9%</div>
                        <div className="text-xs text-slate-600">System Uptime</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">24/7</div>
                        <div className="text-xs text-slate-600">Support Available</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="bg-white/80 backdrop-blur-sm border border-blue-100 shadow-soft hover:shadow-medium transition-all duration-300 rounded-2xl">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">Contact Information</h3>
                    <div className="space-y-2 text-slate-700">
                      <div className="flex items-center space-x-3">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a 
                          href="mailto:info@tiqora.in" 
                          className="hover:text-blue-800 transition-colors cursor-pointer"
                        >
                          info@tiqora.in
                        </a>
                      </div>
                      <div className="flex items-center space-x-3">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <a 
                          href="tel:+919696415586" 
                          className="hover:text-blue-800 transition-colors cursor-pointer"
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