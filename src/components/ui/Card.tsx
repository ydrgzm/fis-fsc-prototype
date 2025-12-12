import type { ReactNode } from 'react';
import './Card.css';

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function Card({ children, title, className = '' }: CardProps) {
  return (
    <div className={`slds-card ${className}`}>
      {title && (
        <div className="slds-card-header">
          <h2 className="slds-card-title">{title}</h2>
        </div>
      )}
      <div className="slds-card-body">{children}</div>
    </div>
  );
}
