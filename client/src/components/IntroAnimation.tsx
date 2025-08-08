import React, { useState, useEffect } from 'react';
import { Utensils, Flame, Star, Sparkles } from 'lucide-react';

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const phases = [
      { delay: 0, phase: 1 },      // Logo appears
      { delay: 800, phase: 2 },    // Text appears
      { delay: 1600, phase: 3 },   // Sparkles animation
      { delay: 2800, phase: 4 },   // Fade out and complete
    ];

    phases.forEach(({ delay, phase }) => {
      setTimeout(() => setAnimationPhase(phase), delay);
    });

    // Complete the intro after all animations
    setTimeout(() => {
      onComplete();
    }, 3200);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 gradient-bg z-50 flex items-center justify-center overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Main logo container */}
      <div className="text-center relative">
        {/* Logo Circle with growing effect */}
        <div 
          className={`relative mx-auto mb-6 transition-all duration-1000 ease-out ${
            animationPhase >= 1 
              ? 'w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 opacity-100 scale-100' 
              : 'w-16 h-16 opacity-0 scale-0'
          }`}
        >
          {/* Pulsing rings */}
          <div className={`absolute inset-0 rounded-full bg-orange-500/20 ${animationPhase >= 1 ? 'animate-ping' : ''}`} />
          <div className={`absolute inset-2 rounded-full bg-orange-400/30 ${animationPhase >= 1 ? 'animate-pulse' : ''}`} style={{ animationDelay: '0.5s' }} />
          
          {/* Main logo circle */}
          <div className="relative w-full h-full bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 rounded-full shadow-2xl flex items-center justify-center overflow-hidden">
            {/* Inner glow */}
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-orange-300/50 to-transparent" />
            
            {/* Logo icon */}
            <Utensils 
              className={`text-white transition-all duration-700 ease-out relative z-10 ${
                animationPhase >= 1 
                  ? 'text-4xl sm:text-5xl lg:text-6xl opacity-100 rotate-0' 
                  : 'text-2xl opacity-0 rotate-180'
              }`}
              size={window.innerWidth < 640 ? 32 : window.innerWidth < 1024 ? 40 : 48}
            />
            
            {/* Rotating flame accents */}
            <Flame 
              className={`absolute top-2 right-2 text-yellow-300 transition-all duration-1000 ${
                animationPhase >= 1 ? 'opacity-100 animate-bounce' : 'opacity-0'
              }`}
              size={16}
            />
            <Flame 
              className={`absolute bottom-2 left-2 text-yellow-300 transition-all duration-1000 ${
                animationPhase >= 1 ? 'opacity-100 animate-bounce' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.5s' }}
              size={16}
            />
          </div>
        </div>

        {/* Hotel name with typewriter effect */}
        <div className={`transition-all duration-800 ease-out ${
          animationPhase >= 2 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
        }`}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-2 sm:mb-4">
            <span className="inline-block">Hotel</span>
            <span className="inline-block ml-2 sm:ml-4 bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
              Lucky
            </span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-white/90 font-medium">
            Restaurant Management System
          </p>
        </div>

        {/* Sparkles animation */}
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          animationPhase >= 3 ? 'opacity-100' : 'opacity-0'
        }`}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s',
              }}
            >
              {i % 2 === 0 ? (
                <Star className="text-yellow-300" size={12} />
              ) : (
                <Sparkles className="text-white" size={10} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Loading indicator */}
      <div className={`absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
        animationPhase >= 2 ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>

      {/* Fade out overlay */}
      <div className={`absolute inset-0 bg-gradient-to-b from-orange-500 to-red-600 transition-opacity duration-700 ${
        animationPhase >= 4 ? 'opacity-100' : 'opacity-0'
      }`} />
    </div>
  );
};