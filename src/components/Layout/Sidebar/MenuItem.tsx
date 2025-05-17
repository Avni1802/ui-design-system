import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';

const menuItemVariants = cva('tsl-menu-item', {
    variants: {
        variant: {
            default: ['tsl-menu-item-default'],
        },
        size: {
            sm: ['tsl-text-body-secondary tsl-menu-item-sm'],
            md: ['tsl-text-body-primary tsl-menu-item-md'],
        },
        isFullWidth: {
            true: ['menu-item-full-width'],
        },
        active: {
            true: ['active'],
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'md',
        isFullWidth: true,
        active: false,
    },
});

export interface MenuItemProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
        VariantProps<typeof menuItemVariants> {
    showLeading?: boolean;
    label: string;
    iconTrailing?: React.ReactNode;
    iconLeading?: React.ReactNode;
    showTrailing?: boolean;
    active?: boolean;
    onClick?: () => void;
}

const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(
    (
        {
            className,
            variant,
            size,
            isFullWidth = true,
            iconLeading,
            showLeading = true,
            iconTrailing,
            showTrailing = false,
            active,
            label,
            onClick,
            ...props
        },
        ref
    ) => {
        // Determine the actual variant based on active and disabled props

        return (
            <div
                ref={ref}
                className={clsx(
                    menuItemVariants({
                        variant,
                        size,
                        isFullWidth,
                        active,
                    }),
                    className
                )}
                onClick={onClick}
                role="button"
                {...props}
            >
                {showLeading && iconLeading && (
                    <span className={clsx('tsl-menu-item-icon menu-item-icon-leading')}>
                        {iconLeading}
                    </span>
                )}

                <span className="tsl-menu-item-label">{label}</span>

                {showTrailing && iconTrailing && (
                    <span className="menu-item-icon menu-item-icon-trailing">{iconTrailing}</span>
                )}
            </div>
        );
    }
);
MenuItem.displayName = 'MenuItem';

export { MenuItem, menuItemVariants };
