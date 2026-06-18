import React from 'react';
import './Button.css';

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon: Icon, 
  onClick, 
  className = '', 
  ...props 
}) {
  return (
    <button 
      className={`btn btn-${variant} btn-${size} ${className}`} 
      onClick={onClick}
      {...props}
    >
      {Icon && <Icon className="btn-icon" size={18} />}
      {children}
    </button>
  );
}
