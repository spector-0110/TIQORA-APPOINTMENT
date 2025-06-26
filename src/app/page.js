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
import { CalendarDaysIcon, UserGroupIcon, ChartBarIcon, CreditCardIcon, ClockIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

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
                <Badge variant="outline" className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-info/5 to-brand-secondary/5 text-info border-info/20 rounded-full shadow-sm">
                  ✨ Transforming Healthcare Scheduling
                </Badge>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-foreground leading-tight"
              >
                Transform Healthcare
                <br />
                <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent">
                  Appointment Scheduling
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0"
              >
                Streamline patient care with intelligent appointment management. 
                <span className="font-semibold text-foreground"> Personalized hospital portals</span> deliver 
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
                <div className="flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full border border-success/20">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-success">HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-info/10 rounded-full border border-info/20">
                  <div className="w-3 h-3 bg-info rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-info">Real-time Sync</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-brand-secondary/10 rounded-full border border-brand-secondary/20">
                  <div className="w-3 h-3 bg-brand-secondary rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-brand-secondary">24/7 Support</span>
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

    {/* Features Section */}
    <section id="features" className="py-20 px-6 scroll-mt-20 section-gradient-1 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-300/10 to-cyan-300/10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-cyan-300/10 to-indigo-300/10 rounded-full blur-2xl animate-float-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Enhanced Header Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100/90 to-purple-100/90 text-blue-800 px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-lg backdrop-blur-sm border border-blue-200/50"
          >
            <span className="text-lg">🚀</span>
            <span>Complete Healthcare Solution</span>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-blue-900 mb-8 leading-tight"
          >
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient-xy">
              Transform Healthcare
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-slate-700 max-w-4xl mx-auto leading-relaxed mb-8"
          >
            Streamline your hospital operations with our comprehensive platform designed for 
            <span className="font-semibold text-blue-800"> modern healthcare providers</span>
          </motion.p>

          {/* Key Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg border border-gray-100">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-bold text-green-700">500+ Hospitals</span>
            </div>
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg border border-gray-100">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="font-bold text-blue-700">99.9% Uptime</span>
            </div>
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg border border-gray-100">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="font-bold text-purple-700">60% Efficiency Boost</span>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Dedicated URL Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <Card id="get-started" className="shadow-2xl border-0 bg-white/95 backdrop-blur-lg rounded-3xl hover:shadow-3xl transition-all duration-500 hover:scale-105 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white/50 to-purple-50/50"></div>
            <CardContent className="relative z-10 p-8 md:p-12">
              <div className="text-center space-y-8">
                <div className="flex items-center justify-center space-x-4 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl animate-pulse-glow">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-slate-800 text-2xl">Your Dedicated Hospital Portal</h3>
                    <p className="text-slate-600">Professional, branded, and personalized</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 rounded-2xl border-2 border-dashed border-gray-300 font-mono text-center text-xl md:text-2xl shadow-inner hover:border-blue-400 transition-all duration-300 hover:shadow-lg">
                  <span className="text-slate-500">tiqora.in/</span>
                  <span className="text-blue-600 font-bold bg-blue-100 px-3 py-2 rounded-lg mx-1 animate-pulse">[your-hospital-name]</span>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="flex items-center gap-3 bg-green-50 p-4 rounded-xl border border-green-200">
                    <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-green-800">Custom Branding</div>
                      <div className="text-sm text-green-600">Your logo & colors</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-xl border border-blue-200">
                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-blue-800">Secure Access</div>
                      <div className="text-sm text-blue-600">SSL encrypted</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-purple-50 p-4 rounded-xl border border-purple-200">
                    <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-purple-800">Lightning Fast</div>
                      <div className="text-sm text-purple-600">Sub-second loading</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Smart Scheduling Feature */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="group relative bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-3 hover:scale-105 overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-blue-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Icon Container */}
            <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
              <CalendarDaysIcon className="w-8 h-8 text-white" />
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-blue-900 mb-4 group-hover:text-blue-700 transition-colors">Smart Scheduling</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                AI-powered appointment booking with automated scheduling, intelligent conflict detection, and real-time patient notifications.
              </p>
              
              {/* Feature highlights */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Automated conflict resolution</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Smart time slot optimization</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Multi-channel notifications</span>
                </div>
              </div>
            </div>
            
            {/* Hover overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
          </motion.div>

          {/* Doctor Management Feature */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="group relative bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-3 hover:scale-105 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-transparent to-emerald-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
              <UserGroupIcon className="w-8 h-8 text-white" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-blue-900 mb-4 group-hover:text-green-700 transition-colors">Doctor Management</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                Comprehensive doctor profiles, advanced schedule management, and performance analytics for optimal resource allocation.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Dynamic scheduling system</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Performance tracking</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Workload optimization</span>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
          </motion.div>

          {/* Advanced Analytics Feature */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className="group relative bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-3 hover:scale-105 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-transparent to-purple-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
              <ChartBarIcon className="w-8 h-8 text-white" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-blue-900 mb-4 group-hover:text-purple-700 transition-colors">Advanced Analytics</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                Real-time insights with advanced analytics, patient flow visualization, revenue tracking, and comprehensive performance metrics.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Real-time dashboards</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Predictive analytics</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Custom reporting</span>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
          </motion.div>

          {/* Billing & Payments Feature */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
            className="group relative bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-3 hover:scale-105 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-transparent to-orange-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
              <CreditCardIcon className="w-8 h-8 text-white" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-blue-900 mb-4 group-hover:text-orange-700 transition-colors">Billing & Payments</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                Integrated billing system with multiple payment gateways, automated insurance processing, and comprehensive financial reporting.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Multiple payment options</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Insurance automation</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Financial analytics</span>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
          </motion.div>

          {/* 24/7 Operations Feature */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            viewport={{ once: true }}
            className="group relative bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-3 hover:scale-105 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 via-transparent to-red-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
              <ClockIcon className="w-8 h-8 text-white" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-blue-900 mb-4 group-hover:text-red-700 transition-colors">24/7 Operations</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                Round-the-clock system availability with real-time updates, emergency scheduling capabilities, and continuous monitoring.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>99.9% uptime guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Emergency scheduling</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Continuous monitoring</span>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
          </motion.div>

          {/* Security & Compliance Feature */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            viewport={{ once: true }}
            className="group relative bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-3 hover:scale-105 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-indigo-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
              <ShieldCheckIcon className="w-8 h-8 text-white" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-blue-900 mb-4 group-hover:text-indigo-700 transition-colors">Secure & Compliant</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                HIPAA-compliant platform with enterprise-grade security, end-to-end encryption, and comprehensive privacy protection.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>HIPAA compliance</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>End-to-end encryption</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>SOC 2 certified</span>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
          </motion.div>
        </div>

        {/* Enhanced Call-to-Action Section
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-50 via-white to-purple-50 p-8 md:p-12 rounded-3xl border-2 border-blue-100 shadow-xl backdrop-blur-sm">
            <h3 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
              Ready to Transform Your Hospital?
            </h3>
            <p className="text-xl text-slate-700 mb-8 max-w-2xl mx-auto">
              Join 500+ healthcare providers who have revolutionized their patient care with our platform
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://hospital.tiqora.in"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center px-8 py-4 cta-primary text-white font-semibold rounded-2xl text-lg will-change-transform"
              >
                <span>Start Free Trial</span>
                <svg className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              
              <button className="inline-flex items-center justify-center px-8 py-4 bg-white/80 backdrop-blur-sm text-blue-800 font-semibold rounded-2xl text-lg border-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 shadow-lg">
                <svg className="mr-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h6m2 5H7a2 2 0 01-2-2V9a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Schedule Demo</span>
              </button>
            </div>
            
            <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No setup fees</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>30-day free trial</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </motion.div> */}
      </div>
    </section>
    
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
