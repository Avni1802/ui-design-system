/**
 * A header cell component for table headers with sorting support.
 *
 * @example
 * <HeaderCell
 *   headerType="text"
 *   title="Name"
 *   sortable
 * />
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import { Selection } from '../Selection';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import './HeaderCell.css';

const headerCellVariants = cva('tsl-header-cell', {
    variants: {
        headerType: {
            text: ['tsl-header-cell-text'],
            selection: ['tsl-header-cell-selection'],
            spacer: ['tsl-header-cell-spacer'],
        },
        density: {
            expanded: ['tsl-header-cell-expanded'],
            compact: ['tsl-header-cell-compact'],
        },
        sortable: {
            true: ['tsl-header-cell-sortable'],
        },
        align: {
            left: ['justify-left'],
            right: ['justify-right'],
            center: ['justify-center'],
        },
    },
    defaultVariants: {
        headerType: 'text',
        density: 'expanded',
        sortable: false,
        align: 'left',
    },
});

export type SortDirection = 'asc' | 'desc' | null;

// Common props for all header cells
export interface HeaderCellBaseProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof headerCellVariants> {
    children?: React.ReactNode;
    disabled?: boolean;
    headerType?: 'text' | 'selection' | 'spacer';
}

// Props for text header
export interface HeaderCellTextProps {
    title?: string;
    sortable?: boolean;
    sortDirection?: SortDirection;
    onSortChange?: (direction: SortDirection) => void;
}

// Props for selection header
export interface HeaderCellSelectionProps {
    allSelected?: boolean;
    someSelected?: boolean;
    onSelectionChange?: (selected: boolean) => void;
}

// Combined props type
export type HeaderCellProps = HeaderCellBaseProps &
    Partial<HeaderCellTextProps> &
    Partial<HeaderCellSelectionProps>;

const HeaderCell = React.forwardRef<HTMLDivElement, HeaderCellProps>(
    (
        {
            className,
            headerType = 'text',
            density,
            children,
            disabled = false,
            // Text header props
            title,
            sortable = false,
            sortDirection = null,
            onSortChange,
            // Selection header props
            allSelected = false,
            someSelected = false,
            onSelectionChange,
            // Rest of props
            ...restProps
        },
        ref
    ) => {
        const handleSortClick = () => {
            if (!sortable || disabled) return;

            let newDirection: SortDirection = null;
            if (sortDirection === null) {
                newDirection = 'asc';
            } else if (sortDirection === 'asc') {
                newDirection = 'desc';
            } else {
                newDirection = null;
            }

            onSortChange?.(newDirection);
        };

        const renderSortIcon = () => {
            if (!sortable) return null;

            if (sortDirection === 'asc') {
                return <ArrowUpOutlined className="tsl-header-cell-sort-icon" />;
            } else if (sortDirection === 'desc') {
                return <ArrowDownOutlined className="tsl-header-cell-sort-icon" />;
            }

            return (
                <div className="tsl-header-cell-sort-icon tsl-header-cell-sort-icon-inactive">
                    <ArrowUpOutlined />
                </div>
            );
        };

        const renderContent = () => {
            switch (headerType) {
                case 'selection':
                    return (
                        <Selection
                            type="checkbox"
                            checked={allSelected}
                            intermediate={!allSelected && someSelected}
                            onChange={e => onSelectionChange?.(e.target.checked)}
                            disabled={disabled}
                        />
                    );
                case 'spacer':
                    return null;
                case 'text':
                default:
                    return (
                        <div
                            className={clsx(
                                'tsl-header-cell-content tsl-text-body-primary tsl-text-color-brand',
                                sortable && 'tsl-header-cell-sortable-content'
                            )}
                            onClick={handleSortClick}
                        >
                            <span className="tsl-text-body-primary tsl-text-weight-medium">
                                {title || children}
                            </span>
                            {renderSortIcon()}
                        </div>
                    );
            }
        };

        return (
            <div
                ref={ref}
                className={clsx(
                    headerCellVariants({
                        headerType,
                        density,
                        sortable: sortable && headerType === 'text',
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

HeaderCell.displayName = 'HeaderCell';

export { HeaderCell, headerCellVariants };
