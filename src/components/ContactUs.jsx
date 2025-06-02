import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: .7,
      ease: "easeOut"
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.4
    }
  }
};

export default function ContactUs() {
  return ( 
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
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
              Join the Tempus
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400"> Network</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to modernize your healthcare facility? Join hundreds of hospitals already using Tempus for seamless appointment management.
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
                  <CardTitle className="text-2xl text-white">Get Started Today</CardTitle>
                  <CardDescription className="text-gray-300">
                    Fill out the form and our team will reach out within 24 hours to set up your custom portal.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-200 mb-2 block">
                        Hospital/Clinic Name *
                      </label>
                      <Input 
                        placeholder="City General Hospital"
                        className="bg-gray-900/50 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-200 mb-2 block">
                        Contact Person *
                      </label>
                      <Input 
                        placeholder="Dr. Sarah Johnson"
                        className="bg-gray-900/50 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-200 mb-2 block">
                        Email Address *
                      </label>
                      <Input 
                        type="email"
                        placeholder="admin@cityhospital.com"
                        className="bg-gray-900/50 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-200 mb-2 block">
                        Phone Number
                      </label>
                      <Input 
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className="bg-gray-900/50 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-200 mb-2 block">
                      Preferred Subdomain *
                    </label>
                    <div className="flex">
                      <span className="bg-gray-900/50 border border-gray-600 border-r-0 px-3 py-2 text-gray-400 text-sm rounded-l-md">
                        tempus.vatsa.works/
                      </span>
                      <Input 
                        placeholder="city-hospital"
                        className="bg-gray-900/50 border-gray-600 text-white placeholder-gray-400 rounded-l-none"
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Choose a unique identifier for your hospital portal</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-200 mb-2 block">
                      Number of Doctors/Staff
                    </label>
                    <select className="w-full bg-gray-900/50 border border-gray-600 text-white rounded-md px-3 py-2">
                      <option value="">Select range</option>
                      <option value="1-10">1-10 doctors</option>
                      <option value="11-25">11-25 doctors</option>
                      <option value="26-50">26-50 doctors</option>
                      <option value="51-100">51-100 doctors</option>
                      <option value="100+">100+ doctors</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-200 mb-2 block">
                      Additional Requirements
                    </label>
                    <textarea 
                      placeholder="Tell us about any specific features or integrations you need..."
                      rows={3}
                      className="w-full bg-gray-900/50 border border-gray-600 text-white placeholder-gray-400 rounded-md px-3 py-2 resize-none"
                    />
                  </div>

                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3">
                    Request Demo & Setup
                  </Button>
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
                    <h3 className="text-xl font-semibold text-white mb-4">Why Choose Tempus?</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start space-x-3">
                        <div className="w-5 h-5 bg-green-600 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>Quick setup process in minutes</span>
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
                        <span>Integration with existing systems</span>
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
                          href="mailto:Infonextgenscale@gmail.com" 
                          className="hover:text-gray-900 transition-colors cursor-pointer"
                        >
                          Infonextgenscale@gmail.com
                        </a>
                      </div>
                      <div className="flex items-center space-x-3">
                        <svg className="w-4 h-4 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <a 
                          href="tel:+919696415586" 
                          className="hover:text-gray-900 transition-colors cursor-pointer"
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
