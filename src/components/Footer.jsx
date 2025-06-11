'use client';

import { Mail, Phone, MapPin, Twitter, Linkedin, Facebook, Instagram, Heart, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">

                    <a
                        href="/"
                        className="relative z-20 h-12 w-12 *:hover:opacity-40 transition-opacity duration-500 bg-neutral rounded-lg">
                        <img
                            style={{ backgroundColor: 'white' }}
                            src="/Tiqora1.png"
                            alt="Tiqora Logo"
                            className="h-12 w-12 object-cover *:hover:opacity-40 transition-opacity duration-500 rounded-lg"
                        />
                    </a>
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  TIQORA    
                </h2>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                Revolutionizing healthcare with intelligent appointment management and seamless patient experiences.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors">
                <Mail className="w-5 h-5 text-blue-400" />
                <a href="mailto:info@tiqora.in" className="hover:underline">
                  info@tiqora.in
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-5 h-5 text-green-400" />
                <span>+91 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-5 h-5 text-red-400" />
                <span>India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', href: '/' },
                { name: 'Book Appointment', href: '/#book' },
                { name: 'Pricing', href: '/#pricing' },
                { name: 'About Us', href: '/#about' },
                { name: 'Contact', href: '/#contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Legal & Support</h3>
            <ul className="space-y-3">
              {[
                { name: 'Privacy Policy', href: '/privacy-policy' },
                { name: 'Terms of Service', href: '/terms' },
                { name: 'Data Deletion', href: '/data-deletion' },
                { name: 'Help Center', href: '/#help' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                    {link.external && <ExternalLink className="w-3 h-3 opacity-60" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & Bottom Section */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Social Media */}
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">Follow us:</span>
              <div className="flex gap-3">
                {[
                  { icon: Twitter, href: 'https://twitter.com/tiqora', color: 'hover:text-blue-400' },
                  { icon: Linkedin, href: 'https://linkedin.com/company/tiqora', color: 'hover:text-blue-600' },
                  { icon: Facebook, href: 'https://facebook.com/tiqora', color: 'hover:text-blue-500' },
                  { icon: Instagram, href: 'https://instagram.com/tiqora', color: 'hover:text-pink-400' },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg bg-gray-800 text-gray-400 ${social.color} transition-all duration-200 hover:scale-110 hover:bg-gray-700`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © {currentYear} TIQORA. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Made with ❤️ for better healthcare
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-blue-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Transform Your Healthcare Experience?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of patients and healthcare providers who trust TIQORA for seamless appointment management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://hospital.tiqora.in"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
              >
                For Healthcare Providers
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="/#book"
                className="px-8 py-3 border border-blue-500 text-blue-400 font-semibold rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-200 hover:scale-105"
              >
                Book Appointment
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
