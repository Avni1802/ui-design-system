/**
 * A group of selection controls that can be managed together.
 *
 * @example
 * <SelectionGroup
 *   type="radio"
 *   options={[
 *     { label: "Option 1", value: "1" },
 *     { label: "Option 2", value: "2" }
 *   ]}
 * />
 */

import * as React from 'react';
import { clsx } from 'clsx';
import { Selection } from './Selection';
import './Selection.css';

export interface SelectionOption {
    id: string;
    label: string;
    value: string;
    helpText?: string;
    disabled?: boolean;
}

export interface SelectionGroupProps {
    type: 'checkbox' | 'radio';
    options: SelectionOption[];
    selectedValues: string[];
    onChange?: (selectedValues: string[]) => void;
    size?: 'sm' | 'md' | 'lg';
    direction?: 'vertical' | 'horizontal';
    className?: string;
    disabled?: boolean;
    name?: string;
    label?: string;
}

const SelectionGroup: React.FC<SelectionGroupProps> = ({
    type,
    options,
    selectedValues,
    onChange,
    size = 'md',
    direction = 'vertical',
    className,
    disabled = false,
    label,
    name,
}) => {
    const radioGroupId = React.useId();

    const handleSelectionChange = (id: string, value: string, checked: boolean) => {
        if (!onChange) return;

        if (type === 'checkbox') {
            // For checkboxes, we can select multiple values
            if (checked) {
                onChange([...selectedValues, value]);
            } else {
                onChange(selectedValues.filter(val => val !== value));
            }
        } else {
            // For radio buttons, we can only select one value
            onChange([value]);
        }
    };

    return (
        <div className="tsl-selection-group-wrapper">
            {label && <span className="tsl-selection-text tsl-text-body-primary">{label}</span>}
            <div
                className={clsx(
                    'tsl-selection-group',
                    direction === 'horizontal' && 'tsl-selection-group-horizontal',
                    className
                )}
            >
                {options.map(option => (
                    <Selection
                        key={option.id}
                        name={name || (type === 'radio' ? radioGroupId : undefined)}
                        id={option.id}
                        type={type}
                        value={option.value}
                        label={option.label}
                        helpText={option.helpText}
                        isChecked={selectedValues.includes(option.value)}
                        onChange={event =>
                            handleSelectionChange(option.id, option.value, event.target.checked)
                        }
                        size={size}
                        disabled={disabled || option.disabled}
                    />
                ))}
            </div>
        </div>
    );
};

SelectionGroup.displayName = 'SelectionGroup';

export { SelectionGroup };
