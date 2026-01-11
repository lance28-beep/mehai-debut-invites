import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Update progress smoothly
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 160);

    // Simulate loading time
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 500);
    }, 8000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-opacity duration-500 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundColor: '#490505'
        }}
      />

      {/* Ornate pattern background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        {/* Base pattern - diagonal lines forming diamonds */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent, transparent 70px, rgba(255,225,190,0.1) 70px, rgba(255,225,190,0.1) 71px),
              repeating-linear-gradient(-45deg, transparent, transparent 70px, rgba(255,225,190,0.1) 70px, rgba(255,225,190,0.1) 71px),
              repeating-linear-gradient(135deg, transparent, transparent 35px, rgba(255,225,190,0.08) 35px, rgba(255,225,190,0.08) 36px),
              repeating-linear-gradient(225deg, transparent, transparent 35px, rgba(255,225,190,0.08) 35px, rgba(255,225,190,0.08) 36px)
            `,
            backgroundSize: '70px 70px, 70px 70px, 35px 35px, 35px 35px',
          }}
        />
        
        {/* Decorative scroll motifs - using SVG pattern */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>
          <defs>
            <pattern id="scrollPattern" x="0" y="0" width="140" height="140" patternUnits="userSpaceOnUse">
              {/* Scroll motifs at intersections */}
              <g fill="none" stroke="#FFE1BE" strokeWidth="0.5">
                {/* Top scroll */}
                <path d="M 70 0 Q 65 15 70 30 Q 75 15 70 0" />
                {/* Bottom scroll */}
                <path d="M 70 140 Q 65 125 70 110 Q 75 125 70 140" />
                {/* Left scroll */}
                <path d="M 0 70 Q 15 65 30 70 Q 15 75 0 70" />
                {/* Right scroll */}
                <path d="M 140 70 Q 125 65 110 70 Q 125 75 140 70" />
                {/* Center decorative element */}
                <path d="M 70 30 Q 60 50 70 70 Q 80 50 70 30" />
                <path d="M 70 110 Q 60 90 70 70 Q 80 90 70 110" />
                <path d="M 30 70 Q 50 60 70 70 Q 50 80 30 70" />
                <path d="M 110 70 Q 90 60 70 70 Q 90 80 110 70" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#scrollPattern)" />
        </svg>

        {/* Subtle overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2E041A]/80 via-transparent to-[#2E041A]/80" />
      </div>

      <div className="relative flex flex-col items-center justify-center px-4 sm:px-8">
        {/* Monogram Logo */}
        <div className="relative flex items-center justify-center mb-8 sm:mb-12">
          <div className="relative w-28 sm:w-40 h-28 sm:h-40">
            <Image
              src="/monogram/logo.png"
              alt="Debut Monogram"
              fill
              className="object-contain"
              priority
              style={{ filter: 'brightness(0) saturate(100%) invert(84%) sepia(28%) saturate(557%) hue-rotate(342deg) brightness(100%) contrast(88%)' }}
            />
          </div>
        </div>

        {/* Content section */}
        <div className="text-center max-w-sm sm:max-w-2xl px-4 sm:px-6">
          {/* Message */}
          <p
            className="text-xs sm:text-sm leading-relaxed sm:leading-loose tracking-wide mb-4 sm:mb-6 italic"
            style={{ fontFamily: '"Cinzel", serif', fontWeight: 300, color: '#FFE1BE' }}
          >
            A beautiful chapter unfolds as laughter, dreams, and memories come together.
          </p>

          {/* Main title */}
          <p
            className="text-base sm:text-xl tracking-[0.12em] sm:tracking-[0.15em] mb-4 sm:mb-6"
            style={{ fontFamily: '"Cinzel", serif', fontWeight: 400, color: '#FFE1BE' }}
          >
            Kaith is turning eighteen!
          </p>

          {/* Subtitle */}
          <p
            className="text-xs sm:text-sm leading-relaxed sm:leading-loose tracking-wide mb-4 sm:mb-6"
            style={{ fontFamily: '"Cinzel", serif', fontWeight: 300, color: '#FFE1BE' }}
          >
            Join us as we celebrate her debut and the beginning of a bright new journey.
          </p>

          {/* Progress bar */}
          <div className="relative w-48 sm:w-64 h-0.5 mx-auto rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255, 225, 190, 0.2)' }}>
            <div 
              className="absolute inset-y-0 left-0 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%`, backgroundColor: '#FFE1BE' }}
            />
          </div>
          
          {/* Progress percentage */}
          <p
            className="text-[9px] sm:text-[10px] tracking-[0.2em] mt-2 sm:mt-3"
            style={{ fontFamily: '"Cinzel", serif', fontWeight: 300, color: 'rgba(255, 225, 190, 0.7)' }}
          >
            {progress}%
          </p>
        </div>
      </div>
    </div>
  );
};