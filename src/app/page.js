'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import ContactUs from "@/components/ContactUs";
import {checkServerStatus} from "@/lib/patientAPI";
import { useEffect ,useState} from "react";
import { NavbarDemo } from "@/components/Navbar";

export default function Home(){
  const [isServerActive, setServerActive] = useState(false);

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
    <div
      className="relative mx-auto  flex max-w-8xl flex-col items-center justify-center bg-gradient-to-b from-neutral-950 via-gray-700 to-neutral-900">
      {/* <Navbar isServerActive={isServerActive} /> */}
      <NavbarDemo/>
      <div className="px-4 py-20 md:py-20">
        <h1
          className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-200 md:text-4xl lg:text-7xl dark:text-neutral-900">
          {"Healthcare Scheduling Made Simple"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block">
                {word}
              </motion.span>
            ))}
        </h1>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
            delay: 1,
          }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-400 dark:text-neutral-100">
          Streamline your healthcare operations with our intuitive appointment management system. Each hospital gets their own dedicated portal for seamless patient scheduling.
        </motion.p>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
           transition={{
            duration: 0.5,
            delay: 1.6,
          }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://hospital.tempus.vatsa.works/"
            target="_blank"
            className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            Explore Now
          </a>
          <button
          onClick={() => document.getElementById('contact-us').scrollIntoView({ behavior: 'smooth' })}
            className="w-60 transform rounded-lg border border-gray-300 bg-gray-200 px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
              
            Contact Support
          </button>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 2.2,
          }}
          className="relative z-10 mt-20 rounded-3xl  ">
           {/* Instructions Card */}
          <Card id="get-started" className="mb-12 shadow-xl bg-neutral-80/60 backdrop-blur-2xl border border-gray-700">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl text-white">Get Started</CardTitle>
              <CardDescription className="text-lg text-gray-300">
                Access your hospital&apos;s appointment portal using your unique hospital subdomain.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                  <span className="font-medium text-gray-700">Your URL Format</span>
                </div>
                <div className="bg-white px-4 py-3 rounded-lg border border-gray-300 font-mono text-center">
                  <span className="text-gray-500">tempus.vatsa.works/</span>
                  <span className="text-blue-600 font-semibold">[your-hospital-subdomain]</span>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Hospital Portal</h3>
                  <p className="text-sm text-gray-600">Dedicated interface for each healthcare facility</p>
                </div>
                
                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Patient Management</h3>
                  <p className="text-sm text-gray-600">Streamlined patient registration and scheduling</p>
                </div>
                
                <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Real-time Scheduling</h3>
                  <p className="text-sm text-gray-600">Live availability and instant appointment booking</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

      </div>
    </div>
    {/* Decorative boundary */}
    {/* <div className="relative">
      <div className="absolute inset-0 h-1/2 bg-gradient-to-t from-gray-900 to-transparent"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
            </div>
          </div>
        </div>
      </div>
    </div> */}
    <div id="contact-us"  className="py-16 bg-gradient-to-b from-neutral-900 via-gray-800 to-neutral-900 shadow-xl">
      <ContactUs />
    </div>
    </>
  );
}
