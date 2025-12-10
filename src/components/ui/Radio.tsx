import { InputHTMLAttributes } from 'react';
import './Radio.css';

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

export function Radio({ label, className = '', id, ...props }: RadioProps) {
  const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className={`slds-radio-wrapper ${className}`}>
      <input
        type="radio"
        id={radioId}
        className="slds-radio"
        {...props}
      />
      <label htmlFor={radioId} className="slds-radio-label">
        {label}
      </label>
    </div>
  );
}
