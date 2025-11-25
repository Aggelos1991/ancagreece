import React, { useState, useEffect } from 'react';
import { fetchGreekSummerFact } from '../services/openaiService';
import { Sparkles, RefreshCw } from 'lucide-react';
import { FactState } from '../types';

export const DailyFact: React.FC = () => {
  const [fact, setFact] = useState<FactState>({
    text: '',
    loading: true,
    error: null,
  });

  const loadFact = async () => {
    setFact((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const text = await fetchGreekSummerFact();
      setFact({ text, loading: false, error: null });
    } catch (err) {
      setFact({ text: '', loading: false, error: 'Failed to load fact.' });
    }
  };

  useEffect(() => {
    loadFact();
  }, []);

  return (
    <div className="z-10 relative mt-8 md:mt-12 max-w-md md:max-w-xl w-full">
      <div className="bg-white/95 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/60 relative overflow-hidden group mx-2">
        
        {/* Decorative Greek Meander Pattern Top */}
        <div className="absolute top-0 left-0 w-full h-1 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Meander_%28art%29.svg/1200px-Meander_%28art%29.svg.png')] bg-contain opacity-30"></div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-greek-blue">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-serif font-bold text-lg">Spirit of the Aegean</h3>
          </div>
          <button 
            onClick={loadFact}
            disabled={fact.loading}
            className="p-2 rounded-full hover:bg-blue-50 transition-colors disabled:opacity-50 active:scale-90 transform"
            title="Get another fact"
          >
            <RefreshCw className={`w-4 h-4 text-greek-blue ${fact.loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <div className="min-h-[80px] flex items-center justify-center">
          {fact.loading ? (
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-greek-blue rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-2 h-2 bg-greek-blue rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-greek-blue rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          ) : (
            <p className="text-gray-900 text-center font-sans leading-relaxed font-medium">
              "{fact.text}"
            </p>
          )}
        </div>
        
         {/* Decorative Greek Meander Pattern Bottom */}
         <div className="absolute bottom-0 left-0 w-full h-1 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Meander_%28art%29.svg/1200px-Meander_%28art%29.svg.png')] bg-contain opacity-30"></div>
      </div>
    </div>
  );
};