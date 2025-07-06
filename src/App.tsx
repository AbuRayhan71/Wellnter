import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { HowItWorksPage } from '@/components/HowItWorksPage';
import { FeaturesPage } from '@/components/FeaturesPage';
import { AboutUs } from '@/components/AboutUs';
import { Footer } from '@/components/Footer';
import { useEffect, useState } from 'react';
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
      <Features />
      <Footer />
    </div>
  );
}

export default App;