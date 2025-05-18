import '../../styles/main.css';

import { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { ArrowRightOutlined, CloseOutlined, HomeOutlined, PlusOutlined } from '@ant-design/icons';

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'tertiary', 'inverse'],
            description: 'The visual style of the button',
        },
        color: {
            control: 'select',
            options: ['primary', 'black', 'white'],
            description: 'The color scheme of the button',
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'The size of the button',
        },
        isFullWidth: {
            control: 'boolean',
            description: 'Whether the button takes up full width',
        },
        iconOnly: {
            control: 'boolean',
            description: 'Whether the button only displays an icon',
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the button is disabled',
        },
        isLoading: {
            control: 'boolean',
            description: 'Whether the button is in a loading state',
        },
        label: {
            control: 'text',
            description: 'Text to display on the button',
        },
        showLeading: {
            control: 'boolean',
            description: 'Whether to show the leading icon',
        },
        showTrailing: {
            control: 'boolean',
            description: 'Whether to show the trailing icon',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Default Button
export const Default: Story = {
    args: {
        label: 'Button',
        variant: 'primary',
        color: 'primary',
        size: 'md',
    },
};

// Button Variants
export const Variants: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '16px' }}>
            <Button variant="primary" label="Primary" />
            <Button variant="secondary" label="Secondary" />
            <Button variant="tertiary" label="Tertiary" />
            <Button variant="inverse" label="Inverse" />
        </div>
    ),
};

// Button Colors
export const Colors: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '16px' }}>
            <Button color="primary" label="Primary Color" />
            <Button color="black" label="Black Color" />
            <Button color="white" label="White Color" style={{ background: '#333' }} />
        </div>
    ),
};

// Button Sizes
export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Button size="sm" label="Small" />
            <Button size="md" label="Medium" />
            <Button size="lg" label="Large" />
        </div>
    ),
};

// Icon Buttons
export const WithIcons: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '16px' }}>
            <Button label="Leading Icon" showLeading={true} iconLeading={<PlusOutlined />} />
            <Button
                label="Trailing Icon"
                showTrailing={true}
                iconTrailing={<ArrowRightOutlined />}
            />
            <Button
                label="Both Icons"
                showLeading={true}
                showTrailing={true}
                iconLeading={<PlusOutlined />}
                iconTrailing={<ArrowRightOutlined />}
            />
        </div>
    ),
};

// Icon Only Buttons
export const IconOnly: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '16px' }}>
            <Button iconOnly={true} icon={<HomeOutlined />} aria-label="Search" />
            <Button variant="secondary" iconOnly={true} icon={<HomeOutlined />} aria-label="Home" />
            <Button
                variant="tertiary"
                iconOnly={true}
                icon={<CloseOutlined />}
                aria-label="Close"
            />
        </div>
    ),
};

// Button States
export const States: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '16px' }}>
            <Button label="Default" />
            <Button label="Disabled" disabled={true} />
            <Button label="Loading" isLoading={true} />
        </div>
    ),
};

// Full Width Button
export const FullWidth: Story = {
    args: {
        label: 'Full Width Button',
        isFullWidth: true,
    },
    parameters: {
        layout: 'padded',
    },
};

// Button Group Example
export const ButtonGroup: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
                <Button variant="primary" label="Save" />
                <Button variant="secondary" label="Cancel" />
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between' }}>
                <Button variant="tertiary" label="Back" />
                <Button variant="primary" label="Next" />
            </div>
            <Button isFullWidth={true} label="Submit Form" />
        </div>
    ),
};
