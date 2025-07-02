import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { HowItWorks } from '@/components/HowItWorks';
import { Footer } from '@/components/Footer';
import { useEffect } from 'react';
import './App.css';

function App() {
  // Force page to start at top on load
  useEffect(() => {
    // Scroll to top immediately
    window.scrollTo(0, 0);
    
    // Also ensure it stays at top after any initial renders
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Hero />
      <Features />
      <HowItWorks />
      <Footer />
    </div>
  );
}

export default App;