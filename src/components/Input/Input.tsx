import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import './Input.css';

const inputVariants = cva(['tsl-input', 'tsl-text-body-primary'], {
    variants: {
        variant: {
            default: [],
            description: ['tsl-input-description'],
            select: ['tsl-input-select'],
            password: [],
        },
        size: {
            sm: ['tsl-input-sm', 'tsl-text-body-secondary'],
            md: ['tsl-input-md', 'tsl-text-body-primary'],
            lg: ['tsl-input-lg', 'tsl-text-body-primary'],
        },
        state: {
            default: [],
            error: ['tsl-input--error'],
        },
        hasLeadingIcon: {
            true: ['tsl-input--with-leading-icon'],
        },
        hasTrailingIcon: {
            true: ['tsl-input--with-trailing-icon'],
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'md',
        state: 'default',
        hasLeadingIcon: false,
        hasTrailingIcon: false,
    },
});

const labelVariants = cva(['tsl-input-label'], {
    variants: {
        size: {
            default: ['tsl-text-heading-form'],
            small: ['tsl-text-body-secondary'],
        },
        disabled: {
            true: ['tsl-input-label--disabled'],
        },
    },
    defaultVariants: {
        size: 'default',
        disabled: false,
    },
});

const iconVariants = cva('tsl-input-icon', {
    variants: {
        position: {
            leading: ['tsl-input-icon--leading'],
            trailing: ['tsl-input-icon--trailing'],
        },
        size: {
            sm: ['tsl-input-icon-sm'],
            md: ['tsl-input-icon-md'],
            lg: ['tsl-input-icon-lg'],
        },
    },
    defaultVariants: {
        position: 'leading',
        size: 'md',
    },
});

const helpTextVariants = cva('tsl-text-body-secondary', {
    variants: {
        helpTextType: {
            default: ['tsl-text-color-default'],
            danger: ['tsl-text-color-danger'],
            success: ['tsl-text-color-success'],
            warning: ['tsl-text-color-warning'],
            primary: ['tsl-text-color-primary'],
        },
        showHelpTextIcon: {
            true: ['tsl-input-icon-sm'],
        },
    },
    defaultVariants: {
        helpTextType: 'default',
        showHelpTextIcon: false,
    },
});

export interface InputProps
    extends Omit<
            React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
            'size'
        >,
        VariantProps<typeof inputVariants>,
        VariantProps<typeof helpTextVariants> {
    label?: string;
    labelSize?: 'default' | 'small';
    helpText?: string;
    error?: boolean;
    errorMessage?: string;
    leadingIcon?: React.ReactNode;
    trailingIcon?: React.ReactNode;
    iconSize?: 'sm' | 'md' | 'lg';
    options?: Array<{ value: string; label: string }>;
    fullWidth?: boolean;
    rows?: number;
}

const Input = React.forwardRef<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
    InputProps
>(
    (
        {
            className,
            variant = 'default',
            size = 'md',
            state,
            label,
            labelSize = 'default',
            helpText,
            showHelpTextIcon,
            helpTextType,
            error = false,
            errorMessage,
            leadingIcon,
            trailingIcon,
            iconSize = 'md',
            options,
            fullWidth = false,
            disabled = false,
            ...props
        },
        ref
    ) => {
        // Determine if we have icons
        const hasLeadingIcon = !!leadingIcon;
        const hasTrailingIcon = !!trailingIcon;

        // Set error state if error prop is true
        const inputState = error ? 'error' : state;

        // Determine which element to render based on variant
        const renderInput = () => {
            const inputProps = {
                className: clsx(
                    inputVariants({
                        variant,
                        size,
                        state: inputState,
                        hasLeadingIcon,
                        hasTrailingIcon,
                    }),
                    className,
                    { 'tsl-input-select-placeholder': props.value === '' }
                ),
                disabled,
                ...props,
            };

            if (variant === 'description') {
                return (
                    <textarea
                        ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
                        {...inputProps}
                    />
                );
            } else if (variant === 'select') {
                return (
                    <select ref={ref as React.ForwardedRef<HTMLSelectElement>} {...inputProps}>
                        {options?.map(option => (
                            <option
                                disabled={option.value === ''}
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>
                );
            } else if (variant === 'password') {
                return (
                    <input
                        ref={ref as React.ForwardedRef<HTMLInputElement>}
                        type="password"
                        {...inputProps}
                    />
                );
            } else {
                return (
                    <input
                        ref={ref as React.ForwardedRef<HTMLInputElement>}
                        type="text"
                        {...inputProps}
                    />
                );
            }
        };

        return (
            <div className={clsx('tsl-input-container', fullWidth ? 'w-full' : 'w-auto')}>
                {label && (
                    <label
                        className={labelVariants({ size: labelSize, disabled })}
                        htmlFor={props.id}
                    >
                        {label}
                    </label>
                )}

                <div className="tsl-input-wrapper">
                    {renderInput()}

                    {hasLeadingIcon && (
                        <span className={iconVariants({ position: 'leading', size: iconSize })}>
                            {leadingIcon}
                        </span>
                    )}

                    {hasTrailingIcon && (
                        <span className={iconVariants({ position: 'trailing', size: iconSize })}>
                            {trailingIcon}
                        </span>
                    )}
                </div>
                {(helpText || errorMessage) && (
                    <div
                        className={helpTextVariants({
                            helpTextType: errorMessage ? 'danger' : helpTextType,
                            showHelpTextIcon,
                        })}
                    >
                        {errorMessage ? errorMessage : helpText}
                    </div>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export { Input, inputVariants };
