import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Heart, Brain, CheckCircle, Menu, X } from 'lucide-react';
import { TherapistChat } from '@/components/TherapistChat';
import { useState, useEffect } from 'react';

export function Hero() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Ensure page starts at top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleEarlyAccess = () => {
    const subject = encodeURIComponent('Early Access Registration - Wellnter');
    const body = encodeURIComponent(`Hi,

I'm interested in registering for early access to Wellnter.

Please let me know the next steps.

Best regards`);
    
    window.location.href = `mailto:contact@wellnter.com?subject=${subject}&body=${body}`;
  };

  const handleDemo = () => {
    const subject = encodeURIComponent('1:1 Demo Request - Wellnter');
    const body = encodeURIComponent(`Hi,

I would like to schedule a 1:1 demo of Wellnter.

Please let me know your availability.

Best regards`);
    
    window.location.href = `mailto:contact@wellnter.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="relative min-h-screen bg-white">
      {/* Navigation */}
      <nav className="relative z-10 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/wellnter-logo.png" 
              alt="Wellnter Logo" 
              className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0"
              onError={(e) => {
                // Fallback if image doesn't load
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="text-2xl sm:text-3xl font-bold">
              <span className="text-blue-600">Wellnter</span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
            <a href="/how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">How it Works</a>
            <a href="#ai-therapist" className="text-gray-600 hover:text-blue-600 transition-colors">AI Therapist</a>
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
              className="p-2 border-2 border-blue-500 text-blue-500 hover:bg-blue-50 rounded-lg bg-transparent"
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
                href="/how-it-works" 
                className="block text-gray-600 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How it Works
              </a>
              <a 
                href="#ai-therapist" 
                className="block text-gray-600 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                AI Therapist
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
      <div className="relative px-4 sm:px-6 lg:px-8 pt-8 sm:pt-16 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-xs sm:text-sm font-medium mb-6 sm:mb-8">
              <CheckCircle className="w-3 sm:w-4 h-3 sm:h-4 mr-2" />
              AI-Powered Mental Health Platform
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight px-2">
              Mental Health for
              <br />
              <span className="text-blue-600">High Performers</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-10 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
              AI-powered mental health and wellness coaching designed for students, researchers, and professionals.
              Stay mentally strong while pursuing excellence in academics, research, or career.
            </p>

            {/* Trust indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-10 sm:mb-12 text-sm sm:text-base text-gray-500 px-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span>Privacy First</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-blue-600" />
                <span>Burnout Prevention</span>
              </div>
              <div className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-blue-600" />
                <span>AI-Powered Insights</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12 sm:mb-16 px-4">
              <Button 
                size="lg" 
                onClick={handleEarlyAccess}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Register for Early Access
                <ArrowRight className="ml-3 w-5 sm:w-6 h-5 sm:h-6" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleDemo}
                className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl font-semibold rounded-xl border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
              >
                Schedule 1:1 Demo
              </Button>
            </div>

            {/* Social proof */}
            <p className="text-sm sm:text-base text-gray-500 mb-16 sm:mb-20 px-4">
              Join 500+ high-performing students, researchers, and professionals optimizing their mental health with Wellnter
            </p>
          </div>

          {/* AI Therapist Section */}
          <div id="ai-therapist" className="bg-gray-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-12 mx-2 sm:mx-0">
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2">
                Wellnter AI
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto px-2 sm:px-4">
                Get immediate, intelligent mental health support designed for ambitious minds under pressure.
                Start your conversation below and experience personalised AI therapy built for high-performance lifestyles.
              </p>
            </div>
            <TherapistChat />
          </div>
        </div>
      </div>
    </section>
  );
}