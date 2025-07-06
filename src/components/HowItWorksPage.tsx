import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UserPlus, Brain, Target, CheckCircle, ArrowLeft, Shield, Heart, Activity, Menu, X } from 'lucide-react';
import { useState } from 'react';

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Academic Assessment',
    description: 'Complete a comprehensive assessment designed for students and researchers. We evaluate academic stress levels, study-life balance, and education-specific mental health factors.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    number: '02',
    icon: Brain,
    title: 'Academic Stress Analysis',
    description: 'Our AI continuously monitors your mental health patterns, study stress, research pressure, and academic performance metrics to provide insights tailored to student life.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    number: '03',
    icon: Target,
    title: 'Academic-Focused Support',
    description: 'Receive targeted coaching and access to mental health experts who understand the unique pressures of student life, research deadlines, and academic environments.',
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  }
];

const benefits = [
  'Reduce academic burnout by 70%',
  'Improve study-life balance',
  'Increase focus and retention',
  'Build academic resilience'
];

const features = [
  {
    icon: Brain,
    title: 'Academic Stress Monitoring',
    description: 'Advanced algorithms track stress patterns, study cycles, and focus levels tailored specifically to academic schedules and research demands.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    icon: Heart,
    title: 'Academic Burnout Prevention',
    description: 'Catch early warning signs of study burnout and get personalized interventions before exam stress or research pressure becomes overwhelming.',
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  },
  {
    icon: Activity,
    title: 'Study Performance Optimization',
    description: 'Incorporate wellness routines and mental clarity practices into your study schedule to improve focus, memory retention, and academic productivity.',
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  }
];

export function HowItWorksPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="relative z-10 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/wellnter-logo.png" 
              alt="Wellnter Logo" 
              className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="text-2xl sm:text-3xl font-bold">
              <span className="text-blue-600">Wellnter</span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a>
            <a href="/#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
            <a href="/how-it-works" className="text-blue-600 font-medium">How it Works</a>
            <a href="/#ai-therapist" className="text-gray-600 hover:text-blue-600 transition-colors">AI Therapist</a>
            <a href="/#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
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
                href="/" 
                className="block text-gray-600 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>
              <a 
                href="/#features" 
                className="block text-gray-600 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="/how-it-works" 
                className="block text-blue-600 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How it Works
              </a>
              <a 
                href="/#ai-therapist" 
                className="block text-gray-600 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                AI Therapist
              </a>
              <a 
                href="/#contact" 
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
      <section className="py-16 sm:py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-6">
              <Target className="w-4 h-4 mr-2" />
              How It Works
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Your Academic Wellness Journey
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              A streamlined approach to mental health designed specifically for students and researchers. 
              Get started in minutes and maintain your wellbeing while pursuing academic excellence.
            </p>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-12 mb-16 text-base text-gray-600">
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-blue-600" />
              <span className="font-medium">Privacy First</span>
            </div>
            <div className="flex items-center space-x-3">
              <Heart className="w-6 h-6 text-red-600" />
              <span className="font-medium">Burnout Prevention</span>
            </div>
            <div className="flex items-center space-x-3">
              <Brain className="w-6 h-6 text-purple-600" />
              <span className="font-medium">AI-Powered Insights</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 mb-20">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connection line - Hidden on mobile */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-20 left-full w-full h-0.5 bg-gray-200 z-0" style={{ width: 'calc(100% - 2rem)' }}></div>
                )}
                
                <Card className="relative z-10 bg-white border border-gray-100 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
                  <CardContent className="p-8 sm:p-10 text-center">
                    <div className="relative mb-8">
                      <div className={`w-20 h-20 mx-auto ${step.bgColor} rounded-2xl flex items-center justify-center shadow-lg`}>
                        <step.icon className={`w-10 h-10 ${step.color}`} />
                      </div>
                      <div className="absolute -top-3 -right-3 w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
                        <span className="text-white text-lg font-bold">{step.number}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Powerful Features for Students & Researchers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge AI with proven mental health practices specifically designed for academic environments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 bg-white"
              >
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 ${feature.bgColor} rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 sm:p-12 lg:p-16 text-white">
            <div className="text-center mb-12">
              <h3 className="text-3xl sm:text-4xl font-bold mb-6">
                Proven Results for High Performers
              </h3>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Join students, researchers, and professionals who have transformed their mental health and performance
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3 bg-white/10 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
                  <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0" />
                  <span className="font-medium text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Academic Wellbeing?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Join hundreds of students and researchers who are already optimizing their academic wellbeing and performance
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button 
              size="lg" 
              onClick={handleEarlyAccess}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Early Access
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleDemo}
              className="w-full sm:w-auto px-10 py-5 text-xl font-semibold rounded-xl border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
            >
              Schedule Demo
            </Button>
          </div>
          
          <p className="text-sm text-gray-500 mt-8">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Back to Home */}
      <div className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <Button 
              variant="ghost" 
              onClick={() => window.location.href = '/'}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}