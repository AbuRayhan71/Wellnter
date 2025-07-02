import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Heart, Brain, CheckCircle, Menu, X } from 'lucide-react';
import { TherapistChat } from '@/components/TherapistChat';
import { useState } from 'react';

export function Hero() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleEarlyAccess = () => {
    const subject = encodeURIComponent('Early Access Registration - Wellnter');
    const body = encodeURIComponent(`Hi,

I'm interested in registering for early access to Wellnter.

Please let me know the next steps.

Best regards`);
    
    window.location.href = `mailto:mdabu.rayhan@outlook.com?subject=${subject}&body=${body}`;
  };

  const handleDemo = () => {
    const subject = encodeURIComponent('1:1 Demo Request - Wellnter');
    const body = encodeURIComponent(`Hi,

I would like to schedule a 1:1 demo of Wellnter.

Please let me know your availability.

Best regards`);
    
    window.location.href = `mailto:mdabu.rayhan@outlook.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="relative min-h-screen bg-white">
      {/* Navigation */}
      <nav className="relative z-10 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/src/assets/ChatGPT Image Jul 2, 2025, 01_33_41 PM.png" 
              alt="Wellnter Logo" 
              className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0"
            />
            <div className="text-2xl sm:text-3xl font-bold">
              <span className="text-blue-600">Wellnter</span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">How it Works</a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
            <Button 
              onClick={handleEarlyAccess}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
            >
              Get Early Access
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
            <div className="px-4 py-4 space-y-4">
              <a 
                href="#features" 
                className="block text-gray-600 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#how-it-works" 
                className="block text-gray-600 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How it Works
              </a>
              <a 
                href="#contact" 
                className="block text-gray-600 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
              <Button 
                onClick={() => {
                  handleEarlyAccess();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
              >
                Get Early Access
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative px-4 sm:px-6 lg:px-8 pt-8 sm:pt-16 pb-12 sm:pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-xs sm:text-sm font-medium mb-6 sm:mb-8">
              <CheckCircle className="w-3 sm:w-4 h-3 sm:h-4 mr-2" />
              AI-Powered Mental Health Platform
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight px-2">
              Mental Health for
              <br />
              <span className="text-blue-600">High Performers</span>
            </h1>
            
            <p className="text-base sm:text-xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
              AI-powered mental health and fitness coaching designed specifically for founders, 
              developers, and professionals. Stay healthy while building your career.
            </p>

            {/* Trust indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8 sm:mb-12 text-xs sm:text-sm text-gray-500 px-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-blue-600" />
                <span>Privacy First</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-blue-600" />
                <span>Burnout Prevention</span>
              </div>
              <div className="flex items-center space-x-2">
                <Brain className="w-4 h-4 text-blue-600" />
                <span>AI-Powered Insights</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12 sm:mb-16 px-4">
              <Button 
                size="lg" 
                onClick={handleEarlyAccess}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Register for Early Access
                <ArrowRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleDemo}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
              >
                Schedule 1:1 Demo
              </Button>
            </div>

            {/* Social proof */}
            <p className="text-xs sm:text-sm text-gray-500 mb-12 sm:mb-16 px-4">
              Join 500+ founders, developers, and professionals optimizing their mental health
            </p>
          </div>

          {/* AI Therapist Section */}
          <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-8 lg:p-12">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
                Meet Dr. Sarah - Your AI Therapist
              </h2>
              <p className="text-sm sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
                Get immediate mental health support designed for high-performing professionals. 
                Start your conversation below and experience personalized AI therapy.
              </p>
            </div>
            <TherapistChat />
          </div>
        </div>
      </div>
    </section>
  );
}