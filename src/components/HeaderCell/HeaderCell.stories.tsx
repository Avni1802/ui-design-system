import '../../styles/main.css';

import { Meta, StoryObj } from '@storybook/react';
import { HeaderCell } from './HeaderCell';
import { useState } from 'react';
import { TableCell } from '../TableCell/TableCell';

const meta: Meta<typeof HeaderCell> = {
    title: 'Components/HeaderCell',
    component: HeaderCell,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        // Common props
        headerType: {
            control: 'select',
            options: ['text', 'selection', 'spacer'],
            description: 'The type of header cell',
            table: {
                category: 'General',
            },
        },
        density: {
            control: 'select',
            options: ['expanded', 'compact'],
            description: 'The density of the header cell',
            table: {
                category: 'General',
            },
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the header cell is disabled',
            table: {
                category: 'General',
            },
        },

        // Text header type props
        title: {
            control: 'text',
            description: 'The title text to display',
            table: {
                category: 'Text Header',
                type: { summary: 'string' },
            },
            if: { arg: 'headerType', eq: 'text' },
        },
        sortable: {
            control: 'boolean',
            description: 'Whether the header supports sorting',
            table: {
                category: 'Text Header',
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
            if: { arg: 'headerType', eq: 'text' },
        },
        sortDirection: {
            control: 'select',
            options: [null, 'asc', 'desc'],
            description: 'The current sort direction',
            table: {
                category: 'Text Header',
                type: { summary: 'SortDirection' },
                defaultValue: { summary: 'null' },
            },
            if: { arg: 'headerType', eq: 'text' },
        },
        onSortChange: {
            action: 'sortChanged',
            description: 'Callback when sort direction changes',
            table: {
                category: 'Text Header',
                type: { summary: '(direction: SortDirection) => void' },
            },
            if: { arg: 'headerType', eq: 'text' },
        },

        // Selection header type props
        allSelected: {
            control: 'boolean',
            description: 'Whether all items are selected',
            table: {
                category: 'Selection Header',
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
            if: { arg: 'headerType', eq: 'selection' },
        },
        someSelected: {
            control: 'boolean',
            description: 'Whether some items are selected (indeterminate state)',
            table: {
                category: 'Selection Header',
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
            if: { arg: 'headerType', eq: 'selection' },
        },
        onSelectionChange: {
            action: 'selectionChanged',
            description: 'Callback when selection state changes',
            table: {
                category: 'Selection Header',
                type: { summary: '(selected: boolean) => void' },
            },
            if: { arg: 'headerType', eq: 'selection' },
        },
    },
};

export default meta;
type Story = StoryObj<typeof HeaderCell>;

// Default HeaderCell
export const Default: Story = {
    args: {
        headerType: 'text',
        density: 'expanded',
        title: 'Column Title',
    },
};

// Header Types
export const HeaderTypes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
            <HeaderCell headerType="text" title="Text Header" />
            <HeaderCell headerType="selection" />
            <HeaderCell headerType="spacer" />
        </div>
    ),
};

// Density Variants
export const Densities: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
            <HeaderCell headerType="text" density="expanded" title="Expanded density" />
            <HeaderCell headerType="text" density="compact" title="Compact density" />
        </div>
    ),
};

// Sortable Headers
export const SortableHeaders: Story = {
    render: function SortableHeadersStory() {
        const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
                <HeaderCell
                    headerType="text"
                    title="Sortable Column"
                    sortable={true}
                    sortDirection={sortDirection}
                    onSortChange={setSortDirection}
                />
                <div>Current sort direction: {sortDirection || 'none'}</div>
            </div>
        );
    },
};

// Selection Header
export const SelectionHeader: Story = {
    render: function SelectionHeaderStory() {
        const [selected, setSelected] = useState(false);
        const [indeterminate, setIndeterminate] = useState(false);

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
                <HeaderCell
                    headerType="selection"
                    allSelected={selected}
                    someSelected={indeterminate}
                    onSelectionChange={setSelected}
                />
                <div>
                    <button onClick={() => setSelected(!selected)}>Toggle All Selected</button>
                    <button onClick={() => setIndeterminate(!indeterminate)}>
                        Toggle Indeterminate
                    </button>
                </div>
                <div>
                    Status:{' '}
                    {selected ? 'All Selected' : indeterminate ? 'Some Selected' : 'None Selected'}
                </div>
            </div>
        );
    },
};

