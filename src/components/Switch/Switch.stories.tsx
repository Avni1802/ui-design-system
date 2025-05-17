import '../../styles/main.css';
import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
    title: 'Components/Switch',
    component: Switch,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'radio',
            options: ['regular', 'small', 'large'],
            description: 'The size of the switch control',
        },
        label: {
            control: 'text',
            description: 'Label text for the switch control',
        },
        helpText: {
            control: 'text',
            description: 'Help text displayed below the label',
        },
        isChecked: {
            control: 'boolean',
            description: 'Whether the switch control is checked',
        },
        isDisabled: {
            control: 'boolean',
            description: 'Whether the switch control is disabled',
        },
        iconOnly: {
            control: 'boolean',
            description: 'Whether to show only the switch without label',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Switch>;

// Basic Switch
export const BasicSwitch: Story = {
    args: {
        label: 'Enable notifications',
        helpText: 'You will receive notifications for important updates',
        isChecked: false,
        isDisabled: false,
        size: 'regular',
    },
    render: args => {
        const RenderComponent = () => {
            const [isChecked, setIsChecked] = useState(args.isChecked || false);
            return (
                <Switch
                    {...args}
                    isChecked={isChecked}
                    onChange={event => setIsChecked(event.target.checked)}
                />
            );
        };
        return <RenderComponent />;
    },
};

// Switch Sizes
export const SwitchSizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Switch label="Large Switch" size="small" />
            <Switch label="Regular Switch (Default)" size="regular" />
            <Switch label="Large Switch" size="large" />
        </div>
    ),
};

// Switch States
export const SwitchStates: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Switch label="Off" isChecked={false} />
            <Switch label="On" isChecked={true} />
            <Switch label="Disabled Off" isDisabled={true} />
            <Switch label="Disabled On" isChecked={true} isDisabled={true} />
        </div>
    ),
};

// Icon Only Switches
export const IconOnlySwitches: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Switch iconOnly={true} size="small" />
            <Switch iconOnly={true} size="regular" />
            <Switch iconOnly={true} size="large" />
            <Switch iconOnly={true} isChecked={true} size="small" />
            <Switch iconOnly={true} isChecked={true} size="regular" />
            <Switch iconOnly={true} isChecked={true} size="large" />
        </div>
    ),
};

// With Help Text
export const WithHelpText: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Switch
                label="Switch with help text"
                helpText="This is some additional information about this option"
            />
        </div>
    ),
};

// Interactive Switch
const InteractiveSwitchComponent = () => {
    const [isChecked, setIsChecked] = useState(false);
    return (
        <Switch
            label={`Switch is ${isChecked ? 'on' : 'off'}`}
            helpText="Click to toggle"
            isChecked={isChecked}
            onChange={event => setIsChecked(event.target.checked)}
        />
    );
};

export const InteractiveSwitch: Story = {
    render: () => <InteractiveSwitchComponent />,
};
