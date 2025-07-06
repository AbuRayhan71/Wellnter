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
  Award,
  Headphones,
  Video,
  Phone,
  Mail,
  Download,
  Upload,
  Settings,
  Bell,
  Search,
  Filter,
  Bookmark,
  Share2,
  Eye,
  PieChart,
  LineChart,
  Timer,
  Coffee,
  Moon,
  Sun,
  Wifi,
  Database,
  Cloud,
  Cpu
} from 'lucide-react';
import { useState } from 'react';

const coreFeatures = [
  {
    icon: Brain,
    title: 'AI-Powered Mental Health Assessment',
    description: 'Advanced clinical algorithms provide real-time mental health evaluations specifically calibrated for academic stress patterns.',
    features: [
      'Real-time mood tracking and analysis',
      'Academic stress pattern recognition',
      'Personalized risk assessment scoring',
      'Predictive burnout detection',
      'Clinical-grade triage system (ATS 1-5)',
      'Multi-language psychological evaluation'
    ],
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    category: 'Core AI'
  },
  {
    icon: MessageSquare,
    title: 'Intelligent Therapy Chatbot',
    description: 'Conversational AI therapist trained specifically on academic mental health challenges, available 24/7 in 10+ languages.',
    features: [
      '24/7 conversational therapy support',
      'Academic-specific therapy protocols',
      'Crisis intervention capabilities',
      'Voice input and transcription',
      'Multi-language therapy sessions',
      'Contextual follow-up questions'
    ],
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    category: 'AI Therapy'
  },
  {
    icon: BarChart3,
    title: 'Academic Performance Analytics',
    description: 'Comprehensive dashboard tracking the correlation between mental health metrics and academic performance indicators.',
    features: [
      'Study pattern analysis and optimization',
      'Mental health vs performance correlation',
      'Productivity trend visualization',
      'Focus and attention metrics',
      'Sleep quality impact analysis',
      'Stress level academic impact reports'
    ],
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    category: 'Analytics'
  },
  {
    icon: AlertTriangle,
    title: 'Crisis Detection & Intervention',
    description: 'Advanced AI monitoring system that detects mental health crises and automatically connects students with emergency support.',
    features: [
      'Suicidal ideation detection',
      'Automatic crisis escalation',
      'Emergency therapist connection',
      'Campus counseling integration',
      'Family/guardian notification system',
      'Crisis resource directory'
    ],
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    category: 'Safety'
  }
];

const academicSpecificFeatures = [
  {
    icon: GraduationCap,
    title: 'Exam Stress Management',
    description: 'Specialized tools and techniques for managing exam anxiety, test preparation stress, and performance pressure.',
    tools: [
      'Pre-exam anxiety assessment',
      'Breathing and relaxation exercises',
      'Study schedule optimization',
      'Performance anxiety coaching',
      'Post-exam emotional processing',
      'Grade-related stress counseling'
    ],
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    icon: FileText,
    title: 'Thesis & Research Support',
    description: 'Comprehensive mental health support for long-term research projects, thesis writing, and dissertation completion.',
    tools: [
      'Research milestone tracking',
      'Writing block intervention',
      'Advisor relationship guidance',
      'Imposter syndrome support',
      'Publication anxiety management',
      'Research setback recovery'
    ],
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    icon: Users,
    title: 'Academic Social Support',
    description: 'Peer support networks and social features designed specifically for academic communities and research groups.',
    tools: [
      'Anonymous peer support groups',
      'Study buddy matching system',
      'Research collaboration networks',
      'Academic mentorship programs',
      'Department-specific communities',
      'International student support'
    ],
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    icon: Calendar,
    title: 'Academic Calendar Integration',
    description: 'Smart calendar integration that anticipates stressful academic periods and provides proactive mental health support.',
    tools: [
      'Exam period stress preparation',
      'Assignment deadline tracking',
      'Conference presentation support',
      'Semester transition guidance',
      'Holiday break adjustment help',
      'Academic year planning'
    ],
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  }
];

const professionalFeatures = [
  {
    icon: Video,
    title: 'Licensed Therapist Video Sessions',
    description: 'One-on-one video sessions with licensed therapists who specialize in academic mental health.',
    pricing: 'From $75/session',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    icon: Phone,
    title: 'Crisis Hotline Access',
    description: '24/7 access to trained crisis counselors for immediate mental health emergencies.',
    pricing: 'Included in all plans',
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  },
  {
    icon: Headphones,
    title: 'Guided Meditation & Mindfulness',
    description: 'Curated library of academic-focused meditation and mindfulness exercises.',
    pricing: 'Premium feature',
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    icon: BookOpen,
    title: 'Academic Wellness Resources',
    description: 'Comprehensive library of articles, videos, and tools for academic mental health.',
    pricing: 'Free with account',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  }
];

