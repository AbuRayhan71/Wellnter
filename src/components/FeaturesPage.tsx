import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Heart, 
  Activity, 
  Users, 
  Shield, 
  Target, 
  BookOpen, 
  Clock, 
  TrendingUp, 
  Zap, 
  CheckCircle, 
  ArrowLeft, 
  Menu, 
  X,
  GraduationCap,
  Microscope,
  FileText,
  BarChart3,
  MessageSquare,
  Lock,
  Globe,
  Smartphone,
  Calendar,
  AlertTriangle,
  Star,
  Award
} from 'lucide-react';
import { useState } from 'react';

const mainFeatures = [
  {
    icon: Target,
    title: 'Built for Academic Life',
    description: 'Whether you\'re managing coursework, thesis deadlines, research projects, or dissertation stress, Wellnter understands the unique pressures of academic life.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    category: 'Academic Focus'
  },
  {
    icon: Brain,
    title: 'Academic Stress Monitoring',
    description: 'Our AI tracks stress patterns, study cycles, and focus levels specifically tailored to academic schedules and research demands.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    category: 'AI Technology'
  },
  {
    icon: Heart,
    title: 'Academic Burnout Prevention',
    description: 'Catch early warning signs of academic burnout and get personalized interventions before exam stress or research pressure becomes overwhelming.',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    category: 'Prevention'
  },
  {
    icon: Activity,
    title: 'Study Performance Optimization',
    description: 'Incorporate wellness routines and mental clarity practices into your study schedule to improve focus, memory retention, and academic productivity.',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    category: 'Performance'
  },
  {
    icon: Users,
    title: 'Academic-Focused Support',
    description: 'Access certified therapists and academic coaches who understand the unique challenges of student life, research stress, and academic pressure.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    category: 'Expert Support'
  },
  {
    icon: Shield,
    title: 'Student Privacy & Security',
    description: 'Your academic and mental health data is protected with enterprise-grade encryption — completely confidential and secure.',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    category: 'Security'
  }
];

const detailedFeatures = [
  {
    icon: GraduationCap,
    title: 'Student-Specific Assessments',
    description: 'Comprehensive mental health evaluations designed specifically for academic environments, covering study stress, exam anxiety, thesis pressure, and research challenges.',
    benefits: ['Academic stress evaluation', 'Study-life balance assessment', 'Research pressure analysis', 'Exam anxiety screening'],
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    icon: Microscope,
    title: 'Research Stress Support',
    description: 'Specialized support for researchers dealing with publication pressure, funding stress, imposter syndrome, and the unique challenges of academic research.',
    benefits: ['Publication anxiety help', 'Funding stress management', 'Imposter syndrome support', 'Research milestone tracking'],
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    icon: FileText,
    title: 'Thesis & Dissertation Support',
    description: 'Dedicated mental health support for students working on major academic projects, helping manage the stress and isolation of long-term research.',
    benefits: ['Thesis anxiety management', 'Writing block support', 'Deadline stress relief', 'Motivation maintenance'],
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    icon: BarChart3,
    title: 'Academic Performance Insights',
    description: 'AI-powered analytics that correlate your mental health patterns with academic performance, helping you optimize both wellbeing and study outcomes.',
    benefits: ['Study pattern analysis', 'Performance correlation', 'Optimal study timing', 'Productivity insights'],
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  {
    icon: MessageSquare,
    title: 'Peer Support Networks',
    description: 'Connect with other students and researchers facing similar challenges in a safe, moderated environment designed for academic mental health.',
    benefits: ['Anonymous peer groups', 'Study buddy matching', 'Research community', 'Academic mentorship'],
    color: 'text-pink-600',
    bgColor: 'bg-pink-50'
  },
  {
    icon: Clock,
    title: '24/7 Academic Crisis Support',
    description: 'Round-the-clock access to mental health resources specifically for academic crises, including exam panic, thesis deadlines, and research setbacks.',
    benefits: ['Emergency support hotline', 'Crisis intervention', 'Immediate coping strategies', 'Academic counselor access'],
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  }
];

const techFeatures = [
  {
    icon: Zap,
    title: 'Real-time Stress Detection',
    description: 'Advanced AI algorithms monitor your digital behavior patterns to detect early signs of academic stress and burnout.',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50'
  },
  {
    icon: Globe,
    title: 'Multi-language Support',
    description: 'Available in 10+ languages to support international students and researchers from diverse backgrounds.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    icon: Smartphone,
    title: 'Cross-platform Access',
    description: 'Seamless experience across desktop, mobile, and tablet devices, perfect for busy student lifestyles.',
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    icon: Lock,
    title: 'FERPA Compliant',
    description: 'Fully compliant with educational privacy regulations, ensuring your academic and health data remains protected.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  }
];

const academicStats = [
  { number: '85%', label: 'Reduction in study anxiety' },
  { number: '70%', label: 'Decrease in academic burnout' },
  { number: '92%', label: 'Improved study-life balance' },
  { number: '78%', label: 'Better academic performance' }
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
            <a href="/features" className="text-blue-600 font-medium">Features</a>
            <a href="/how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">How it Works</a>
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
                href="/features" 
                className="block text-blue-600 font-medium py-2"
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
              <Star className="w-4 h-4 mr-2" />
              Complete Feature Overview
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Built for Academic Success
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Comprehensive mental health support designed specifically for students and researchers navigating the unique challenges of academic life.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
            {academicStats.map((stat, index) => (
              <div key={index} className="text-center bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 text-sm sm:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Core Features for Academic Wellbeing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to maintain mental health while pursuing academic excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 bg-white"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {feature.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Features */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Specialized Academic Support
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Deep-dive into features designed specifically for the academic journey
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {detailedFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-white border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-14 h-14 ${feature.bgColor} rounded-xl flex items-center justify-center`}>
                      <feature.icon className={`w-7 h-7 ${feature.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold text-gray-900">
                        {feature.title}
                      </CardTitle>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Features */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Advanced Technology Stack
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cutting-edge AI and security features that power your academic wellness journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className="text-center bg-white border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-white mb-8">
            <Award className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Transform Your Academic Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Join thousands of students and researchers who are already optimizing their mental health and academic performance with Wellnter
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