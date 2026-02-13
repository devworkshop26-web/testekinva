import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'urgent';
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 text-base font-bold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide";
  
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 hover:scale-105 hover:shadow-xl active:scale-95",
    secondary: "bg-accent text-white hover:bg-accent-dark hover:scale-105 hover:shadow-xl hover:shadow-accent/20 active:scale-95",
    outline: "border-2 border-slate-200 text-slate-700 hover:border-slate-900 hover:text-slate-900 bg-transparent",
    ghost: "text-slate-600 hover:text-slate-900 hover:bg-slate-50",
    urgent: "bg-brand-coral text-white hover:bg-red-500 hover:scale-105 hover:shadow-xl hover:shadow-brand-coral/30 active:scale-95"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};