// Disabled State
export const DisabledState: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
            <HeaderCell
                headerType="text"
                title="Disabled Text Header"
                disabled={true}
                sortable={true}
            />
            <HeaderCell headerType="selection" disabled={true} />
        </div>
    ),
};

// Table Example with Headers
export const TableExample: Story = {
    render: function TableExampleStory() {
        const [sortField, setSortField] = useState<string | null>(null);
        const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
        const [selectedRows, setSelectedRows] = useState<number[]>([]);

        const handleSort = (field: string) => (direction: 'asc' | 'desc' | null) => {
            setSortField(direction ? field : null);
            setSortDirection(direction);
        };

        const handleSelectAll = (selected: boolean) => {
            if (selected) {
                setSelectedRows([1, 2, 3, 4]);
            } else {
                setSelectedRows([]);
            }
        };

        const handleSelectRow = (rowId: number, selected: boolean) => {
            if (selected) {
                setSelectedRows(prev => [...prev, rowId]);
            } else {
                setSelectedRows(prev => prev.filter(id => id !== rowId));
            }
        };

        const allSelected = selectedRows.length === 4;
        const someSelected = selectedRows.length > 0 && selectedRows.length < 4;

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '600px',
                    border: '1px solid #ccc',
                }}
            >
                <div style={{ display: 'flex' }}>
                    <HeaderCell
                        headerType="selection"
                        allSelected={allSelected}
                        someSelected={someSelected}
                        onSelectionChange={handleSelectAll}
                        style={{ width: '60px' }}
                    />
                    <HeaderCell
                        headerType="text"
                        title="Name"
                        sortable={true}
                        sortDirection={sortField === 'name' ? sortDirection : null}
                        onSortChange={handleSort('name')}
                        style={{ flex: 2 }}
                    />
                    <HeaderCell
                        headerType="text"
                        title="Amount"
                        sortable={true}
                        sortDirection={sortField === 'amount' ? sortDirection : null}
                        onSortChange={handleSort('amount')}
                        style={{ flex: 1 }}
                    />
                    <HeaderCell
                        headerType="text"
                        title="Status"
                        sortable={true}
                        sortDirection={sortField === 'status' ? sortDirection : null}
                        onSortChange={handleSort('status')}
                        style={{ flex: 1 }}
                    />
                    <HeaderCell headerType="spacer" style={{ width: '100px' }} />
                </div>

                {[1, 2, 3, 4].map(row => (
                    <div key={row} style={{ display: 'flex' }}>
                        <TableCell
                            contentType="checkbox"
                            checked={selectedRows.includes(row)}
                            onCheckChange={checked => handleSelectRow(row, checked)}
                            showStripes={true}
                            showDivider={true}
                            style={{ width: '60px' }}
                        />
                        <TableCell
                            contentType="text"
                            title={`Item ${row}`}
                            description={`Description for item ${row}`}
                            showStripes={true}
                            showDivider={true}
                            style={{ flex: 2 }}
                        />
                        <TableCell
                            contentType="number"
                            value={row * 10.5}
                            formatOptions={{ style: 'currency', currency: 'USD' }}
                            showStripes={true}
                            showDivider={true}
                            style={{ flex: 1 }}
                        />
                        <TableCell
                            contentType="text"
                            title={row % 2 === 0 ? 'Active' : 'Inactive'}
                            showStripes={true}
                            showDivider={true}
                            style={{ flex: 1 }}
                        />
                        <TableCell
                            contentType="action"
                            label="View"
                            onClick={() => alert(`View item ${row}`)}
                            showStripes={true}
                            showDivider={true}
                            style={{ width: '100px' }}
                        />
                    </div>
                ))}
            </div>
        );
    },
};

// Alignment Options
export const AlignmentOptions: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
            <HeaderCell headerType="text" title="Left Aligned (Default)" align="left" />
            <HeaderCell headerType="text" title="Center Aligned" align="center" />
            <HeaderCell headerType="text" title="Right Aligned" align="right" />
        </div>
    ),
};

