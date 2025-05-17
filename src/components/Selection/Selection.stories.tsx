import '../../styles/main.css';
import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Selection } from './Selection';

const meta: Meta<typeof Selection> = {
    title: 'Components/Selection-1',
    component: Selection,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'radio',
            options: ['checkbox', 'radio'],
            description: 'The type of selection control',
        },
        size: {
            control: 'radio',
            options: ['sm', 'md', 'lg'],
            description: 'The size of the selection control',
        },
        label: {
            control: 'text',
            description: 'Label text for the selection control',
        },
        helpText: {
            control: 'text',
            description: 'Help text displayed below the label',
        },
        isChecked: {
            control: 'boolean',
            description: 'Whether the selection control is checked',
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the selection control is disabled',
        },
        intermediate: {
            control: 'boolean',
            description:
                'Whether the checkbox is in an intermediate state (only applies to checkboxes)',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Selection>;

// Basic Checkbox
export const BasicCheckbox: Story = {
    args: {
        type: 'checkbox',
        label: 'Accept terms and conditions',
        helpText: 'You must accept the terms to continue',
        isChecked: false,
        disabled: false,
    },
    render: args => {
        const RenderComponent = () => {
            const [isChecked, setIsChecked] = useState(args.isChecked || false);
            return (
                <Selection
                    {...args}
                    isChecked={isChecked}
                    onChange={checked => setIsChecked(checked.target.checked)}
                />
            );
        };
        return <RenderComponent />;
    },
};

// Basic Radio
export const BasicRadio: Story = {
    args: {
        type: 'radio',
        label: 'Select this option',
        helpText: 'This is a single radio button',
        isChecked: false,
        disabled: false,
        name: 'single-radio',
        value: 'option1',
    },
    render: args => {
        const RenderComponent = () => {
            const [isChecked, setIsChecked] = useState(args.isChecked || false);
            return (
                <Selection
                    {...args}
                    isChecked={isChecked}
                    onChange={event => setIsChecked(event.target.checked)}
                />
            );
        };
        return <RenderComponent />;
    },
};

// Checkbox Sizes
export const CheckboxSizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Selection type="checkbox" label="Small Checkbox" size="sm" />
            <Selection type="checkbox" label="Medium Checkbox (Default)" size="md" />
            <Selection type="checkbox" label="Large Checkbox" size="lg" />
        </div>
    ),
};

// Radio Sizes
export const RadioSizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Selection
                type="radio"
                label="Small Radio"
                size="sm"
                name="radio-sizes"
                value="small"
            />
            <Selection
                type="radio"
                label="Medium Radio (Default)"
                size="md"
                name="radio-sizes"
                value="medium"
            />
            <Selection
                type="radio"
                label="Large Radio"
                size="lg"
                name="radio-sizes"
                value="large"
            />
        </div>
    ),
};

// Checkbox States
export const CheckboxStates: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Selection type="checkbox" label="Unchecked" isChecked={false} />
            <Selection type="checkbox" label="Checked" isChecked={true} />
            <Selection type="checkbox" label="Intermediate" intermediate={true} />
            <Selection type="checkbox" label="Disabled Unchecked" disabled={true} />
            <Selection type="checkbox" label="Disabled Checked" isChecked={true} disabled={true} />
            <Selection
                type="checkbox"
                label="Disabled Intermediate"
                intermediate={true}
                disabled={true}
            />
        </div>
    ),
};

// Radio States
export const RadioStates: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Selection
                type="radio"
                label="Unchecked"
                isChecked={false}
                name="radio-states"
                value="unchecked"
            />
            <Selection
                type="radio"
                label="Checked"
                isChecked={true}
                name="radio-states"
                value="checked"
            />
            <Selection
                type="radio"
                label="Disabled Unchecked"
                disabled={true}
                name="radio-states"
                value="disabled-unchecked"
            />
            <Selection
                type="radio"
                label="Disabled Checked"
                isChecked={true}
                disabled={true}
                name="radio-states"
                value="disabled-checked"
            />
        </div>
    ),
};

// With Help Text
export const WithHelpText: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Selection
                type="checkbox"
                label="Checkbox with help text"
                helpText="This is some additional information about this option"
            />
            <Selection
                type="radio"
                label="Radio with help text"
                helpText="This is some additional information about this option"
                name="help-text"
                value="radio-help"
            />
        </div>
    ),
};

// Interactive Checkbox
const InteractiveCheckboxComponent = () => {
    const [isChecked, setIsChecked] = useState(false);
    return (
        <Selection
            type="checkbox"
            label={`Checkbox is ${isChecked ? 'checked' : 'unchecked'}`}
            helpText="Click to toggle"
            isChecked={isChecked}
            onChange={event => setIsChecked(event.target.checked)}
        />
    );
};

export const InteractiveCheckbox: Story = {
    render: () => <InteractiveCheckboxComponent />,
};

// Interactive Radio Group
const InteractiveRadioGroupComponent = () => {
    const [selectedValue, setSelectedValue] = useState('');
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>Selected value: {selectedValue || 'none'}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Selection
                    type="radio"
                    label="Option 1"
                    name="interactive-radio"
                    value="option1"
                    isChecked={selectedValue === 'option1'}
                    onChange={() => setSelectedValue('option1')}
                />
                <Selection
                    type="radio"
                    label="Option 2"
                    name="interactive-radio"
                    value="option2"
                    isChecked={selectedValue === 'option2'}
                    onChange={() => setSelectedValue('option2')}
                />
                <Selection
                    type="radio"
                    label="Option 3"
                    name="interactive-radio"
                    value="option3"
                    isChecked={selectedValue === 'option3'}
                    onChange={() => setSelectedValue('option3')}
                />
            </div>
        </div>
    );
};

export const InteractiveRadioGroup: Story = {
    render: () => <InteractiveRadioGroupComponent />,
};
