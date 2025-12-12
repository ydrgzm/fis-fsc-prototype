import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'brand' | 'neutral' | 'outline' | 'destructive';
  size?: 'small' | 'medium' | 'large';
  children: ReactNode;
}

export function Button({
  variant = 'neutral',
  size = 'medium',
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`slds-button slds-button--${variant} slds-button--${size} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
