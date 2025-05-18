/**
 * A table component for displaying structured data.
 *
 * @example
 * <Table
 *   density="compact"
 *   showStripes
 *   data={tableData}
 * />
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import { HeaderCell } from '../HeaderCell/HeaderCell';
import { TableCell, TableCellProps } from '../TableCell/TableCell';
import './Table.css';

const tableVariants = cva('tsl-table', {
    variants: {
        density: {
            expanded: ['tsl-table-expanded'],
            compact: ['tsl-table-compact'],
        },
        showStripes: {
            true: ['tsl-table-striped'],
        },
        showDividers: {
            true: ['tsl-table-with-dividers'],
        },
        bordered: {
            true: ['tsl-table-bordered'],
        },
    },
    defaultVariants: {
        density: 'expanded',
        showStripes: false,
        showDividers: true,
        bordered: false,
    },
});

export interface TableColumn {
    id: string;
    title?: string;
    width?: string | number;
    align?: 'left' | 'right' | 'center';
    sortable?: boolean;
    headerType?: 'text' | 'selection' | 'spacer';
    contentType?: 'text' | 'number' | 'checkbox' | 'action';
    renderHeader?: (column: TableColumn) => React.ReactNode;
    renderCell?: (data: any, rowIndex: number) => React.ReactNode;
}

export interface TableProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof tableVariants> {
    columns: TableColumn[];
    data: any[];
    selectedRows?: Set<number>;
    onRowSelectionChange?: (selectedRows: Set<number>) => void;
    sortColumn?: string;
    sortDirection?: 'asc' | 'desc' | null;
    onSortChange?: (columnId: string, direction: 'asc' | 'desc' | null) => void;
}

export const Table = React.forwardRef<HTMLDivElement, TableProps>(
    (
        {
            className,
            columns,
            data,
            density = 'expanded',
            showStripes = false,
            showDividers = true,
            bordered = false,
            selectedRows = new Set(),
            onRowSelectionChange,
            sortColumn,
            sortDirection,
            onSortChange,
            ...props
        },
        ref
    ) => {
        const handleHeaderSelectionChange = (selected: boolean) => {
            if (!onRowSelectionChange) return;

            if (selected) {
                // Select all rows
                const allRows = new Set(data.map((_, index) => index));
                onRowSelectionChange(allRows);
            } else {
                // Deselect all rows
                onRowSelectionChange(new Set());
            }
        };

        const handleRowSelectionChange = (rowIndex: number, selected: boolean) => {
            if (!onRowSelectionChange) return;

            const newSelectedRows = new Set(selectedRows);
            if (selected) {
                newSelectedRows.add(rowIndex);
            } else {
                newSelectedRows.delete(rowIndex);
            }
            onRowSelectionChange(newSelectedRows);
        };

        const handleSortChange = (columnId: string, direction: 'asc' | 'desc' | null) => {
            onSortChange?.(columnId, direction);
        };

        return (
            <div
                ref={ref}
                className={clsx(
                    tableVariants({
                        density,
                        showStripes,
                        showDividers: showDividers,
                        bordered,
                    }),
                    className
                )}
                {...props}
            >
                {/* Table Header */}
                <div className="tsl-table-header">
                    {columns.map(column => {
                        if (column.renderHeader) {
                            return (
                                <div
                                    key={column.id}
                                    className="tsl-table-header-cell-wrapper"
                                    style={{ width: column.width }}
                                >
                                    {column.renderHeader(column)}
                                </div>
                            );
                        }

                        if (column.headerType === 'selection') {
                            return (
                                <HeaderCell
                                    key={column.id}
                                    headerType="selection"
                                    density={density}
                                    allSelected={
                                        selectedRows.size > 0 && selectedRows.size === data.length
                                    }
                                    someSelected={
                                        selectedRows.size > 0 && selectedRows.size < data.length
                                    }
                                    onSelectionChange={handleHeaderSelectionChange}
                                    style={{ width: column.width }}
                                    className="tsl-table-header-cell-wrapper"
                                />
                            );
                        }

                        return (
                            <HeaderCell
                                key={column.id}
                                headerType={column.headerType || 'text'}
                                density={density}
                                title={column.title}
                                sortable={column.sortable}
                                sortDirection={sortColumn === column.id ? sortDirection : null}
                                onSortChange={direction => handleSortChange(column.id, direction)}
                                style={{ width: column.width }}
                                className="tsl-table-header-cell-wrapper"
                            />
                        );
                    })}
                </div>

                {/* Table Body */}
                <div className="tsl-table-body">
                    {data.map((row, rowIndex) => (
                        <div key={rowIndex} className="tsl-table-row">
                            {columns.map(column => {
                                if (column.renderCell) {
                                    return (
                                        <TableCell
                                            key={column.id}
                                            contentType="action"
                                            density={density}
                                            showStripes={showStripes}
                                            showDivider={showDividers}
                                            className="tsl-table-cell-wrapper"
                                            style={{ width: column.width }}
                                            align="right"
                                        >
                                            {column.renderCell(row, rowIndex)}
                                        </TableCell>
                                    );
                                }

                                if (column.contentType === 'checkbox') {
                                    return (
                                        <TableCell
                                            key={column.id}
                                            contentType="checkbox"
                                            density={density}
                                            checked={selectedRows.has(rowIndex)}
                                            onCheckChange={checked =>
                                                handleRowSelectionChange(rowIndex, checked)
                                            }
                                            showStripes={showStripes}
                                            showDivider={showDividers}
                                            style={{ width: column.width }}
                                            className="tsl-table-cell-wrapper"
                                        />
                                    );
                                }

                                // Default cell rendering based on content type
                                const cellProps: TableCellProps = {
                                    contentType: column.contentType || 'text',
                                    density,
                                    showStripes,
                                    showDivider: showDividers,
                                    style: { width: column.width },
                                    className: 'tsl-table-cell-wrapper',
                                };

                                // Add content-specific props
                                if (column.contentType === 'text') {
                                    cellProps.title = row[column.id]?.toString();
                                } else if (column.contentType === 'number') {
                                    cellProps.value = row[column.id];
                                } else if (column.contentType === 'action') {
                                    cellProps.label = row[column.id]?.toString();
                                }

                                return <TableCell key={column.id} {...cellProps} />;
                            })}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
);

Table.displayName = 'Table';

export { tableVariants };
