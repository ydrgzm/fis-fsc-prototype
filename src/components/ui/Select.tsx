import { useState, useRef, useEffect, useMemo } from 'react';
import './Select.css';

export interface SelectOption {
  value: string;
  label: string;
  dataType?: string;
  badges?: string[];
}

interface SelectProps {
  label?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (e: { target: { value: string } }) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
  placeholder?: string;
}

export function Select({ 
  label, 
  options, 
  className = '', 
  id, 
  value = '', 
  onChange, 
  disabled = false,
  placeholder = 'Select an option...'
}: SelectProps) {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Helper to get badge CSS class based on content
  const getBadgeClass = (badge: string): string => {
    if (badge === 'Has Default' || badge === 'Not Restricted') {
      return 'slds-badge-positive';
    }
    if (badge === 'No Default' || badge === 'Restricted') {
      return 'slds-badge-neutral';
    }
    return '';
  };

  const selectedOption = options.find(opt => opt.value === value);

  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options;
    const lowerSearch = searchTerm.toLowerCase();
    return options.filter(opt => 
      opt.label.toLowerCase().includes(lowerSearch) ||
      opt.value.toLowerCase().includes(lowerSearch)
    );
  }, [options, searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    onChange?.({ target: { value: optionValue } });
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleTriggerClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setSearchTerm('');
    } else if (e.key === 'Enter' && filteredOptions.length > 0) {
      handleSelect(filteredOptions[0].value);
    }
  };

  return (
    <div className={`slds-select-wrapper ${className}`} ref={containerRef}>
      {label && (
        <label htmlFor={selectId} className="slds-select-label">
          {label}
        </label>
      )}
      <div className={`slds-select-container ${disabled ? 'disabled' : ''}`}>
        <button
          type="button"
          id={selectId}
          className={`slds-select-trigger ${isOpen ? 'open' : ''}`}
          onClick={handleTriggerClick}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className="slds-select-value">
            {selectedOption ? (
              <>
                <span className="slds-select-field-name">{selectedOption.label}</span>
                {selectedOption.dataType && (
                  <span className={`slds-select-datatype slds-datatype-${selectedOption.dataType.toLowerCase().replace(/[\s\/]/g, '-')}`}>
                    {selectedOption.dataType}
                  </span>
                )}
                {selectedOption.badges?.map((badge) => (
                  <span key={badge} className={`slds-select-badge ${getBadgeClass(badge)}`}>{badge}</span>
                ))}
              </>
            ) : placeholder}
          </span>
          <span className="slds-select-arrow" />
        </button>
        
        {isOpen && (
          <div className="slds-select-dropdown">
            <div className="slds-select-search">
              <input
                ref={inputRef}
                type="text"
                className="slds-select-search-input"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <ul className="slds-select-options" role="listbox">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={option.value === value}
                    className={`slds-select-option ${option.value === value ? 'selected' : ''}`}
                    onClick={() => handleSelect(option.value)}
                  >
                    <span className="slds-select-field-name">{option.label}</span>
                    {option.dataType && (
                      <span className={`slds-select-datatype slds-datatype-${option.dataType.toLowerCase().replace(/[\s\/]/g, '-')}`}>
                        {option.dataType}
                      </span>
                    )}
                    {option.badges?.map((badge) => (
                      <span key={badge} className={`slds-select-badge ${getBadgeClass(badge)}`}>{badge}</span>
                    ))}
                  </li>
                ))
              ) : (
                <li className="slds-select-no-results">No results found</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
