import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Button, buttonVariants, ButtonProps } from '../Button/Button';
import { clsx } from 'clsx';
import './Link.css';

const linkVariants = cva('tsl-link', {
    variants: {
        color: {
            primary: ['tsl-link-color-primary'],
            black: ['tsl-link-color-black'],
            danger: ['tsl-link-color-danger'],
            success: ['tsl-link-color-success'],
            warning: ['tsl-link-color-warning'],
            white: ['tsl-link-color-white'],
        },
    },
    defaultVariants: {
        color: 'primary',
    },
});

export interface LinkProps extends Omit<ButtonProps, 'color'>, VariantProps<typeof linkVariants> {
    href?: string;
    target?: string;
    rel?: string;
    as?: 'a' | 'button';
}

const Link = React.forwardRef<HTMLAnchorElement | HTMLButtonElement, LinkProps>(
    (
        {
            className,
            variant = 'tertiary',
            color = 'primary',
            size,
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
            href,
            target,
            rel,
            as = 'a',
            ...props
        },
        ref
    ) => {
        const linkClasses = clsx(
            buttonVariants({
                variant,
                size,
                isFullWidth,
                iconOnly,
            }),
            linkVariants({ color }),
            className
        );

        // If it's an anchor link
        if (as === 'a' && href) {
            return (
                <a
                    ref={ref as React.ForwardedRef<HTMLAnchorElement>}
                    className={linkClasses}
                    href={href}
                    target={target}
                    rel={target === '_blank' ? rel || 'noopener noreferrer' : rel}
                    {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
                >
                    {isLoading && (
                        <span className="button-loader">
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
                </a>
            );
        }

        // If it's a button that looks like a link
        return (
            <Button
                ref={ref as React.ForwardedRef<HTMLButtonElement>}
                className={linkClasses}
                variant={variant}
                size={size}
                isFullWidth={isFullWidth}
                iconOnly={iconOnly}
                icon={icon}
                iconLeading={iconLeading}
                showLeading={showLeading}
                iconTrailing={iconTrailing}
                showTrailing={showTrailing}
                label={label}
                isLoading={isLoading}
                disabled={disabled}
                {...props}
            >
                {children}
            </Button>
        );
    }
);

Link.displayName = 'Link';

export { Link, linkVariants };
