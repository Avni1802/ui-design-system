import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import './Button.css';
import { clsx } from 'clsx';

const buttonVariants = cva('tsl-button', {
    variants: {
        variant: {
            primary: ['tsl-button-primary'],
            secondary: ['tsl-button-secondary'],
            tertiary: ['tsl-button-tertiary'],
            inverse: ['button-variant-inverse'],
        },
        color: {
            primary: ['button-color-primary'],
            black: ['button-color-black'],
            white: ['button-color-white'],
        },
        size: {
            sm: ['tsl-text-body-secondary'],
            md: ['tsl-text-body-primary'],
            lg: ['tsl-text-body-primary'],
        },
        isFullWidth: {
            true: ['button-full-width'],
        },
        iconOnly: {
            true: ['button-icon-only'],
        },
    },
    defaultVariants: {
        variant: 'primary',
        color: 'primary',
        size: 'md',
        // state: 'default',
        isFullWidth: false,
        iconOnly: false,
    },
});

export interface ButtonProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
        VariantProps<typeof buttonVariants> {
    iconLeading?: React.ReactNode;
    showLeading?: boolean;
    disabled?: boolean;
    iconTrailing?: React.ReactNode;
    showTrailing?: boolean;
    label?: string;
    isLoading?: boolean;
    icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            color,
            size,
            // state,
            isFullWidth = false,
            iconOnly = false,
            icon,
            iconLeading,
            showLeading = false,
            iconTrailing,
            showTrailing = false,
            label,
            isLoading = false,
            disabled = false,
            children,
            ...props
        },
        ref
    ) => {
        // Determine the actual state based on disabled and isLoading props
        // const buttonState = isLoading ? 'loader' : state;

        return (
            <button
                ref={ref}
                className={clsx(
                    buttonVariants({
                        variant,
                        color,
                        size,
                        isFullWidth,
                        iconOnly,
                    }),
                    className
                )}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading && (
                    <span className="button-loader">
                        {/* Loader component or spinner icon */}
                        <span className="loader-spinner" />
                    </span>
                )}

                {!iconOnly && showLeading && iconLeading && (
                    <span className="button-icon button-icon-leading">{iconLeading}</span>
                )}

                {iconOnly && icon ? (
                    <span className="button-icon">{icon}</span>
                ) : label ? (
                    <span className="button-label">{label}</span>
                ) : (
                    children
                )}

                {!iconOnly && showTrailing && iconTrailing && (
                    <span className="button-icon button-icon-trailing">{iconTrailing}</span>
                )}
            </button>
        );
    }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
