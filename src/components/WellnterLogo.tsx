import React from 'react';

interface WellnterLogoProps {
  className?: string;
  size?: number;
}

export function WellnterLogo({ className = "", size = 32 }: WellnterLogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="wellnterGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      
      {/* Left curve of W */}
      <path
        d="M15 20 C15 20, 25 80, 35 80 C45 80, 50 40, 50 40"
        stroke="url(#wellnterGradient)"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Right curve of W */}
      <path
        d="M50 40 C50 40, 55 80, 65 80 C75 80, 85 20, 85 20"
        stroke="url(#wellnterGradient)"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Filled version for better visibility */}
      <path
        d="M15 20 Q20 50 25 65 Q30 80 35 80 Q40 80 45 65 Q50 50 50 40 Q55 50 60 65 Q65 80 65 80 Q70 80 75 65 Q80 50 85 20 L85 25 Q80 55 75 70 Q70 85 65 85 Q60 85 55 70 Q52 60 50 50 Q48 60 45 70 Q40 85 35 85 Q30 85 25 70 Q20 55 15 25 Z"
        fill="url(#wellnterGradient)"
        opacity="0.8"
      />
    </svg>
  );
}