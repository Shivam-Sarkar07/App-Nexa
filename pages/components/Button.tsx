import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '',
  icon,
  ...props 
}) => {
  const baseStyles = "flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all active:scale-95 tracking-wide";
  
  const variants = {
    primary: "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-lg shadow-purple-900/40 border border-white/10",
    secondary: "bg-white text-slate-900 hover:bg-gray-100 shadow-lg",
    outline: "border border-white/20 text-white hover:bg-white/5 backdrop-blur-sm",
    ghost: "text-slate-400 hover:text-white hover:bg-white/5"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
};