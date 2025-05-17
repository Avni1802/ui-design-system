import '../../styles/main.css';

import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
    title: 'Components/Input',
    component: Input,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'description', 'select', 'password'],
            description: 'The variant of the input',
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'The size of the input',
        },
        label: {
            control: 'text',
            description: 'Label text for the input',
        },
        labelSize: {
            control: 'select',
            options: ['default', 'small'],
            description: 'Size of the label text',
        },
        helpText: {
            control: 'text',
            description: 'Help text displayed below the input',
        },
        helpTextType: {
            control: 'select',
            options: ['default', 'danger', 'success', 'warning', 'primary'],
            description: 'Help text displayed below the input',
        },
        error: {
            control: 'boolean',
            description: 'Whether the input has an error',
        },
        errorMessage: {
            control: 'text',
            description: 'Error message to display when error is true',
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the input is disabled',
        },
        fullWidth: {
            control: 'boolean',
            description: 'Whether the input takes up full width',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Input>;

// Default Input
export const Default: Story = {
    args: {
        label: 'Username',
        placeholder: 'Enter your username',
        helpText: 'Your username should be at least 4 characters',
    },
};

// Input with Error
export const WithError: Story = {
    args: {
        label: 'Email',
        placeholder: 'Enter your email',
        error: true,
        errorMessage: 'Please enter a valid email address',
        value: 'invalid-email',
    },
};

// Input with Icons
export const WithIcons: Story = {
    args: {
        label: 'Search',
        placeholder: 'Search...',
        leadingIcon: (
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
        ),
        trailingIcon: (
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
        ),
    },
};

// Password Input
const PasswordInput = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Input
            variant="password"
            label="Password"
            placeholder="Enter your password"
            type={showPassword ? 'text' : 'password'}
            trailingIcon={
                <div onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}>
                    {showPassword ? (
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
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                        </svg>
                    ) : (
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
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    )}
                </div>
            }
        />
    );
};

export const Password: Story = {
    render: () => <PasswordInput />,
};

// Textarea (Description)
export const Textarea: Story = {
    args: {
        variant: 'description',
        label: 'Description',
        placeholder: 'Enter a description...',
        rows: 4,
    },
};

// Select Dropdown
export const Select: Story = {
    args: {
        variant: 'select',
        label: 'Country',
        options: [
            { value: '', label: 'Select a country' },
            { value: 'us', label: 'United States' },
            { value: 'ca', label: 'Canada' },
            { value: 'uk', label: 'United Kingdom' },
            { value: 'au', label: 'Australia' },
        ],
    },
};

// Different Sizes
export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Input size="sm" label="Default Input" labelSize="default" placeholder="Small input" />
            <Input size="md" label="Small Input" labelSize="small" placeholder="Medium input" />
        </div>
    ),
};

// Disabled State
export const Disabled: Story = {
    args: {
        label: 'Disabled Input',
        placeholder: 'You cannot edit this field',
        disabled: true,
        value: 'Disabled content',
    },
};

// Form Example
export const FormExample: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
            <Input label="Full Name" placeholder="Enter your full name" />
            <Input
                label="Email Address"
                placeholder="Enter your email"
                type="email"
                leadingIcon={
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
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                }
            />
            <Input variant="password" label="Password" placeholder="Enter your password" />
            <Input
                variant="select"
                label="Role"
                options={[
                    { value: '', label: 'Select your role' },
                    { value: 'developer', label: 'Developer' },
                    { value: 'designer', label: 'Designer' },
                    { value: 'manager', label: 'Manager' },
                ]}
            />
            <Input
                variant="description"
                label="Bio"
                placeholder="Tell us about yourself..."
                rows={3}
            />
        </div>
    ),
};
