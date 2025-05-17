import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { CloseOutlined } from '@ant-design/icons';
import './Tag.css';
import { clsx } from 'clsx';

const tagVariants = cva('tsl-tag tsl-tag-default', {
    variants: {
        size: {
            regular: ['tsl-tag-size-regular'],
            large: ['tsl-tag-size-large'],
        },
        iconOnly: {
            true: ['tsl-tag-icon-only'],
        },
        isDisabled: {
            true: ['tsl-tag-disabled'],
        },
    },
    defaultVariants: {
        size: 'regular',
        iconOnly: false,
        isDisabled: false,
    },
});

export interface TagProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
        VariantProps<typeof tagVariants> {
    label?: string;
    showLeadingIcon?: boolean;
    leadingIcon?: React.ReactNode;
    showCloseIcon?: boolean;
    onClose?: () => void;
}

const Tag = React.forwardRef<HTMLDivElement, TagProps>(
    (
        {
            className,
            size,
            iconOnly = false,
            isDisabled = false,
            label,
            showLeadingIcon = false,
            leadingIcon,
            showCloseIcon = false,
            onClose,
            children,
            ...props
        },
        ref
    ) => {
        const handleClose = (e: React.MouseEvent) => {
            e.stopPropagation();
            if (!isDisabled && onClose) {
                onClose();
            }
        };

        return (
            <div
                aria-disabled={isDisabled || false}
                ref={ref}
                className={clsx(
                    tagVariants({
                        size,
                        iconOnly,
                        isDisabled,
                    }),
                    className
                )}
                {...props}
            >
                {!iconOnly && showLeadingIcon && leadingIcon && (
                    <span className="tsl-tag-icon tsl-tag-icon-leading">{leadingIcon}</span>
                )}
                {iconOnly && leadingIcon && <span className="tsl-tag-icon">{leadingIcon}</span>}
                {!iconOnly && label ? (
                    <span className="tsl-tag-label tsl-text-body-secondary">{label}</span>
                ) : (
                    children
                )}

                {!iconOnly && showCloseIcon && (
                    <span
                        className="tsl-tag-icon tsl-tag-icon-close"
                        onClick={handleClose}
                        role="button"
                        aria-label="Remove tag"
                    >
                        <CloseOutlined style={{ height: '12px', width: '12px' }} />
                    </span>
                )}
            </div>
        );
    }
);

Tag.displayName = 'Tag';

export { Tag, tagVariants };