// Complex Table Example
export const ComplexTableExample: Story = {
    render: function ComplexTableExampleStory() {
        const [sortField, setSortField] = useState<string | null>(null);
        const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
        const [selectedRows, setSelectedRows] = useState<number[]>([]);

        const handleSort = (field: string) => (direction: 'asc' | 'desc' | null) => {
            setSortField(direction ? field : null);
            setSortDirection(direction);
        };

        const handleSelectAll = (selected: boolean) => {
            if (selected) {
                setSelectedRows([1, 2, 3, 4, 5]);
            } else {
                setSelectedRows([]);
            }
        };

        const handleSelectRow = (rowId: number, selected: boolean) => {
            if (selected) {
                setSelectedRows(prev => [...prev, rowId]);
            } else {
                setSelectedRows(prev => prev.filter(id => id !== rowId));
            }
        };

        const allSelected = selectedRows.length === 5;
        const someSelected = selectedRows.length > 0 && selectedRows.length < 5;

        const data = [
            { id: 1, name: 'Product A', price: 19.99, quantity: 42, status: 'In Stock' },
            { id: 2, name: 'Product B', price: 29.99, quantity: 0, status: 'Out of Stock' },
            { id: 3, name: 'Product C', price: 9.99, quantity: 13, status: 'In Stock' },
            { id: 4, name: 'Product D', price: 49.99, quantity: 5, status: 'Low Stock' },
            { id: 5, name: 'Product E', price: 15.99, quantity: 28, status: 'In Stock' },
        ];

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '800px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    overflow: 'hidden',
                }}
            >
                <div style={{ display: 'flex', backgroundColor: '#f5f5f5' }}>
                    <HeaderCell
                        headerType="selection"
                        allSelected={allSelected}
                        someSelected={someSelected}
                        onSelectionChange={handleSelectAll}
                        style={{ width: '60px' }}
                    />
                    <HeaderCell
                        headerType="text"
                        title="Product Name"
                        sortable={true}
                        sortDirection={sortField === 'name' ? sortDirection : null}
                        onSortChange={handleSort('name')}
                        style={{ flex: 2 }}
                    />
                    <HeaderCell
                        headerType="text"
                        title="Price"
                        sortable={true}
                        sortDirection={sortField === 'price' ? sortDirection : null}
                        onSortChange={handleSort('price')}
                        style={{ flex: 1 }}
                        align="right"
                    />
                    <HeaderCell
                        headerType="text"
                        title="Quantity"
                        sortable={true}
                        sortDirection={sortField === 'quantity' ? sortDirection : null}
                        onSortChange={handleSort('quantity')}
                        style={{ flex: 1 }}
                        align="right"
                    />
                    <HeaderCell
                        headerType="text"
                        title="Status"
                        sortable={true}
                        sortDirection={sortField === 'status' ? sortDirection : null}
                        onSortChange={handleSort('status')}
                        style={{ flex: 1 }}
                    />
                    <HeaderCell headerType="spacer" style={{ width: '100px' }} />
                </div>

                {data.map(item => (
                    <div key={item.id} style={{ display: 'flex' }}>
                        <TableCell
                            contentType="checkbox"
                            checked={selectedRows.includes(item.id)}
                            onCheckChange={checked => handleSelectRow(item.id, checked)}
                            showStripes={true}
                            showDivider={true}
                            style={{ width: '60px' }}
                        />
                        <TableCell
                            contentType="text"
                            title={item.name}
                            showStripes={true}
                            showDivider={true}
                            style={{ flex: 2 }}
                        />
                        <TableCell
                            contentType="number"
                            value={item.price}
                            formatOptions={{ style: 'currency', currency: 'USD' }}
                            showStripes={true}
                            showDivider={true}
                            style={{ flex: 1 }}
                        />
                        <TableCell
                            contentType="number"
                            value={item.quantity}
                            showStripes={true}
                            showDivider={true}
                            style={{ flex: 1 }}
                        />
                        <TableCell
                            contentType="text"
                            title={item.status}
                            showStripes={true}
                            showDivider={true}
                            style={{ flex: 1 }}
                        />
                        <TableCell
                            contentType="action"
                            label="View"
                            onClick={() => alert(`View item ${item.id}`)}
                            showStripes={true}
                            showDivider={true}
                            style={{ width: '100px' }}
                        />
                    </div>
                ))}
            </div>
        );
    },
};
