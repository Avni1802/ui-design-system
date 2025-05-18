import '../../styles/main.css';

import { Meta, StoryObj } from '@storybook/react';
import { TableCell } from './TableCell';
import { useState } from 'react';
import { Link } from '../Link';
import { CopyOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

const meta: Meta<typeof TableCell> = {
    title: 'Components/TableCell',
    component: TableCell,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        // Common props
        contentType: {
            control: 'select',
            options: ['text', 'number', 'checkbox', 'action'],
            description: 'The type of content displayed in the cell',
            table: {
                category: 'General',
            },
        },
        density: {
            control: 'select',
            options: ['expanded', 'compact'],
            description: 'The density of the table cell',
            table: {
                category: 'General',
            },
        },
        isSelected: {
            control: 'boolean',
            description: 'Whether the cell is selected',
            table: {
                category: 'General',
            },
        },
        showStripes: {
            control: 'boolean',
            description: 'Whether to show striped background',
            table: {
                category: 'General',
            },
        },
        showDivider: {
            control: 'boolean',
            description: 'Whether to show divider between rows',
            table: {
                category: 'General',
            },
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the cell is disabled (for action/checkbox)',
            table: {
                category: 'General',
            },
        },

        // Text content type props
        title: {
            control: 'text',
            description: 'The main text to display (for text content type)',
            table: {
                category: 'Text Content',
                type: { summary: 'string' },
            },
            if: { arg: 'contentType', eq: 'text' },
        },
        description: {
            control: 'text',
            description: 'The secondary text to display (for text content type)',
            table: {
                category: 'Text Content',
                type: { summary: 'string' },
            },
            if: { arg: 'contentType', eq: 'text' },
        },

        // Number content type props
        value: {
            control: 'number',
            description: 'The numeric value to display (for number content type)',
            table: {
                category: 'Number Content',
                type: { summary: 'number' },
            },
            if: { arg: 'contentType', eq: 'number' },
        },
        formatOptions: {
            control: 'object',
            description: 'Formatting options for the number (for number content type)',
            table: {
                category: 'Number Content',
                type: { summary: 'Intl.NumberFormatOptions' },
                defaultValue: { summary: 'undefined' },
            },
            if: { arg: 'contentType', eq: 'number' },
        },

        // Checkbox content type props
        checked: {
            control: 'boolean',
            description: 'Whether the checkbox is checked (for checkbox content type)',
            table: {
                category: 'Checkbox Content',
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
            if: { arg: 'contentType', eq: 'checkbox' },
        },
        onCheckChange: {
            action: 'checkChanged',
            description: 'Callback when checkbox state changes (for checkbox content type)',
            table: {
                category: 'Checkbox Content',
                type: { summary: '(checked: boolean) => void' },
            },
            if: { arg: 'contentType', eq: 'checkbox' },
        },

        // Action content type props
        label: {
            control: 'text',
            description: 'The text for the action button/link (for action content type)',
            table: {
                category: 'Action Content',
                type: { summary: 'string' },
            },
            if: { arg: 'contentType', eq: 'action' },
        },
        onClick: {
            action: 'clicked',
            description: 'Callback when action is clicked (for action content type)',
            table: {
                category: 'Action Content',
                type: { summary: '() => void' },
            },
            if: { arg: 'contentType', eq: 'action' },
        },
    },
};

export default meta;
type Story = StoryObj<typeof TableCell>;

// Default TableCell
export const Default: Story = {
    args: {
        contentType: 'text',
        density: 'expanded',
        title: 'Row title',
        description: 'Description',
    },
};

// Content Type Variants
export const ContentTypes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
            <TableCell contentType="text" title="Text content" description="With description" />
            <TableCell contentType="number" value={12345.67} />
            <TableCell
                contentType="number"
                value={9876.54}
                formatOptions={{ style: 'currency', currency: 'USD' }}
            />
            <TableCell
                contentType="checkbox"
                checked={true}
                onCheckChange={checked => console.log(checked)}
            />
            <TableCell
                contentType="action"
                label="View details"
                onClick={() => alert('Action clicked')}
            />
        </div>
    ),
};

// Density Variants
export const Densities: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
            <TableCell contentType="text" density="expanded" title="Expanded density" />
            <TableCell contentType="text" density="compact" title="Compact density" />
        </div>
    ),
};

// Selection State
export const Selection: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
            <TableCell contentType="text" title="Normal cell" />
            <TableCell contentType="text" title="Selected cell" isSelected={true} />
        </div>
    ),
};

// Stripes and Dividers
export const StripesAndDividers: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <TableCell contentType="text" title="Row 1" showStripes={true} showDivider={true} />
            <TableCell contentType="text" title="Row 2" showStripes={true} showDivider={true} />
            <TableCell contentType="text" title="Row 3" showStripes={true} showDivider={true} />
            <TableCell contentType="text" title="Row 4" showStripes={true} showDivider={true} />
        </div>
    ),
};

// Table Cell in a Table Context
export const TableExample: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '500px',
                border: '1px solid #ccc',
            }}
        >
            <div style={{ display: 'flex', fontWeight: 'bold', borderBottom: '2px solid #ccc' }}>
                <TableCell contentType="text" title="Select" style={{ width: '80px' }} />
                <TableCell contentType="text" title="Name" style={{ flex: 2 }} />
                <TableCell contentType="text" title="Amount" style={{ flex: 1 }} />
                <TableCell contentType="text" title="Actions" style={{ width: '100px' }} />
            </div>

            {[1, 2, 3, 4].map(row => (
                <div key={row} style={{ display: 'flex' }}>
                    <TableCell
                        contentType="checkbox"
                        checked={row % 2 === 0}
                        onCheckChange={() => {}}
                        showStripes={true}
                        showDivider={true}
                        style={{ width: '80px' }}
                    />
                    <TableCell
                        contentType="text"
                        title={`Item ${row}`}
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
    ),
};

// Disabled State
export const DisabledState: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
            <TableCell contentType="checkbox" checked={true} disabled={true} />
            <TableCell contentType="action" label="Disabled action" disabled={true} />
        </div>
    ),
};

// Interactive Checkbox
export const InteractiveCheckbox: Story = {
    render: function InteractiveCheckboxStory() {
        const [checked, setChecked] = useState(false);
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
                <TableCell contentType="checkbox" checked={checked} onCheckChange={setChecked} />
                <div>Checkbox is {checked ? 'checked' : 'unchecked'}</div>
            </div>
        );
    },
};

// Number Formatting
export const NumberFormatting: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
            <TableCell contentType="number" value={1234.56} />
            <TableCell
                contentType="number"
                value={1234.56}
                formatOptions={{ style: 'currency', currency: 'USD' }}
            />
            <TableCell contentType="number" value={0.8756} formatOptions={{ style: 'percent' }} />
            <TableCell
                contentType="number"
                value={1234567.89}
                formatOptions={{ notation: 'compact' }}
            />
        </div>
    ),
};

// Action Links
export const ActionLinks: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
            <TableCell
                contentType="action"
                label="Link action"
                onClick={() => alert('Link clicked')}
            >
                <Link href="::" label="Copy" showLeading iconLeading={<CopyOutlined />} />
                <Link href="::" label="Edit" showLeading iconLeading={<EditOutlined />} />
                <Link href="::" label="Delete" showLeading iconLeading={<DeleteOutlined />} />
            </TableCell>
        </div>
    ),
};
