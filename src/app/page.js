import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import ContactUs from "@/components/ContactUs";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-700 to-slate-900">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">

              <h1 className="text-xl font-semibold text-white">Tempus</h1>
            </div>
            <Badge variant="secondary" className="bg-green-900/50 text-green-300 border-green-700">
              System Active
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-900/50 text-blue-300 rounded-full text-sm font-medium mb-6 border border-blue-800">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Multi-tenant Appointment System
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Healthcare
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400"> Scheduling</span>
              <br />Made Simple
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Streamline your healthcare operations with our intuitive appointment management system. 
              Each hospital gets their own dedicated portal for seamless patient scheduling.
            </p>
          </div>

          {/* Instructions Card */}
          <Card className="mb-12 shadow-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700">
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

          {/* Footer */}
          
        </div>
      </main>

      {/* Contact Us Section */}
      <ContactUs />
    </div>
  );
}
