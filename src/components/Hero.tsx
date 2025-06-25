import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Heart, Brain, CheckCircle } from 'lucide-react';
import { TherapistChat } from '@/components/TherapistChat';

export function Hero() {
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
      <nav className="relative z-10 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-3xl font-bold">
            <span className="text-blue-600">Wellnter</span>
          </div>
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
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-sm font-medium mb-8">
              <CheckCircle className="w-4 h-4 mr-2" />
              AI-Powered Mental Health Platform
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Mental Health for
              <br />
              <span className="text-blue-600">High Performers</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              AI-powered mental health and fitness coaching designed specifically for founders, 
              developers, and professionals. Stay healthy while building your career.
            </p>

            {/* Trust indicators */}
            <div className="flex items-center justify-center space-x-8 mb-12 text-sm text-gray-500">
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
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16">
              <Button 
                size="lg" 
                onClick={handleEarlyAccess}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Register for Early Access
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleDemo}
                className="px-8 py-4 text-lg font-semibold rounded-lg border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
              >
                Schedule 1:1 Demo
              </Button>
            </div>

            {/* Social proof */}
            <p className="text-sm text-gray-500 mb-16">
              Join 500+ founders, developers, and professionals optimizing their mental health
            </p>
          </div>

          {/* AI Therapist Section */}
          <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Meet Dr. Sarah - Your AI Therapist
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
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