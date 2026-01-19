import React from 'react';
import { ChevronDown } from 'lucide-react';

type Option = {
    value: string;
    label: string;
};

type Props = {
    name: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onBlur: () => void;
    options: Option[];
    required?: boolean;
    placeholder?: string;
};

const SelectInput = ({ 
    name, 
    label, 
    value, 
    onChange, 
    onBlur, 
    options, 
    required = false,
    placeholder 
}: Props) => {
    const inputId = `select-${name}`;

    return (
        <div className="w-full">
            <label 
                htmlFor={inputId} 
                className="block mb-2 normal-text font-semibold text-slate-900"
            >
                {label}
                {required && <span className="text-accent ml-1" aria-label="required">*</span>}
            </label>
            <div className="relative">
                <select
                    id={inputId}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className="w-full h-12 px-4 pr-10 bg-white border-2 border-slate-200 text-slate-900 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 appearance-none cursor-pointer"
                    aria-required={required}
                    aria-invalid={false}
                >
                    <option value="" disabled>
                        {placeholder || `Select ${label}`}
                    </option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-white text-slate-900">
                            {opt.label}
                        </option>
                    ))}
                </select>
                <ChevronDown 
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary pointer-events-none" 
                    aria-hidden="true"
                />
            </div>
        </div>
    );
};

export default SelectInput;