import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { HowItWorksPage } from '@/components/HowItWorksPage';
import { FeaturesPage } from '@/components/FeaturesPage';
import { AboutUs } from '@/components/AboutUs';
import { Footer } from '@/components/Footer';
import { TherapistChat } from '@/components/TherapistChat';
import { GraduationCap, BookOpen, Zap, Users, CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Activity, AlertTriangle, Users, Shield, Brain } from 'lucide-react';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Force page to start at top on load
  useEffect(() => {
    // Scroll to top immediately
    window.scrollTo(0, 0);
    
    // Also ensure it stays at top after any initial renders
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);

    // Check URL path to determine which page to show
    const path = window.location.pathname;
    if (path === '/features') {
      setCurrentPage('features');
    } else if (path === '/how-it-works') {
      setCurrentPage('how-it-works');
    } else if (path === '/about') {
      setCurrentPage('about');
    } else {
      setCurrentPage('home');
    }

    // Listen for URL changes
    const handlePopState = () => {
      const newPath = window.location.pathname;
      if (newPath === '/features') {
        setCurrentPage('features');
      } else if (newPath === '/how-it-works') {
        setCurrentPage('how-it-works');
      } else if (newPath === '/about') {
        setCurrentPage('about');
      } else {
        setCurrentPage('home');
      }
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Handle navigation
  useEffect(() => {
    const handleNavigation = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.href) {
        const url = new URL(target.href);
        if (url.origin === window.location.origin) {
          e.preventDefault();
          const path = url.pathname;
          window.history.pushState({}, '', path);
          
          if (path === '/features') {
            setCurrentPage('features');
          } else if (path === '/how-it-works') {
            setCurrentPage('how-it-works');
          } else if (path === '/about') {
            setCurrentPage('about');
          } else {
            setCurrentPage('home');
          }
          window.scrollTo(0, 0);
        }
      }
    };

    document.addEventListener('click', handleNavigation);
    return () => document.removeEventListener('click', handleNavigation);
  }, []);

  if (currentPage === 'features') {
    return (
      <div className="min-h-screen w-full overflow-x-hidden">
        <FeaturesPage />
      </div>
    );
  }

  if (currentPage === 'how-it-works') {
    return (
      <div className="min-h-screen w-full overflow-x-hidden">
        <HowItWorksPage />
      </div>
    );
  }

  if (currentPage === 'about') {
    return (
      <div className="min-h-screen w-full overflow-x-hidden">
        <AboutUs />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Hero />
      
      {/* AI Therapist Section */}
      <section id="ai-therapist" className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-6">
              Try Our AI Therapist
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Talk to Our AI Mental Health Companion
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 sm:mb-10">
              Experience personalized mental health support designed specifically for students and researchers. 
              Our AI understands academic stress, thesis anxiety, and research pressure.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                <h3 className="text-white font-semibold text-lg">AI Mental Health Companion</h3>
                <p className="text-blue-100 text-sm">Specialized in academic mental health • Available 24/7 • 10+ Languages</p>
              </div>
              <TherapistChat />
            </div>
          </div>
          
          <div className="text-center mt-8 sm:mt-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Clinical-Grade Assessment</h4>
                <p className="text-sm text-gray-600">Advanced triage system with ATS scoring for proper care level determination</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Privacy Protected</h4>
                <p className="text-sm text-gray-600">End-to-end encryption with HIPAA and FERPA compliance standards</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Crisis Detection</h4>
                <p className="text-sm text-gray-600">Automatic crisis intervention with immediate therapist connection</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Features />
      
      <Footer />
    </div>
  );
}

export default App;