import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Brain, 
  Target, 
  Users, 
  Lightbulb, 
  Globe, 
  Award,
  BookOpen,
  GraduationCap,
  Microscope,
  Code,
  Stethoscope,
  Linkedin,
  Mail,
  ArrowRight,
  Star,
  Zap,
  Shield,
  TrendingUp,
  ArrowLeft,
  Menu,
  X,
  AlertTriangle
} from 'lucide-react';
import { useState } from 'react';

const founders = [
  {
    name: 'Md Abu Rayhan',
    role: 'Founder',
    background: 'Computer Science, AI/ML Specialist & Entrepreneur',
    image: '/rayray.jpeg',
    bio: 'Rayhan experienced severe research anxiety and academic burnout during his computer science studies, leading to multiple panic attacks during thesis preparation. As an international student, he faced additional challenges accessing culturally-appropriate mental health support. His personal struggle with academic mental health inspired him to build AI technology that truly understands the unique pressures of student life and research environments.',
    expertise: ['AI/ML Engineering', 'Natural Language Processing', 'Software Architecture', 'Academic Technology', 'Entrepreneurship'],
    linkedin: 'https://www.linkedin.com/in/md-abu-rayhan-854b3b1a9/',
    achievements: [
      'Built AI systems serving 100K+ users',
      'Expert in conversational AI and NLP',
      'International student advocate',
      'Founded multiple tech startups'
    ]
  },
  {
    name: 'Anastasia Thiessen',
    role: 'Co-Founder',
    background: 'Business Strategy & Operations Specialist',
    image: '/WhatsApp Image 2025-07-09 at 13.18.22.jpeg',
    bio: 'Anastasia brings extensive experience in business strategy and operations to Wellnter. Her deep understanding of scaling technology platforms and building sustainable business models has been instrumental in shaping Wellnter\'s growth strategy. She shares the vision of making mental health support accessible to students and researchers worldwide.',
    expertise: ['Business Strategy', 'Operations Management', 'Product Development', 'Market Expansion'],
    linkedin: 'https://www.linkedin.com/in/anastasia-thiessen-977b24216/',
    achievements: [
      'Led operations for multiple tech startups',
      'Expert in business development and partnerships',
      'Passionate advocate for student mental health'
    ]
  },
  {
    name: 'Aaron Lauterbach',
    role: 'Advisor',
    background: 'Psychology & Clinical Mental Health Specialist',
    image: '/aaron.jpeg',
    bio: 'Aaron brings deep expertise in psychology and clinical mental health to Wellnter. His understanding of therapeutic approaches, mental health assessment, and evidence-based interventions ensures that our AI platform delivers clinically sound support. Aaron\'s passion for making mental health care more accessible drives the clinical foundation of our technology.',
    expertise: ['Clinical Psychology', 'Mental Health Assessment', 'Therapeutic Interventions', 'Human Physiology', 'Crisis Intervention'],
    linkedin: 'https://www.linkedin.com/in/aaron-lauterbach-607474178/',
    achievements: [
      'Expert in clinical psychology and mental health',
      'Specialized in academic stress and student mental health',
      'Research experience in therapeutic interventions',
      'Advocate for accessible mental health care',
      'Expert in physiological stress responses'
    ]
  }
];

const milestones = [
  {
    year: '2024',
    title: 'The Breaking Point',
    description: 'Our founders experienced severe academic burnout during their PhD and medical studies, realizing existing mental health resources weren\'t designed for academic pressures.',
    icon: Heart,
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  },
  {
    year: 'Early 2025',
    title: 'Research & Development',
    description: 'Conducted extensive research with 500+ students and researchers to understand the unique mental health challenges in academic environments.',
    icon: Microscope,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    year: 'June 2025',
    title: 'AI Breakthrough',
    description: 'Developed the first AI therapy system specifically trained on academic mental health data, with clinical-grade assessment capabilities and joined PFC.',
    icon: Brain,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    year: 'July 2025',
    title: 'Platform Launch',
    description: 'Successfully launched Wellnter to universities worldwide, with partnerships across North America, Europe, and Asia.',
    icon: Globe,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  }
];

const values = [
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your mental health data is sacred. We use enterprise-grade encryption and never share personal information.',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50'
  },
  {
    icon: Heart,
    title: 'Empathy-Driven',
    description: 'Every feature is designed with deep understanding of academic struggles, built by people who\'ve been there.',
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  },
  {
    icon: Target,
    title: 'Evidence-Based',
    description: 'All our interventions are grounded in clinical research and proven therapeutic approaches.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    icon: Globe,
    title: 'Globally Accessible',
    description: 'Mental health support shouldn\'t depend on location or language. We\'re building for everyone, everywhere.',
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  }
];

const stats = [
  { number: '87%', label: 'PhD Students Experience Anxiety', icon: TrendingUp },
  { number: '41%', label: 'Consider Dropping Out Due to Stress', icon: AlertTriangle },
  { number: '1 in 4', label: 'Australian Students Have Mental Health Issues', icon: Heart },
  { number: '24/7', label: 'AI Support Available', icon: Brain }
];

