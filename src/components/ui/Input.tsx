import { InputHTMLAttributes } from 'react';
import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', id, ...props }: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className={`slds-input-wrapper ${className}`}>
      {label && (
        <label htmlFor={inputId} className="slds-input-label">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`slds-input ${error ? 'slds-input--error' : ''}`}
        {...props}
      />
      {error && <span className="slds-input-error">{error}</span>}
    </div>
  );
}
