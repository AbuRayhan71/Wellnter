import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Heart, Brain, CheckCircle, Menu, X, GraduationCap, Microscope, Calendar, Activity, BookOpen, Zap, TrendingUp } from 'lucide-react';
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
            <a href="/features" className="text-gray-600 hover:text-blue-600 transition-colors">All Features</a>
            <a href="/how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">How it Works</a>
            <a href="#partnerships" className="text-gray-600 hover:text-blue-600 transition-colors">Partnerships</a>
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
                href="/features" 
                className="block text-gray-600 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                All Features
              </a>
              <a 
                href="/how-it-works" 
                className="block text-gray-600 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How it Works
              </a>
              <a 
                href="#partnerships" 
                className="block text-gray-600 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Partnerships
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
              Mental Health for Students
              <br />
              <span className="text-blue-600">& Researchers</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-10 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
              AI-powered mental health support designed specifically for students and researchers.
              Navigate academic pressure, thesis stress, and research challenges while maintaining your wellbeing.
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
              Join 500+ students and researchers optimizing their mental health and academic performance with Wellnter
            </p>
          </div>

          {/* Who We Work With Section */}
        <div id="partnerships" className="bg-gray-50 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Who We Work With
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Trusted partnerships across education, healthcare, and technology to deliver comprehensive mental health support
              </p>
            </div>

            {/* Partnership Categories */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-16">
              {/* Universities & Schools */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                    <GraduationCap className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Universities & Schools</h3>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Partnering with educational institutions to integrate mental health support directly into academic environments.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Campus Counseling Integration</div>
                      <div className="text-sm text-gray-600">Seamless referral to on-campus mental health services</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Student Information Systems</div>
                      <div className="text-sm text-gray-600">Integration with university academic tracking systems</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Learning Management Systems</div>
                      <div className="text-sm text-gray-600">Canvas, Blackboard, Moodle platform integration</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Research Institution Support</div>
                      <div className="text-sm text-gray-600">Specialized support for PhD students and researchers</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Healthcare & Clinics */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                    <Heart className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Healthcare & Clinics</h3>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Collaborating with mental health professionals and medical institutions to provide comprehensive care.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Licensed Therapist Network</div>
                      <div className="text-sm text-gray-600">Certified professionals specializing in academic mental health</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Crisis Intervention Centers</div>
                      <div className="text-sm text-gray-600">24/7 emergency mental health support partnerships</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Medical Practice Integration</div>
                      <div className="text-sm text-gray-600">EHR integration with healthcare providers</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Telehealth Platforms</div>
                      <div className="text-sm text-gray-600">Integration with existing telehealth infrastructure</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technology & Software Partners */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 mb-16">
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Technology & Software Partners</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Strategic technology partnerships enabling seamless integration and enhanced functionality across platforms.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="font-semibold text-gray-900 mb-1">Learning Platforms</div>
                  <div className="text-sm text-gray-600">Canvas, Blackboard, Moodle</div>
                </div>
                
                <div className="text-center p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Activity className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="font-semibold text-gray-900 mb-1">Wearable Devices</div>
                  <div className="text-sm text-gray-600">Apple Watch, Fitbit, Garmin</div>
                </div>
                
                <div className="text-center p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="font-semibold text-gray-900 mb-1">Calendar Systems</div>
                  <div className="text-sm text-gray-600">Google, Outlook, Apple</div>
                </div>
                
                <div className="text-center p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Microscope className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="font-semibold text-gray-900 mb-1">Research Tools</div>
                  <div className="text-sm text-gray-600">Mendeley, Zotero, EndNote</div>
                </div>
                
                <div className="text-center p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="font-semibold text-gray-900 mb-1">Security Partners</div>
                  <div className="text-sm text-gray-600">SOC 2, HIPAA, FERPA</div>
                </div>
                
                <div className="text-center p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Brain className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="font-semibold text-gray-900 mb-1">AI Infrastructure</div>
                  <div className="text-sm text-gray-600">OpenAI, Azure, AWS</div>
                </div>
              </div>
            </div>

            {/* Lead Generation & Business Development */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white">
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4">Software Lead Generation & Business Development</h3>
                <p className="text-blue-100 max-w-2xl mx-auto">
                  Driving growth through strategic partnerships and innovative lead generation in the mental health technology space.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-lg mb-4">Lead Generation Strategies</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-sm">University partnership programs</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-sm">Academic conference presence</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-sm">Research collaboration initiatives</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-sm">Student wellness program integration</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-lg mb-4">Business Development Focus</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-sm">Enterprise university licensing</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-sm">Healthcare system partnerships</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-sm">Technology platform integrations</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-sm">International market expansion</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <Button 
                  onClick={() => {
                    const subject = encodeURIComponent('Partnership Inquiry - Wellnter');
                    const body = encodeURIComponent(`Hi,

I'm interested in exploring partnership opportunities with Wellnter.

Organization: 
Partnership Type: [University/Healthcare/Technology/Other]

Please let me know the next steps.

Best regards`);
                    
                    window.location.href = `mailto:contact@wellnter.com?subject=${subject}&body=${body}`;
                  }}
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold"
                >
                  Explore Partnership Opportunities
                </Button>
              </div>
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
    </section>
  );
}