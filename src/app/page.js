'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import ContactUs from "@/components/ContactUs";
import {checkServerStatus} from "@/lib/patientAPI";
import { useEffect ,useState} from "react";
import { NavbarMain } from "@/components/Navbar";
import Pricing from "@/components/pricing";
import Footer from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";

export default function Home(){
  const [isServerActive, setServerActive] = useState(false);
  const isMobile = useIsMobile();

  const serverStatus = async() => {
    try {
      const active = await checkServerStatus();
      setServerActive(active.message === "Hello from Express!");
      if (!active.message) {
        setServerActive(false);
      }
    } catch (error) {
      // Silently handle error and keep system as inactive
      setServerActive(false);
    }
  }

  useEffect(() => {
    serverStatus();
  }
  , []);
  
  return (
    <>
    {/* Hero Section */}
    <div className="relative min-h-screen hero-gradient overflow-hidden">
      <NavbarMain/>
      
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-100/20 to-blue-100/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -top-48 -right-48 w-96 h-96 bg-gradient-to-br from-blue-200/10 to-purple-200/10 rounded-full blur-3xl"></div>
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 px-4 pt-16 pb-8 md:pt-24 md:pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[80vh]">
            
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left space-y-6 lg:space-y-8">
              {/* Brand Logo */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-center lg:justify-start gap-3 mb-6"
              >
                
              </motion.div>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center"
              >
                <Badge variant="outline" className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-50 to-purple-50 text-blue-800 border-blue-200 rounded-full shadow-sm">
                  ✨ Transforming Healthcare Scheduling
                </Badge>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-blue-900 leading-tight"
              >
                Transform Healthcare
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Appointment Scheduling
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl lg:text-2xl text-slate-700 leading-relaxed max-w-2xl mx-auto lg:mx-0"
              >
                Streamline patient care with intelligent appointment management. 
                <span className="font-semibold text-blue-900"> Personalized hospital portals</span> deliver 
                seamless experiences and boost operational efficiency by up to 60%.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <a
                  href="https://hospital.tiqora.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center px-8 py-4 cta-primary text-white font-semibold rounded-2xl text-lg will-change-transform"
                >
                  <span>Get Started Now</span>
                  <svg className="ml-3 w-10 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4"
              >
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-200">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-700">HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-200">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-blue-700">Real-time Sync</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full border border-purple-200">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-purple-700">24/7 Support</span>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Hero Image */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1.2, delay: 0.3, type: "spring", stiffness: 100 }}
                className="relative"
              >
                {/* Floating elements */}
                <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl rotate-12 animate-float opacity-80"></div>
                <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-xl rotate-45 animate-float-delayed opacity-60"></div>
                
                {/* Background glow */}
                <div className="absolute -inset-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-2xl"></div>
                
                {/* Main image container */}
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 transform scale-110">
                  <div className="aspect-[5/5] overflow-hidden">
                    <Image
                      src="/HeroImg1.jpeg"
                      alt="Healthcare professionals using modern scheduling system"
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                      width={500}
                      height={500}
                    />
                  </div>
                  
                  {/* Enhanced overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2 shadow-xl border border-white/20">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                              <Image
                                src="/Tiqora1.png"
                                alt="Tiqora"
                                className="w-8 h-8 rounded-md"
                                width={32}
                                height={32}
                              />
                            </div>
                            <div>
                              <div className="font-bold text-slate-800 text-lg">Powered by NextGenScale</div>
                              <div className="text-sm text-slate-600">Trusted by 500+ Healthcare Providers</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status indicators */}
                <div className="absolute top-0 right-0">
                  <div className="flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span>Live System</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-gray-400">
          <span className="text-sm font-medium">Discover More</span>
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full animate-bounce mt-2"></div>
          </div>
        </div>
      </motion.div>
    </div>

    {/* Get Started Section */}
    <div className="py-16 md:py-24  section-gradient-1 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 10, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card id="get-started" className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm rounded-3xl hover:shadow-3xl transition-all duration-300">
            <CardHeader className="text-center pb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-6 shadow-lg hover:scale-110 transition-transform"
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </motion.div>
              <CardTitle className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                Get Started in Minutes
              </CardTitle>
              <CardDescription className="text-lg md:text-xl text-slate-700 max-w-3xl mx-auto">
                Access your hospital&apos;s personalized appointment portal using your unique subdomain. 
                Simple, secure, and tailored to your healthcare facility&apos;s needs.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 pb-8">
              <div className="bg-gradient-to-r from-blue-50 via-white to-purple-50 p-6 md:p-8 rounded-2xl border border-blue-100 shadow-inner hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                    </svg>
                  </div>
                  <span className="font-bold text-slate-800 text-xl">Your Dedicated URL</span>
                </div>
                <div className="bg-white px-6 py-4 rounded-xl border-2 border-dashed border-gray-300 font-mono text-center text-lg md:text-xl shadow-sm hover:border-blue-400 transition-colors">
                  <span className="text-slate-500">tiqora.in/</span>
                  <span className="text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded">[your-hospital-name]</span>
                </div>
                <p className="text-center text-slate-600 mt-4 text-sm">
                  Each hospital gets a personalized, branded portal for their patients
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="feature-card p-6 md:p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 text-center group will-change-transform"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-blue-900 mb-3 text-xl">Hospital Portal</h3>
                  <p className="text-slate-700">Dedicated, branded interface for each healthcare facility with custom branding and settings</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="feature-card p-6 md:p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200 text-center group will-change-transform"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-blue-900 mb-3 text-xl">Patient Management</h3>
                  <p className="text-slate-700">Streamlined patient registration, medical history tracking, and seamless appointment scheduling</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="feature-card p-6 md:p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 text-center group will-change-transform"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-blue-900 mb-3 text-xl">Real-time Sync</h3>
                  <p className="text-slate-700">Live availability updates, instant booking confirmations, and real-time notifications</p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
    
    {/* Pricing Section */}
    <div id="pricing" className="py-16 md:py-24 section-gradient-2 relative overflow-hidden">
      {/* Background pattern
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div> */}
      
      {/* Gradient overlays */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative">
        <Pricing />
      </div>
    </div>
    
    {/* Contact Section */}
    <div id="contact-us" className="py-16 md:py-24 section-gradient-3 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-gradient-to-br from-purple-600/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative">
        <ContactUs />
      </div>
    </div>
    
    {/* Footer */}
    <div className="relative">
      <Footer />
    </div>

    </>
  );
}
