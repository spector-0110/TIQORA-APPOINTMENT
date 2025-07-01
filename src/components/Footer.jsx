'use client';

import { Mail, Phone, MapPin, Twitter, Linkedin, Facebook, Instagram, Heart, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-background via-muted/20 to-muted/40 border-t border-border">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${encodeURIComponent('hsl(var(--primary))')}'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-4 md:mb-6">
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
                <h2 className="text-2xl md:text-3xl font-bold text-primary">
                  Tiqora   
                </h2>
              </div>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-md">
                Revolutionizing healthcare with intelligent appointment management and seamless patient experiences.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                <a href="mailto:info@tiqora.in" className="hover:underline text-sm md:text-base">
                  info@tiqora.in
                </a>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-4 h-4 md:w-5 md:h-5 text-success" />
                <span className="text-sm md:text-base">+91 9696415586</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 text-destructive" />
                <span className="text-sm md:text-base">India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-foreground">Quick Links</h3>
            <ul className="space-y-2 md:space-y-3">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/#about' },
                { name: 'Contact', href: '/#contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-foreground">Legal & Support</h3>
            <ul className="space-y-2 md:space-y-3">
              {[
                { name: 'Privacy Policy', href: '/privacy-policy' },
                { name: 'Terms of Service', href: '/terms' },
                { name: 'Data Deletion', href: '/data-deletion' },
                { name: 'Help Center', href: '/help' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                    {link.external && <ExternalLink className="w-3 h-3 opacity-60" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & Bottom Section */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Social Media */}
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground text-sm">Follow us:</span>
              <div className="flex gap-3">
                {[
                  { icon: Twitter, href: 'https://x.com/tiqorahealth', color: 'hover:text-primary' },
                  { icon: Linkedin, href: 'https://linkedin.com/company/tiqora', color: 'hover:text-primary' },
                  { icon: Facebook, href: 'https://facebook.com/tiqora', color: 'hover:text-primary' },
                  { icon: Instagram, href: 'https://www.instagram.com/tiqora_', color: 'hover:text-primary' },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg bg-muted border border-border text-muted-foreground ${social.color} transition-all duration-200 hover:scale-110 hover:shadow-md hover:border-primary`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-muted-foreground text-sm">
                © {currentYear} Tiqora. All rights reserved.
              </p>
              <p className="text-muted-foreground/60 text-xs mt-1">
                Made with ❤️ by <a href="https://www.nextgenscale.in" target="_blank" rel="noopener noreferrer">nextgenscale</a> <br />
                for better healthcare
              </p>
            </div>
                      </div>
                    </div>

                    {/* CTA Section
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-background/80 to-muted rounded-2xl p-8 border border-border shadow-soft hover:shadow-medium transition-all duration-300">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Transform Your Healthcare Experience?
            </h3>
            <p className="text-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of patients and healthcare providers who trust TIQORA for seamless appointment management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://hospital.tiqora.in"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
              >
                For Healthcare Providers
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div> */}
      </div>
    </footer>
  );
}
