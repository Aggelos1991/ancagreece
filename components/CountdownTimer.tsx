import React, { useState, useEffect } from 'react';
import { TimeLeft } from '../types';
import { Hourglass } from 'lucide-react';

export const CountdownTimer: React.FC = () => {
  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date();
    const currentYear = now.getFullYear();
    // Summer starts June 1st per user request
    let summerStart = new Date(currentYear, 5, 1); // Month is 0-indexed (5 is June)

    if (now > summerStart) {
      summerStart = new Date(currentYear + 1, 5, 1);
    }

    const difference = summerStart.getTime() - now.getTime();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center mx-1 md:mx-3 my-2 animate-float">
      <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl w-16 h-20 md:w-28 md:h-36 flex items-center justify-center border border-white/60 ring-2 ring-black/10">
        <span className="text-3xl md:text-6xl font-bold text-greek-blue font-serif drop-shadow-sm">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="mt-2 text-xs md:text-lg font-bold text-white uppercase tracking-widest font-sans drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center z-10 relative">
      <div className="flex items-center space-x-2 mb-6 md:mb-10 bg-black/50 px-5 py-2 rounded-full backdrop-blur-md shadow-lg border border-white/30">
        <Hourglass className="w-4 h-4 md:w-5 md:h-5 text-greek-gold" />
        <span className="text-white font-bold tracking-wider text-xs md:text-sm shadow-black drop-shadow-md">UNTIL SUMMER</span>
      </div>
      
      <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4">
        <TimeUnit value={timeLeft.days} label="Days" />
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <TimeUnit value={timeLeft.minutes} label="Mins" />
        <TimeUnit value={timeLeft.seconds} label="Secs" />
      </div>
    </div>
  );
};