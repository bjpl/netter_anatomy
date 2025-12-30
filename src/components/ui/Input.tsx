import React, { useState, useRef } from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'search';
  fullWidth?: boolean;
  onClear?: () => void;
}

export interface AutocompleteOption {
  id: string;
  label: string;
  subtitle?: string;
}

export interface AutocompleteProps extends Omit<InputProps, 'onChange' | 'onSelect'> {
  options: AutocompleteOption[];
  onChange?: (value: string) => void;
  onSelectOption?: (option: AutocompleteOption) => void;
  filterOptions?: (options: AutocompleteOption[], inputValue: string) => AutocompleteOption[];
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      variant = 'default',
      fullWidth = false,
      onClear,
      className = '',
      ...props
    },
    ref
  ) => {
    const [_isFocused, setIsFocused] = useState(false);
    const showClearButton = variant === 'search' && props.value && onClear;

    const baseStyles = 'px-4 py-2 border rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1';
    const stateStyles = error
      ? 'border-[#DC2626] focus:ring-[#DC2626] focus:border-[#DC2626]'
      : 'border-[#D1D5DB] focus:ring-[#2563EB] focus:border-[#2563EB]';
    const widthStyles = fullWidth ? 'w-full' : '';
    const paddingStyles = `${leftIcon ? 'pl-10' : ''} ${rightIcon || showClearButton ? 'pr-10' : ''}`;

    const SearchIcon = () => (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    );

    const ClearIcon = () => (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    );

    return (
      <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-[#1F2937] mb-1.5">
            {label}
          </label>
        )}

        <div className="relative">
          {(variant === 'search' || leftIcon) && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]">
              {variant === 'search' ? <SearchIcon /> : leftIcon}
            </div>
          )}

          <input
            ref={ref}
            className={`${baseStyles} ${stateStyles} ${widthStyles} ${paddingStyles}`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? 'input-error' : helperText ? 'input-helper' : undefined}
            {...props}
          />

          {showClearButton && (
            <button
              type="button"
              onClick={onClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#1F2937] p-1 rounded-md hover:bg-[#F3F4F6] transition-colors"
              aria-label="Clear input"
            >
              <ClearIcon />
            </button>
          )}

          {!showClearButton && rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280]">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p id="input-error" className="mt-1.5 text-sm text-[#DC2626]">
            {error}
          </p>
        )}

        {!error && helperText && (
          <p id="input-helper" className="mt-1.5 text-sm text-[#6B7280]">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export const Autocomplete: React.FC<AutocompleteProps> = ({
  options,
  onChange,
  onSelectOption,
  filterOptions,
  ...inputProps
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const defaultFilterOptions = (opts: AutocompleteOption[], value: string) => {
    const query = value.toLowerCase();
    return opts.filter(
      (opt) =>
        opt.label.toLowerCase().includes(query) ||
        opt.subtitle?.toLowerCase().includes(query)
    );
  };

  const filter = filterOptions || defaultFilterOptions;
  const filteredOptions = inputValue ? filter(options, inputValue) : options;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsOpen(true);
    setHighlightedIndex(0);
    onChange?.(value);
  };

  const handleSelect = (option: AutocompleteOption) => {
    setInputValue(option.label);
    setIsOpen(false);
    onSelectOption?.(option);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredOptions[highlightedIndex]) {
          handleSelect(filteredOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <Input
        {...inputProps}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsOpen(true)}
        onBlur={() => {
          // Delay to allow click on option
          setTimeout(() => setIsOpen(false), 200);
        }}
        variant="search"
        onClear={() => {
          setInputValue('');
          onChange?.('');
        }}
        autoComplete="off"
        role="combobox"
        aria-expanded={isOpen}
        aria-autocomplete="list"
        aria-controls="autocomplete-listbox"
      />

      {isOpen && filteredOptions.length > 0 && (
        <ul
          id="autocomplete-listbox"
          role="listbox"
          className="absolute z-10 w-full mt-1 bg-white border border-[#E5E7EB] rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {filteredOptions.map((option, index) => (
            <li
              key={option.id}
              role="option"
              aria-selected={index === highlightedIndex}
              onClick={() => handleSelect(option)}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={`
                px-4 py-2 cursor-pointer transition-colors
                ${
                  index === highlightedIndex
                    ? 'bg-[#EFF6FF] text-[#2563EB]'
                    : 'text-[#1F2937] hover:bg-[#F3F4F6]'
                }
              `}
            >
              <div className="font-medium">{option.label}</div>
              {option.subtitle && (
                <div className="text-sm text-[#6B7280] mt-0.5">
                  {option.subtitle}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Input;
