import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Heart, 
  MessageSquare, 
  Shield, 
  Users, 
  Calendar,
  ArrowLeft, 
  Menu, 
  X,
  CheckCircle,
  Star,
  AlertTriangle,
  Mail,
  Globe,
  Smartphone,
  Award
} from 'lucide-react';
import { useState } from 'react';

const whatWeDo = [
  {
    icon: MessageSquare,
    title: 'AI Mental Health Companion',
    description: 'Talk to our AI therapist anytime, anywhere. Designed specifically for students and researchers dealing with academic stress, thesis anxiety, and research pressure.',
    features: [
      '24/7 conversational support',
      'Academic stress specialization',
      'Crisis detection and intervention',
      'Multi-language support (10+ languages)',
      'Voice input and text chat',
      'Clinical-grade assessment (ATS triage)'
    ],
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    icon: Brain,
    title: 'Academic Stress Monitoring',
    description: 'Smart tracking of your mental health patterns, study stress, and academic performance to provide personalized insights and early burnout detection.',
    features: [
      'Study pattern analysis',
      'Burnout risk assessment',
      'Academic performance correlation',
      'Stress level monitoring',
      'Focus and productivity tracking',
      'Personalized recommendations'
    ],
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    icon: Users,
    title: 'Professional Therapist Network',
    description: 'Connect with licensed therapists who understand the unique challenges of academic life, research pressure, and student mental health.',
    features: [
      'Licensed academic mental health specialists',
      'Video and phone consultations',
      'Crisis intervention support',
      'University counseling integration',
      'Emergency appointment scheduling',
      'Culturally-adapted therapy approaches'
    ],
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    icon: Shield,
    title: 'Privacy & Security',
    description: 'Your mental health data is protected with enterprise-grade security, HIPAA compliance, and complete privacy controls.',
    features: [
      'End-to-end encryption',
      'HIPAA & FERPA compliant',
      'No data sharing with universities',
      'Anonymous support options',
      'Secure cloud infrastructure',
      'Complete data control'
    ],
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50'
  }
];

const integrations = [
  {
    name: 'University Systems',
    description: 'Seamless integration with campus counseling centers and student support services',
    icon: Calendar,
    status: 'Available'
  },
  {
    name: 'Learning Platforms',
    description: 'Connect with Canvas, Blackboard, and other LMS platforms for stress tracking',
    icon: Globe,
    status: 'Available'
  },
  {
    name: 'Mobile Apps',
    description: 'iOS and Android apps with offline support and cross-device sync',
    icon: Smartphone,
    status: 'Coming Soon'
  }
];

export function FeaturesPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleEarlyAccess = () => {
    const subject = encodeURIComponent('Early Access Registration - Wellnter');
    const body = encodeURIComponent(`Hi,

I'm interested in registering for early access to Wellnter.

Please let me know the next steps.

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
            <a href="/features" className="text-blue-600 font-medium">What We Do</a>
            <a href="/how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">How it Works</a>
            <a href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">About Us</a>
            <a href="/#ai-therapist" className="text-gray-600 hover:text-blue-600 transition-colors">AI Therapist</a>
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
                href="/features" 
                className="block text-blue-600 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                What We Do
              </a>
              <a 
                href="/how-it-works" 
                className="block text-gray-600 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How it Works
              </a>
              <a 
                href="/about" 
                className="block text-gray-600 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </a>
              <a 
                href="/#ai-therapist" 
                className="block text-gray-600 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                AI Therapist
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
              <Star className="w-4 h-4 mr-2" />
              What We Do
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Mental Health Support
              <br />
              <span className="text-blue-600">Built for Students</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We provide AI-powered mental health support specifically designed for students and researchers. 
              Our platform understands academic stress and helps you maintain wellbeing while pursuing your goals.
            </p>
          </div>
        </div>
      </section>

      {/* Crisis Support Banner */}
      <section className="py-8 bg-red-50 border-y border-red-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600 mr-2" />
              <h3 className="text-lg font-semibold text-red-800">Crisis Support Available 24/7</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white rounded-lg p-4 border border-red-200">
                <div className="font-medium text-red-800 mb-2">🇺🇸 United States</div>
                <div className="text-red-700">988 - Suicide & Crisis Lifeline</div>
                <div className="text-red-700">911 - Emergency Services</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-red-200">
                <div className="font-medium text-red-800 mb-2">🇦🇺 Australia</div>
                <div className="text-red-700">13 11 14 - Lifeline</div>
                <div className="text-red-700">000 - Emergency Services</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-red-200">
                <div className="font-medium text-red-800 mb-2">🌍 International</div>
                <div className="text-red-700">
                  <a href="mailto:contact@wellnter.com" className="hover:underline">contact@wellnter.com</a>
                </div>
                <div className="text-red-700">Emergency Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do - Main Features */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              How We Help Students & Researchers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Four core services designed to support your mental health throughout your academic journey
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {whatWeDo.map((service, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 bg-white"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 ${service.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className={`w-7 h-7 ${service.color}`} />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </CardTitle>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {service.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Integrations */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Seamless Integration
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Works with your existing academic and wellness tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {integrations.map((integration, index) => (
              <Card 
                key={index} 
                className="bg-white border border-gray-100 hover:shadow-lg transition-all duration-300 text-center"
              >
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <integration.icon className="w-8 h-8 text-blue-600" />
                    <Badge 
                      variant={integration.status === 'Available' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {integration.status}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {integration.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {integration.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Get Support & Information
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multiple ways to connect with our team and access mental health resources
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white border border-gray-100 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  General Inquiries
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Questions about our services, pricing, or getting started
                </p>
                <a 
                  href="mailto:contact@wellnter.com" 
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  contact@wellnter.com
                </a>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-100 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Crisis Support
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Immediate mental health emergency assistance
                </p>
                <a 
                  href="mailto:contact@wellnter.com" 
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  Emergency Contact
                </a>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-100 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  University Partnerships
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Institutional collaborations and campus integration
                </p>
                <a 
                  href="mailto:contact@wellnter.com" 
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Partnership Inquiries
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-white mb-8">
            <Award className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Join hundreds of students and researchers who are already using Wellnter to maintain their mental health and academic performance
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button 
              size="lg" 
              onClick={handleEarlyAccess}
              className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100 px-10 py-5 text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Early Access
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="w-full sm:w-auto px-10 py-5 text-xl font-semibold rounded-xl border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300"
              onClick={() => window.location.href = '/#ai-therapist'}
            >
              Try AI Therapist
            </Button>
          </div>
          
          <p className="text-sm text-blue-200 mt-8">
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