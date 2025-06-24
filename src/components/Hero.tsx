import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Heart, Brain } from 'lucide-react';
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
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center mb-8">
            <div className="text-6xl sm:text-7xl lg:text-8xl font-bold">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 bg-clip-text text-transparent">
                Wellnter
              </span>
            </div>
          </div>

          {/* Hero content */}
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Mental Health for
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> 
                {" "}High Performers
              </span>
            </h2>
            
            <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              AI-powered mental health and fitness coaching for founders, developers, and professionals. 
              Stay healthy while building your career.
            </p>
          </div>

          {/* Therapist Chat Section - Moved to top */}
          <div className="w-full mb-16">
            <div className="text-center mb-8">
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Talk to Dr. Sarah - Your AI Therapist
              </h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Get immediate mental health support designed for high-performing professionals. 
                Start your conversation below and experience personalized AI therapy.
              </p>
            </div>
            <TherapistChat />
          </div>

          {/* Trust indicators and CTA - Moved below chat */}
          <div className="text-center">
            {/* Trust indicators */}
            <div className="flex items-center justify-center space-x-8 mb-12 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Privacy First</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4" />
                <span>Burnout Prevention</span>
              </div>
              <div className="flex items-center space-x-2">
                <Brain className="w-4 h-4" />
                <span>AI-Powered Insights</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
              <Button 
                size="lg" 
                onClick={handleEarlyAccess}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Register for Early Access
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleDemo}
                className="px-8 py-4 text-lg font-semibold rounded-xl border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
              >
                Register for 1:1 Demo
              </Button>
            </div>

            {/* Social proof */}
            <p className="text-sm text-gray-500">
              Join 500+ founders, developers, and professionals optimizing their mental health
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}