export function AboutUs() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleContactFounder = (founderName: string, linkedin: string) => {
    window.open(linkedin, '_blank');
  };

  const handleJoinMission = () => {
    const subject = encodeURIComponent('Join the Mission - Wellnter');
    const body = encodeURIComponent(`Hi Wellnter Team,

I'm inspired by your mission to transform academic mental health and would like to explore how I can contribute.

I'm interested in:
- Partnership opportunities
- Investment discussions
- Joining the team
- Research collaboration
- University partnerships

Please let me know how we can connect.

Best regards`);
    
    window.location.href = `mailto:contact@wellnter.com?subject=${subject}&body=${body}`;
  };

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
            <a href="/therapist" className="text-gray-600 hover:text-blue-600 transition-colors">Therapist Portal</a>
            <a href="/features" className="text-gray-600 hover:text-blue-600 transition-colors">What We Do</a>
            <a href="/how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">How it Works</a>
            <a href="/about" className="text-blue-600 font-medium">About Us</a>
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
                href="/therapist" 
                className="block text-gray-600 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Therapist Portal
              </a>
              <a 
                href="/features" 
                className="block text-gray-600 hover:text-blue-600 transition-colors py-2"
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
                className="block text-blue-600 font-medium py-2"
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
              <Heart className="w-4 h-4 mr-2" />
              Our Story
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Built by Students,
              <br />
              <span className="text-blue-600">For Students</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Wellnter was born from personal struggle. Our founder experienced severe academic burnout 
              and panic attacks during his studies, realizing that existing mental health resources weren't 
              designed for the unique pressures of academic life. We're here to change that.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center bg-white border border-gray-100 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              The Crisis That Started It All
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every great solution starts with a problem that hits close to home. Here's ours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">The Academic Mental Health Crisis</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <TrendingUp className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">87% of PhD students experience anxiety</h4>
                    <p className="text-gray-600">Research shows that graduate students face mental health challenges at rates far exceeding the general population.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Heart className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">41% consider dropping out due to stress</h4>
                    <p className="text-gray-600">Academic pressure, financial stress, and isolation create a perfect storm for mental health crises.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Limited access to specialized support</h4>
                    <p className="text-gray-600">Traditional therapy doesn't address the unique challenges of thesis anxiety, imposter syndrome, and research pressure.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Our Realization</h4>
                <p className="text-gray-700 leading-relaxed">
                  "We realized that mental health support needed to be reimagined for the academic world. 
                  Traditional therapy approaches weren't addressing the specific stressors we faced as students 
                  and researchers. We needed something built by academics, for academics."
                </p>
                <div className="mt-6 text-sm text-gray-600">
                  - Md Abu Rayhan, Founder
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate individuals who turned personal struggles into a mission to help millions of students worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {founders.map((founder, index) => (
              <Card key={index} className="bg-white border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <img 
                      src={founder.image} 
                      alt={founder.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-blue-100"
                    />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{founder.name}</h3>
                    <p className="text-blue-600 font-medium mb-2">{founder.role}</p>
                    <p className="text-sm text-gray-600">{founder.background}</p>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed mb-6 text-sm">
                    {founder.bio}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3 text-sm">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {founder.expertise.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3 text-sm">Key Achievements</h4>
                    <ul className="space-y-2">
                      {founder.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start space-x-2 text-sm text-gray-600">
                          <Star className="w-3 h-3 text-yellow-500 mt-1 flex-shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    onClick={() => handleContactFounder(founder.name, founder.linkedin)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                    Connect on LinkedIn
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From personal crisis to global solution - the milestones that shaped Wellnter.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200 hidden lg:block"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}>
                    <Card className="bg-white border border-gray-100 hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <div className={`w-12 h-12 ${milestone.bgColor} rounded-xl flex items-center justify-center mr-4`}>
                            <milestone.icon className={`w-6 h-6 ${milestone.color}`} />
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-gray-900">{milestone.year}</div>
                            <div className="text-lg font-semibold text-gray-800">{milestone.title}</div>
                          </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="hidden lg:flex w-2/12 justify-center">
                    <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  
                  <div className="hidden lg:block w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at Wellnter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-white border border-gray-100 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 ${value.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <value.icon className={`w-6 h-6 ${value.color}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Our Vision for the Future
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              We're building a world where every student and researcher has access to mental health support 
              that truly understands their unique challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Our Mission</h3>
              </div>
              <p className="text-blue-100 leading-relaxed text-lg">
                To provide every student and researcher worldwide with AI-powered mental health support 
                that understands the unique pressures of academic life, helping them thrive rather than 
                just survive their educational journey.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Our Vision</h3>
              </div>
              <p className="text-blue-100 leading-relaxed text-lg">
                A world where academic burnout is preventable, where mental health support is as 
                accessible as academic resources, and where every brilliant mind can reach its full 
                potential without sacrificing wellbeing.
              </p>
            </div>
          </div>

          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold text-white mb-6">Join Our Mission</h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Whether you're a student, researcher, university administrator, or investor, 
              there are many ways to be part of the mental health revolution in academia.
            </p>
            <Button 
              onClick={handleJoinMission}
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-5 text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Join the Mission
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Let's Connect
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Have questions about our story, want to partner with us, or interested in joining our team? 
            We'd love to hear from you.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button 
              onClick={() => window.location.href = 'mailto:contact@wellnter.com'}
              size="lg"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Mail className="mr-3 w-6 h-6" />
              Get in Touch
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.open('https://www.linkedin.com/company/107561458/', '_blank')}
              className="w-full sm:w-auto px-10 py-5 text-xl font-semibold rounded-xl border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
            >
              <Linkedin className="mr-3 w-6 h-6" />
              Follow Our Journey
            </Button>
          </div>
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