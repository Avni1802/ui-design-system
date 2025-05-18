/**
 * A selection control that can be used as a checkbox or radio button.
 *
 * @example
 * <Selection
 *   type="checkbox"
 *   label="Accept terms"
 *   helpText="Please read our terms and conditions"
 * />
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import './Selection.css';

const selectionControlVariants = cva('tsl-selection-control', {
    variants: {
        type: {
            checkbox: ['tsl-checkbox-control'],
            radio: ['tsl-radio-control'],
        },
        size: {
            sm: ['tsl-selection-control-sm'],
            md: ['tsl-selection-control-md'],
            lg: ['tsl-selection-control-lg'],
        },
        intermediate: {
            true: ['intermediate'],
        },
    },
    defaultVariants: {
        type: 'checkbox',
        size: 'md',
        intermediate: false,
    },
});

const selectionVariants = cva('tsl-selection-container', {
    variants: {
        disabled: {
            true: ['disabled'],
        },
        selected: {
            true: ['selected'],
        },
    },
    defaultVariants: {
        disabled: false,
        selected: false,
    },
});

export interface SelectionProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
        VariantProps<typeof selectionControlVariants> {
    label?: string;
    helpText?: string;
    isChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    value?: string;
}

const Selection = React.forwardRef<HTMLInputElement, SelectionProps>(
    (
        {
            className,
            type = 'checkbox',
            size,
            intermediate = false,
            label,
            helpText,
            isChecked,
            onCheckedChange,
            disabled = false,
            id,
            value,
            name,
            ...props
        },
        ref
    ) => {
        const generatedId = React.useId();
        const selectionId = id || `selection-${generatedId}`;

        // Handle controlled component
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (onCheckedChange) {
                onCheckedChange(event.target.checked);
            }
        };

        return (
            <label
                className={clsx(selectionVariants({ disabled, selected: isChecked }), className)}
                htmlFor={selectionId}
            >
                <div className="tsl-selection-input-wrapper">
                    <input
                        ref={ref}
                        type={type ?? 'checkbox'}
                        id={selectionId}
                        className="tsl-selection-input"
                        checked={isChecked}
                        onChange={handleChange}
                        disabled={disabled}
                        value={value}
                        name={name}
                        {...props}
                    />
                    <span
                        className={selectionControlVariants({
                            type,
                            size,
                            intermediate: type === 'checkbox' ? intermediate : false,
                        })}
                    />
                </div>

                {(label || helpText) && (
                    <div className="tsl-selection-label">
                        {label && (
                            <span className="tsl-selection-text tsl-text-body-primary">
                                {label}
                            </span>
                        )}
                        {helpText && (
                            <span className="tsl-selection-help-text tsl-text-body-secondary">
                                {helpText}
                            </span>
                        )}
                    </div>
                )}
            </label>
        );
    }
);

Selection.displayName = 'Selection';

export { Selection, selectionControlVariants };
