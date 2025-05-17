import '../../styles/main.css';

import { Meta, StoryObj } from '@storybook/react';
import { Button } from './Card';

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
            <Button
                label="Leading Icon"
                showLeading={true}
                iconLeading={
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                }
            />
            <Button
                label="Trailing Icon"
                showTrailing={true}
                iconTrailing={
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                }
            />
            <Button
                label="Both Icons"
                showLeading={true}
                showTrailing={true}
                iconLeading={
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                }
                iconTrailing={
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                }
            />
        </div>
    ),
};

// Icon Only Buttons
export const IconOnly: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '16px' }}>
            <Button
                iconOnly={true}
                icon={
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                }
                aria-label="Search"
            />
            <Button
                variant="secondary"
                iconOnly={true}
                icon={
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                }
                aria-label="Home"
            />
            <Button
                variant="tertiary"
                iconOnly={true}
                icon={
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                }
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
