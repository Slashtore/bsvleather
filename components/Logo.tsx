import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'header' | 'page';
  color?: 'white' | 'black';
}

export const Logo: React.FC<LogoProps> = ({ 
  className = "w-10 h-10", 
  variant = 'header',
  color = 'white'
}) => {
  const src = variant === 'header' 
    ? (color === 'white' ? '/image/logo-header-white.png' : '/image/logo-header-black.png')
    : '/image/logo-page.png';
  
  return (
    <img 
      src={src} 
      alt="Логотип BSV Leather" 
      className={`${className} object-contain block`} 
    />
  );
};