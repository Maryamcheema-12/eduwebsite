import React from 'react';

const SecondaryButton = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`
        px-8 py-5 md:py-6
        bg-transparent border-2 border-slate-950 hover:bg-slate-950
        text-slate-950 hover:text-white font-black text-sm md:text-base
        uppercase tracking-widest
        rounded-lg
        shadow-md hover:shadow-lg
        transition-all duration-300 ease-in-out
        hover:scale-105
        active:scale-95
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
