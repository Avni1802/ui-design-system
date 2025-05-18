import '../../styles/main.css';
import { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';
import { useState } from 'react';
import { Link } from '../Link';
import { CopyOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

const meta: Meta<typeof Table> = {
    title: 'Components/Table',
    component: Table,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        density: {
            control: 'select',
            options: ['expanded', 'compact'],
            description: 'The density of the table',
        },
        showStripes: {
            control: 'boolean',
            description: 'Whether to show striped rows',
        },
        showDividers: {
            control: 'boolean',
            description: 'Whether to show dividers between rows',
        },
        bordered: {
            control: 'boolean',
            description: 'Whether to show a border around the table',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Table>;

// Sample data
const sampleData = [
    { id: 1, name: 'Product A', category: 'Electronics', price: 299.99, stock: 25 },
    { id: 2, name: 'Product B', category: 'Home & Kitchen', price: 49.95, stock: 152 },
    { id: 3, name: 'Product C', category: 'Electronics', price: 599.99, stock: 5 },
    { id: 4, name: 'Product D', category: 'Clothing', price: 29.99, stock: 78 },
    { id: 5, name: 'Product E', category: 'Books', price: 14.95, stock: 240 },
];

// Basic Table
export const Basic: Story = {
    args: {
        columns: [
            { id: 'id', title: 'ID', width: '80px', contentType: 'number' },
            { id: 'name', title: 'Name', contentType: 'text' },
            { id: 'category', title: 'Category', contentType: 'text' },
            { id: 'price', title: 'Price', contentType: 'number', width: '120px' },
            { id: 'stock', title: 'Stock', contentType: 'number', width: '100px' },
        ],
        data: sampleData,
        density: 'expanded',
        showStripes: false,
        showDividers: true,
        bordered: false,
    },
};

// Table with selection
export const WithSelection: Story = {
    render: function RenderWithSelection() {
        const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

        return (
            <div>
                <Table
                    columns={[
                        {
                            id: 'selection',
                            headerType: 'selection',
                            contentType: 'checkbox',
                            width: '60px',
                        },
                        { id: 'id', title: 'ID', width: '80px', contentType: 'number' },
                        { id: 'name', title: 'Name', contentType: 'text' },
                        { id: 'category', title: 'Category', contentType: 'text' },
                        { id: 'price', title: 'Price', contentType: 'number', width: '120px' },
                    ]}
                    data={sampleData}
                    selectedRows={selectedRows}
                    onRowSelectionChange={setSelectedRows}
                    bordered={true}
                />
                <div style={{ marginTop: '16px' }}>
                    Selected rows:{' '}
                    {Array.from(selectedRows)
                        .map(index => sampleData[index].id)
                        .join(', ')}
                </div>
            </div>
        );
    },
};

// Table with sorting
export const WithSorting: Story = {
    render: function RenderWithSorting() {
        const [sortColumn, setSortColumn] = useState<string | undefined>(undefined);
        const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
        const [data, setData] = useState([...sampleData]);

        const handleSortChange = (columnId: string, direction: 'asc' | 'desc' | null) => {
            setSortColumn(columnId);
            setSortDirection(direction);

            if (!direction) {
                setData([...sampleData]); // Reset to original order
                return;
            }

            const sortedData = [...data].sort((a, b) => {
                if (a[columnId as keyof typeof a] === b[columnId as keyof typeof b]) return 0;

                const compareResult =
                    a[columnId as keyof typeof a] < b[columnId as keyof typeof b] ? -1 : 1;
                return direction === 'asc' ? compareResult : -compareResult;
            });
            setData(sortedData);
        };

        return (
            <Table
                columns={[
                    { id: 'id', title: 'ID', width: '80px', contentType: 'number', sortable: true },
                    { id: 'name', title: 'Name', contentType: 'text', sortable: true },
                    { id: 'category', title: 'Category', contentType: 'text', sortable: true },
                    {
                        id: 'price',
                        title: 'Price',
                        contentType: 'number',
                        width: '120px',
                        sortable: true,
                    },
                    {
                        id: 'stock',
                        title: 'Stock',
                        contentType: 'number',
                        width: '100px',
                        sortable: true,
                    },
                ]}
                data={data}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSortChange={handleSortChange}
                showStripes={true}
            />
        );
    },
};

// Table with custom cell rendering
export const WithCustomCells: Story = {
    render: function RenderWithCustomCells() {
        return (
            <Table
                columns={[
                    { id: 'id', title: 'ID', width: '80px', contentType: 'number' },
                    {
                        id: 'name',
                        title: 'Name',
                        contentType: 'text',
                        renderCell: row => (
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontWeight: 'bold' }}>{row.name}</span>
                                <span style={{ fontSize: '12px', color: '#666' }}>
                                    {row.category}
                                </span>
                            </div>
                        ),
                    },
                    {
                        id: 'price',
                        title: 'Price',
                        contentType: 'number',
                        width: '120px',
                        renderCell: row => (
                            <div
                                style={{
                                    fontWeight: row.price > 100 ? 'bold' : 'normal',
                                    color: row.price > 100 ? '#2563eb' : 'inherit',
                                }}
                            >
                                ${row.price.toFixed(2)}
                            </div>
                        ),
                    },
                    {
                        id: 'stock',
                        title: 'Stock',
                        width: '100px',
                        renderCell: row => {
                            const stockLevel =
                                row.stock <= 10 ? 'low' : row.stock <= 50 ? 'medium' : 'high';
                            const colors = {
                                low: '#ef4444',
                                medium: '#f59e0b',
                                high: '#10b981',
                            };

                            return (
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: '12px',
                                            height: '12px',
                                            borderRadius: '50%',
                                            backgroundColor: colors[stockLevel],
                                        }}
                                    />
                                    <span>{row.stock} units</span>
                                </div>
                            );
                        },
                    },
                    {
                        id: 'actions',
                        title: 'Actions',
                        width: '150px',
                        renderCell: () => (
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <Link
                                    href="::"
                                    label="Copy"
                                    showLeading
                                    iconLeading={<CopyOutlined />}
                                />
                                <Link
                                    href="::"
                                    label="Edit"
                                    showLeading
                                    iconLeading={<EditOutlined />}
                                />
                                <Link
                                    href="::"
                                    label="Delete"
                                    showLeading
                                    iconLeading={<DeleteOutlined />}
                                />
                            </div>
                        ),
                    },
                ]}
                data={sampleData}
                density="expanded"
                bordered={true}
            />
        );
    },
};

