import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { HowItWorks } from '@/components/HowItWorks';
import { Footer } from '@/components/Footer';
import { TherapistChat } from '@/components/TherapistChat';
import './App.css';

function App() {
  return (
    <div className="min-h-screen w-full">
      <Hero />
      <Features />
      <HowItWorks />
      <Footer />
      <TherapistChat />
    </div>
  );
}

export default App;