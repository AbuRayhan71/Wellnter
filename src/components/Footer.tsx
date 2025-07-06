import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Github, Linkedin, Mail, Twitter, ArrowRight } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white">
      {/* Newsletter section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">
              Get the latest insights on mental health, wellness strategies, and AI-powered solutions for high performers.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 h-10 sm:h-12 px-4 rounded-lg w-full sm:flex-1"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 px-6 sm:px-8 h-10 sm:h-12 rounded-lg font-semibold whitespace-nowrap w-full sm:w-auto">
                Subscribe
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            
            <p className="text-xs text-gray-500 mt-3 sm:mt-4">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" id="contact">
          {/* Brand */}
          <div className="sm:col-span-2">
            <div className="flex items-center space-x-3 mb-3 sm:mb-4">
              <img 
                src="/wellnter-logo.png" 
                alt="Wellnter Logo" 
                className="w-6 h-6 sm:w-8 sm:h-8"
                onError={(e) => {
                  // Fallback if image doesn't load
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="text-xl sm:text-2xl font-bold text-blue-400">
                Wellnter
              </div>
            </div>
            <p className="text-gray-400 mb-4 sm:mb-6 max-w-md leading-relaxed text-sm sm:text-base">
              AI-powered mental health and wellness support platform designed specifically 
              for students and researchers navigating academic challenges and research pressure.
            </p>
            
            {/* Contact Information */}
            <div className="mb-4 sm:mb-6 space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-3 text-gray-400 text-sm sm:text-base">
                <Mail className="w-4 h-4" />
                <a href="mailto:contact@wellnter.com" className="hover:text-white transition-colors">
                  contact@wellnter.com
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 text-sm sm:text-base">
                <Linkedin className="w-4 h-4" />
                <a 
                  href="https://www.linkedin.com/company/107561458/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Follow Wellnter on LinkedIn
                </a>
              </div>
            </div>
            
            {/* Social links */}
            <div className="flex space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-400 hover:text-white hover:bg-gray-800 p-2"
                asChild
              >
                <a href="https://www.linkedin.com/company/107561458/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800 p-2">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800 p-2">
                <Github className="w-5 h-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-400 hover:text-white hover:bg-gray-800 p-2"
                asChild
              >
                <a href="mailto:contact@wellnter.com">
                  <Mail className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h5 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">Services</h5>
            <ul className="space-y-2 sm:space-y-3 text-gray-400 text-sm sm:text-base">
              <li><a href="/#ai-therapist" className="hover:text-white transition-colors">AI Mental Health Companion</a></li>
              <li><a href="/features" className="hover:text-white transition-colors">Academic Stress Support</a></li>
              <li><a href="/features" className="hover:text-white transition-colors">Study Burnout Prevention</a></li>
              <li><a href="/features" className="hover:text-white transition-colors">Research Anxiety Help</a></li>
              <li><a href="/features" className="hover:text-white transition-colors">Professional Therapist Network</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">Company</h5>
            <ul className="space-y-2 sm:space-y-3 text-gray-400 text-sm sm:text-base">
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">Our Mission</a></li>
              <li><a href="/how-it-works" className="hover:text-white transition-colors">How it Works</a></li>
              <li><a href="mailto:contact@wellnter.com" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <p className="text-gray-400 text-xs sm:text-sm">
            © 2024 Wellnter. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 sm:space-x-6 text-xs sm:text-sm text-gray-400">
            <a href="/features" className="hover:text-white transition-colors">Security</a>
            <a href="mailto:contact@wellnter.com" className="hover:text-white transition-colors">Support</a>
            <a href="/features" className="hover:text-white transition-colors">Resources</a>
          </div>
        </div>
      </div>
    </footer>
  );
}