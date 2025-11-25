import React, { useState, useEffect } from 'react';
import { CountdownTimer } from './components/CountdownTimer';
import { Waves } from './components/Waves';
import { Sun } from './components/Sun';
import { DailyFact } from './components/DailyFact';
import { Download } from 'lucide-react';

const GREEK_IMAGES = [
  "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2000&auto=format&fit=crop", // Santorini Sunset
  "https://images.unsplash.com/photo-1569937756447-e36069c24095?q=80&w=2000&auto=format&fit=crop", // Navagio Beach
  "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2000&auto=format&fit=crop", // Blue Caves
  "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?q=80&w=2000&auto=format&fit=crop", // Temple/Warm
  "https://images.unsplash.com/photo-1555993539-1732b625d22e?q=80&w=2000&auto=format&fit=crop"  // Mykonos Street
];

export default function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  useEffect(() => {
    // Image slideshow
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % GREEK_IMAGES.length);
    }, 8000); // Change image every 8 seconds

    // PWA Install Prompt Listener
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (installPrompt) {
      installPrompt.prompt();
      installPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        setInstallPrompt(null);
      });
    }
  };

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-black flex flex-col justify-between">
      {/* Controls Container */}
      <div className="absolute top-6 left-6 z-50 flex items-center gap-3">
        {/* PWA Install Button (Only visible if prompt is available) */}
        {installPrompt && (
          <button
            onClick={handleInstallClick}
            className="p-3 bg-greek-blue/60 hover:bg-greek-blue/80 backdrop-blur-md rounded-full text-white border border-white/30 transition-all duration-300 hover:scale-110 active:scale-95 group shadow-[0_0_15px_rgba(0,87,183,0.4)] flex items-center gap-2"
            title="Install App"
          >
            <Download className="w-6 h-6" />
            <span className="text-xs font-bold uppercase hidden md:inline-block pr-1">Install App</span>
          </button>
        )}
      </div>

      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {GREEK_IMAGES.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[2000ms] ease-in-out`}
            style={{ 
              backgroundImage: `url(${img})`,
              opacity: index === currentImageIndex ? 1 : 0 
            }}
          />
        ))}
        
        {/* Stronger Overlays for Readability */}
        {/* 1. Base dimmer to reduce brightness of white buildings */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        
        {/* 2. Gradient overlays for top and bottom text areas */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/60 z-10" />
      </div>

      {/* Decorative Elements */}
      <Sun />
      
      {/* Main Content - Scrollable container for smaller screens if needed, but mostly fixed */}
      <main className="relative z-20 flex flex-col items-center justify-start pt-12 md:pt-20 px-4 w-full max-w-7xl mx-auto flex-grow overflow-y-auto pb-40 scrollbar-hide">
        
        <header className="text-center mb-8 md:mb-12 animate-float" style={{ animationDuration: '6s' }}>
          <h1 className="text-3xl md:text-6xl font-serif font-bold text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] mb-2">
            Summer is Coming
          </h1>
          <h2 className="text-sm md:text-xl font-sans text-white/90 tracking-[0.2em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-semibold">
            The Greek Islands Await
          </h2>
        </header>

        <CountdownTimer />
        
        <DailyFact />

      </main>

      {/* Foreground Animation */}
      <Waves />
    </div>
  );
}