const technicalFeatures = [
  {
    icon: Shield,
    title: 'FERPA & HIPAA Compliance',
    description: 'Full compliance with educational and healthcare privacy regulations.',
    specs: ['End-to-end encryption', 'SOC 2 Type II certified', 'GDPR compliant', 'Regular security audits'],
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50'
  },
  {
    icon: Globe,
    title: 'Multi-Language Support',
    description: 'Available in 10+ languages with culturally-adapted therapy approaches.',
    specs: ['English, Spanish, French, German', 'Mandarin, Hindi, Arabic, Bengali', 'Portuguese, Russian, Japanese', 'Cultural adaptation protocols'],
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    icon: Smartphone,
    title: 'Cross-Platform Accessibility',
    description: 'Seamless experience across all devices with offline capability.',
    specs: ['iOS and Android apps', 'Web platform', 'Offline mode', 'Sync across devices'],
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    icon: Database,
    title: 'Advanced AI Architecture',
    description: 'State-of-the-art machine learning models trained on academic mental health data.',
    specs: ['GPT-4 powered conversations', 'Clinical decision support', 'Predictive analytics', 'Continuous learning'],
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  }
];

const integrationFeatures = [
  {
    name: 'Learning Management Systems',
    description: 'Direct integration with Canvas, Blackboard, Moodle, and other LMS platforms',
    icon: BookOpen,
    status: 'Available'
  },
  {
    name: 'Campus Counseling Centers',
    description: 'Seamless referral system to on-campus mental health services',
    icon: Users,
    status: 'Available'
  },
  {
    name: 'Student Information Systems',
    description: 'Integration with university student records and academic tracking',
    icon: Database,
    status: 'Coming Soon'
  },
  {
    name: 'Wearable Devices',
    description: 'Apple Watch, Fitbit integration for stress and sleep monitoring',
    icon: Activity,
    status: 'Beta'
  },
  {
    name: 'Calendar Applications',
    description: 'Google Calendar, Outlook integration for academic schedule tracking',
    icon: Calendar,
    status: 'Available'
  },
  {
    name: 'Research Tools',
    description: 'Mendeley, Zotero, EndNote integration for research stress tracking',
    icon: Microscope,
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
            <a href="/features" className="text-blue-600 font-medium">Features</a>
            <a href="/how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">How it Works</a>
            <a href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">About Us</a>
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
                href="/about" 
                className="block text-gray-600 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
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
              Complete Feature Breakdown
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Every Feature Built for
              <br />
              <span className="text-blue-600">Academic Success</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Comprehensive mental health technology designed specifically for students and researchers. 
              Explore every tool, feature, and capability that makes Wellnter the leading academic wellness platform.
            </p>
          </div>
        </div>
      </section>

      {/* Emergency Contact Section */}
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

      {/* Core AI Features */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Core AI-Powered Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced artificial intelligence capabilities that power your mental health journey
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {coreFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 bg-white"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 ${feature.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className={`w-7 h-7 ${feature.color}`} />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {feature.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </CardTitle>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {feature.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {feature.features.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Academic-Specific Features */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Academic-Specific Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized features designed for the unique challenges of academic life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {academicSpecificFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-white border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center`}>
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      {feature.title}
                    </CardTitle>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {feature.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-2">
                    {feature.tools.map((tool, toolIndex) => (
                      <div key={toolIndex} className="flex items-center space-x-3 py-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">{tool}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Services */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Professional Mental Health Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access to licensed professionals and premium wellness resources
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {professionalFeatures.map((feature, index) => (
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
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {feature.pricing}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Features */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Technical Specifications
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enterprise-grade technology and security features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {technicalFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-white border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center`}>
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      {feature.title}
                    </CardTitle>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {feature.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {feature.specs.map((spec, specIndex) => (
                      <div key={specIndex} className="flex items-center space-x-2 py-1">
                        <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                        <span className="text-xs text-gray-700">{spec}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Features */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Platform Integrations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Seamless integration with your existing academic and wellness tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrationFeatures.map((integration, index) => (
              <Card 
                key={index} 
                className="bg-white border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <integration.icon className="w-8 h-8 text-blue-600" />
                    <Badge 
                      variant={integration.status === 'Available' ? 'default' : integration.status === 'Beta' ? 'secondary' : 'outline'}
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

      {/* Contact Information Section */}
      <section className="py-16 sm:py-24 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Get Support & Information
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multiple ways to connect with our team and access mental health resources
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white border border-gray-100 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  General Inquiries
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Questions about features, pricing, or getting started
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
                  Academic Partnerships
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  University and research institution collaborations
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
              Experience Every Feature
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Get early access to the most comprehensive academic mental health platform ever built
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