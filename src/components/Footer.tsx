import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Github, Linkedin, Mail, Twitter, ArrowRight } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white">
      {/* Newsletter section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-8">
              Get the latest insights on mental health, wellness strategies, and AI-powered solutions for high performers.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 h-12 px-4 rounded-lg"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 px-8 h-12 rounded-lg font-semibold whitespace-nowrap">
                Subscribe
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            
            <p className="text-xs text-gray-500 mt-4">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="text-2xl font-bold text-blue-400 mb-4">
              Wellnter
            </div>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              AI-powered mental health support and fitness coaching platform designed specifically 
              for founders, developers, and high-performing professionals.
            </p>
            
            {/* Contact Information */}
            <div className="mb-6 space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-4 h-4" />
                <a href="mailto:mdabu.rayhan@outlook.com" className="hover:text-white transition-colors">
                  mdabu.rayhan@outlook.com
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Linkedin className="w-4 h-4" />
                <a 
                  href="https://www.linkedin.com/in/md-abu-rayhan-854b3b1a9/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Connect with our founder
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
                <a href="https://www.linkedin.com/in/md-abu-rayhan-854b3b1a9/" target="_blank" rel="noopener noreferrer">
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
                <a href="mailto:mdabu.rayhan@outlook.com">
                  <Mail className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h5 className="text-lg font-semibold mb-6 text-white">Services</h5>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">AI Therapy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Burnout Prevention</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Performance Coaching</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Stress Monitoring</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Wellness Assessment</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 className="text-lg font-semibold mb-6 text-white">Company</h5>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Our Mission</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm">
            © 2024 Wellnter. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 sm:mt-0 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Security</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
            <a href="#" className="hover:text-white transition-colors">Resources</a>
          </div>
        </div>
      </div>
    </footer>
  );
}