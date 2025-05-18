/**
 * A cell component for use within tables.
 *
 * @example
 * <TableCell
 *   contentType="text"
 *   title="John Doe"
 *   description="Software Engineer"
 * />
 */
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import './TableCell.css';
import { clsx } from 'clsx';
import { Selection } from '../Selection';

const tableCellVariants = cva('tsl-table-cell', {
    variants: {
        contentType: {
            text: [''],
            number: ['tsl-table-cell-number'],
            checkbox: ['tsl-table-cell-checkbox'],
            action: ['tsl-table-cell-action'],
        },
        density: {
            expanded: ['tsl-table-cell-expanded'],
            compact: ['tsl-table-cell-compact'],
        },
        isSelected: {
            true: ['tsl-table-cell-selected'],
        },
        showStripes: {
            true: ['tsl-table-cell-striped'],
        },
        showDivider: {
            true: ['tsl-table-cell-with-divider'],
        },
        align: {
            left: ['justify-left'],
            right: ['justify-right'],
            center: ['justify-center'],
        },
    },
    defaultVariants: {
        contentType: 'text',
        density: 'expanded',
        isSelected: false,
        showStripes: false,
        showDivider: true,
        align: 'left',
    },
});

// Common props for all table cells
export interface TableCellBaseProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof tableCellVariants> {
    children?: React.ReactNode;
    disabled?: boolean;
    contentType?: 'text' | 'number' | 'checkbox' | 'action';
}

// Props for text content
export interface TableCellTextProps {
    title?: string;
    description?: string;
}

// Props for number content
export interface TableCellNumberProps {
    value?: number;
    formatOptions?: Intl.NumberFormatOptions;
}

// Props for checkbox content
export interface TableCellCheckboxProps {
    checked?: boolean;
    onCheckChange?: (checked: boolean) => void;
}

// Props for action content
export interface TableCellActionProps {
    children?: React.ReactNode;
    label?: string;
    onClick?: (e: any) => void;
}

// Combined props type
export type TableCellProps = TableCellBaseProps &
    Partial<TableCellTextProps> &
    Partial<TableCellNumberProps> &
    Partial<TableCellCheckboxProps> &
    Partial<TableCellActionProps>;

const TableCell = React.forwardRef<HTMLDivElement, TableCellProps>(
    (
        {
            className,
            contentType = 'text',
            density,
            isSelected,
            showStripes,
            showDivider,
            children,
            align,
            disabled = false,
            // Text props
            title,
            description,
            // Number props
            value,
            formatOptions,
            // Checkbox props
            checked,
            onCheckChange,
            //Action props
            label,
            onClick,
            // Rest of props
            ...restProps
        },
        ref
    ) => {
        const renderContent = () => {
            switch (contentType) {
                case 'checkbox':
                    return (
                        <Selection
                            type="checkbox"
                            checked={checked}
                            onChange={e => onCheckChange?.(e.target.checked)}
                            disabled={disabled}
                        />
                    );
                case 'action':
                    if (children) {
                        return children;
                    }
                    return (
                        <button
                            onClick={onClick}
                            disabled={disabled}
                            className="tsl-table-cell-action-button"
                        >
                            {label}
                        </button>
                    );
                case 'number':
                    if (typeof value === 'number') {
                        if (formatOptions) {
                            return (
                                <span>
                                    {new Intl.NumberFormat(undefined, formatOptions).format(value)}
                                </span>
                            );
                        }
                        return <span>{value}</span>;
                    }
                    return null;
                case 'text':
                default:
                    return (
                        <div className="tsl-table-cell-text">
                            {title && (
                                <h2 className="tsl-text-body-primary tsl-text-color-primary">
                                    {title}
                                </h2>
                            )}
                            {description && (
                                <p className="tsl-text-body-secondary tsl-text-color-subtler">
                                    {description}
                                </p>
                            )}
                        </div>
                    );
            }
        };

        return (
            <div
                ref={ref}
                className={clsx(
                    tableCellVariants({
                        contentType,
                        density,
                        isSelected,
                        showStripes,
                        showDivider,
                        align,
                    }),
                    className
                )}
                {...restProps}
            >
                {renderContent()}
            </div>
        );
    }
);

TableCell.displayName = 'TableCell';

export { TableCell, tableCellVariants };
