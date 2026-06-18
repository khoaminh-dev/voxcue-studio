import React from 'react';
import './Card.css';

export function Card({ children, className = '', padded = true, ...props }) {
  return (
    <div className={`card ${padded ? 'card-padded' : ''} ${className}`} {...props}>
      {children}
    </div>
  );
}
