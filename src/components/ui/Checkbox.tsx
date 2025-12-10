import { InputHTMLAttributes } from 'react';
import './Checkbox.css';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

export function Checkbox({ label, className = '', id, ...props }: CheckboxProps) {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className={`slds-checkbox-wrapper ${className}`}>
      <input
        type="checkbox"
        id={checkboxId}
        className="slds-checkbox"
        {...props}
      />
      <label htmlFor={checkboxId} className="slds-checkbox-label">
        {label}
      </label>
    </div>
  );
}