// Table with different densities
export const Densities: Story = {
    render: function RenderDensities() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div>
                    <h3>Expanded Density</h3>
                    <Table
                        columns={[
                            { id: 'id', title: 'ID', width: '80px', contentType: 'number' },
                            { id: 'name', title: 'Name', contentType: 'text' },
                            { id: 'category', title: 'Category', contentType: 'text' },
                            { id: 'price', title: 'Price', contentType: 'number', width: '120px' },
                        ]}
                        data={sampleData.slice(0, 3)}
                        density="expanded"
                        bordered={true}
                    />
                </div>

                <div>
                    <h3>Compact Density</h3>
                    <Table
                        columns={[
                            { id: 'id', title: 'ID', width: '80px', contentType: 'number' },
                            { id: 'name', title: 'Name', contentType: 'text' },
                            { id: 'category', title: 'Category', contentType: 'text' },
                            { id: 'price', title: 'Price', contentType: 'number', width: '120px' },
                        ]}
                        data={sampleData.slice(0, 3)}
                        density="compact"
                        bordered={true}
                    />
                </div>
            </div>
        );
    },
};

// Table with all features
export const CompleteExample: Story = {
    render: function RenderCompleteExample() {
        const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
        const [sortColumn, setSortColumn] = useState<string>('id');
        const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>('asc');
        const [data, setData] = useState([...sampleData]);

        const handleSortChange = (columnId: string, direction: 'asc' | 'desc' | null) => {
            setSortColumn(columnId);
            setSortDirection(direction);

            if (!direction) {
                setData([...sampleData]); // Reset to original order
                return;
            }

            const sortedData = [...sampleData].sort((a, b) => {
                if (a[columnId as keyof typeof a] === b[columnId as keyof typeof b]) return 0;

                const compareResult =
                    a[columnId as keyof typeof a] < b[columnId as keyof typeof b] ? -1 : 1;
                return direction === 'asc' ? compareResult : -compareResult;
            });

            setData(sortedData);
        };

        return (
            <div>
                <Table
                    columns={[
                        {
                            id: 'selection',
                            headerType: 'selection',
                            contentType: 'checkbox',
                            width: '60px',
                        },
                        {
                            id: 'id',
                            title: 'ID',
                            width: '80px',
                            contentType: 'number',
                            sortable: true,
                        },
                        { id: 'name', title: 'Name', contentType: 'text', sortable: true },
                        { id: 'category', title: 'Category', contentType: 'text', sortable: true },
                        {
                            id: 'price',
                            title: 'Price',
                            contentType: 'number',
                            width: '120px',
                            sortable: true,
                            renderCell: row => (
                                <div style={{ fontWeight: 'bold' }}>${row.price.toFixed(2)}</div>
                            ),
                        },
                        {
                            id: 'actions',
                            title: 'Actions',
                            width: '150px',
                            renderCell: () => (
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <Link
                                        href="::"
                                        label="Copy"
                                        showLeading
                                        iconLeading={<CopyOutlined />}
                                    />
                                    <Link
                                        href="::"
                                        label="Edit"
                                        showLeading
                                        iconLeading={<EditOutlined />}
                                    />
                                    <Link
                                        href="::"
                                        label="Delete"
                                        showLeading
                                        iconLeading={<DeleteOutlined />}
                                    />
                                </div>
                            ),
                        },
                    ]}
                    data={data}
                    selectedRows={selectedRows}
                    onRowSelectionChange={setSelectedRows}
                    sortColumn={sortColumn}
                    sortDirection={sortDirection}
                    onSortChange={handleSortChange}
                    density="expanded"
                    showStripes={true}
                    bordered={true}
                />
                <div style={{ marginTop: '16px' }}>
                    Selected rows:{' '}
                    {Array.from(selectedRows)
                        .map(index => data[index].id)
                        .join(', ')}
                </div>
            </div>
        );
    },
};
