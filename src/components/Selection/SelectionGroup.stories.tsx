import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { SelectionGroup } from './SelectionGroup';

const meta: Meta<typeof SelectionGroup> = {
    title: 'Components/SelectionGroup-1',
    component: SelectionGroup,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'radio',
            options: ['checkbox', 'radio'],
            description: 'The type of selection controls in the group',
        },
        size: {
            control: 'radio',
            options: ['sm', 'md', 'lg'],
            description: 'The size of the selection controls',
        },
        direction: {
            control: 'radio',
            options: ['vertical', 'horizontal'],
            description: 'The layout direction of the group',
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the entire group is disabled',
        },
        options: {
            control: 'object',
            description: 'Array of options for the selection group',
        },
        selectedValues: {
            control: 'object',
            description: 'Array of selected values',
        },
    },
};

export default meta;
type Story = StoryObj<typeof SelectionGroup>;

// Sample options for stories
const checkboxOptions = [
    { id: 'option1', value: 'option1', label: 'Option 1', helpText: 'Description for option 1' },
    { id: 'option2', value: 'option2', label: 'Option 2', helpText: 'Description for option 2' },
    { id: 'option3', value: 'option3', label: 'Option 3', helpText: 'Description for option 3' },
    {
        id: 'option4',
        value: 'option4',
        label: 'Option 4 (Disabled)',
        helpText: 'This option is disabled',
        disabled: true,
    },
];

const radioOptions = [
    { id: 'radio1', value: 'radio1', label: 'Radio 1', helpText: 'Description for radio 1' },
    { id: 'radio2', value: 'radio2', label: 'Radio 2', helpText: 'Description for radio 2' },
    { id: 'radio3', value: 'radio3', label: 'Radio 3', helpText: 'Description for radio 3' },
    {
        id: 'radio4',
        value: 'radio4',
        label: 'Radio 4 (Disabled)',
        helpText: 'This option is disabled',
        disabled: true,
    },
];

// Basic Checkbox Group
export const CheckboxGroup: Story = {
    args: {
        type: 'checkbox',
        options: checkboxOptions,
        selectedValues: ['option1'],
        size: 'md',
        direction: 'vertical',
        disabled: false,
    },
    render: args => <CheckboxGroupWrapper {...args} />,
};

const CheckboxGroupWrapper: React.FC<typeof CheckboxGroup.args> = args => {
    const [selected, setSelected] = useState(args?.selectedValues || []);
    return (
        <div style={{ width: '400px' }}>
            <SelectionGroup
                {...args}
                type={args?.type || 'checkbox'}
                selectedValues={selected}
                onChange={setSelected}
                options={args?.options || []}
            />
            <div style={{ marginTop: '20px' }}>
                <strong>Selected values:</strong> {selected.join(', ') || 'none'}
            </div>
        </div>
    );
};
// Basic Radio Group
export const RadioGroup: Story = {
    args: {
        type: 'radio',
        options: radioOptions,
        selectedValues: ['radio1'],
        size: 'md',
        direction: 'vertical',
        disabled: false,
        name: 'radio-group-story',
    },
    render: function RadioGroupWrapper(args) {
        const [selected, setSelected] = useState(args.selectedValues || []);
        return (
            <div style={{ width: '400px' }}>
                <SelectionGroup {...args} selectedValues={selected} onChange={setSelected} />
                <div style={{ marginTop: '20px' }}>
                    <strong>Selected value:</strong> {selected[0] || 'none'}
                </div>
            </div>
        );
    },
};

// Horizontal Layout
export const HorizontalLayout: Story = {
    render: function HorizontalLayout() {
        const [checkboxValues, setCheckboxValues] = useState<string[]>(['option1']);
        const [radioValue, setRadioValue] = useState<string[]>(['radio1']);

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '600px' }}>
                <div>
                    <h3>Horizontal Checkbox Group</h3>
                    <SelectionGroup
                        type="checkbox"
                        options={checkboxOptions.slice(0, 3)}
                        selectedValues={checkboxValues}
                        onChange={setCheckboxValues}
                        direction="horizontal"
                    />
                    <div style={{ marginTop: '8px' }}>
                        Selected: {checkboxValues.join(', ') || 'none'}
                    </div>
                </div>

                <div>
                    <h3>Horizontal Radio Group</h3>
                    <SelectionGroup
                        type="radio"
                        options={radioOptions.slice(0, 3) || []}
                        selectedValues={radioValue}
                        onChange={setRadioValue}
                        direction="horizontal"
                        name="horizontal-radio"
                    />
                    <div style={{ marginTop: '8px' }}>Selected: {radioValue[0] || 'none'}</div>
                </div>
            </div>
        );
    },
};

// Different Sizes
export const GroupSizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '400px' }}>
            <div>
                <h3>Small Size</h3>
                <SelectionGroup
                    type="checkbox"
                    options={checkboxOptions.slice(0, 3)}
                    selectedValues={['option1']}
                    size="sm"
                />
            </div>

            <div>
                <h3>Medium Size (Default)</h3>
                <SelectionGroup
                    type="checkbox"
                    options={checkboxOptions.slice(0, 3)}
                    selectedValues={['option1']}
                    size="md"
                />
            </div>

            <div>
                <h3>Large Size</h3>
                <SelectionGroup
                    type="checkbox"
                    options={checkboxOptions.slice(0, 3)}
                    selectedValues={['option1']}
                    size="lg"
                />
            </div>
        </div>
    ),
};

// Disabled Group
export const DisabledGroup: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '400px' }}>
            <div>
                <h3>Disabled Checkbox Group</h3>
                <SelectionGroup
                    type="checkbox"
                    options={checkboxOptions.slice(0, 3)}
                    selectedValues={['option1']}
                    disabled={true}
                />
            </div>
            <div>
                <h3>Disabled Radio Group</h3>
                <SelectionGroup
                    type="radio"
                    options={radioOptions.slice(0, 3)}
                    selectedValues={['radio1']}
                    disabled={true}
                    name="disabled-radio"
                />
            </div>
        </div>
    ),
};

// Mixed Enabled/Disabled Options
export const MixedDisabledOptions: Story = {
    render: function MixedDisabledOptions() {
        const [checkboxValues, setCheckboxValues] = useState<string[]>(['option1']);
        const [radioValue, setRadioValue] = useState<string[]>(['radio1']);

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '400px' }}>
                <div>
                    <h3>Checkbox Group with Disabled Option</h3>
                    <SelectionGroup
                        type="checkbox"
                        options={checkboxOptions} // includes a disabled option
                        selectedValues={checkboxValues}
                        onChange={setCheckboxValues}
                    />
                    <div style={{ marginTop: '8px' }}>
                        Selected: {checkboxValues.join(', ') || 'none'}
                    </div>
                </div>

                <div>
                    <h3>Radio Group with Disabled Option</h3>
                    <SelectionGroup
                        type="radio"
                        options={radioOptions} // includes a disabled option
                        selectedValues={radioValue}
                        onChange={setRadioValue}
                        name="mixed-disabled-radio"
                    />
                    <div style={{ marginTop: '8px' }}>Selected: {radioValue[0] || 'none'}</div>
                </div>
            </div>
        );
    },
};

// Form Example
export const FormExample: Story = {
    render: function FormExample() {
        const [formData, setFormData] = useState({
            interests: ['technology'],
            contactPreference: ['email'],
            termsAccepted: ['terms'],
        });

        const handleInterestsChange = (values: string[]) => {
            setFormData(prev => ({ ...prev, interests: values }));
        };

        const handleContactChange = (values: string[]) => {
            setFormData(prev => ({ ...prev, contactPreference: values }));
        };

        const handleTermsChange = (values: string[]) => {
            setFormData(prev => ({ ...prev, termsAccepted: values }));
        };

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            alert(`Form submitted with data: ${JSON.stringify(formData, null, 2)}`);
        };

        return (
            <form
                onSubmit={handleSubmit}
                style={{
                    width: '500px',
                    padding: '20px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                }}
            >
                <div style={{ marginBottom: '24px' }}>
                    <h2 style={{ marginBottom: '16px' }}>Preferences Form</h2>

                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ marginBottom: '8px' }}>What are you interested in?</h3>
                        <SelectionGroup
                            type="checkbox"
                            options={[
                                { id: 'technology', value: 'technology', label: 'Technology' },
                                { id: 'design', value: 'design', label: 'Design' },
                                { id: 'business', value: 'business', label: 'Business' },
                                { id: 'marketing', value: 'marketing', label: 'Marketing' },
                            ]}
                            selectedValues={formData.interests}
                            onChange={handleInterestsChange}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ marginBottom: '8px' }}>How would you like to be contacted?</h3>
                        <SelectionGroup
                            type="radio"
                            name="contact-preference"
                            options={[
                                {
                                    id: 'email',
                                    value: 'email',
                                    label: 'Email',
                                    helpText: "We'll send updates to your email address",
                                },
                                {
                                    id: 'phone',
                                    value: 'phone',
                                    label: 'Phone',
                                    helpText: "We'll call you with updates",
                                },
                                {
                                    id: 'none',
                                    value: 'none',
                                    label: "Don't contact me",
                                    helpText: "You won't receive any updates",
                                },
                            ]}
                            selectedValues={formData.contactPreference}
                            onChange={handleContactChange}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <SelectionGroup
                            type="checkbox"
                            options={[
                                {
                                    id: 'terms',
                                    value: 'terms',
                                    label: 'I accept the terms and conditions',
                                    helpText:
                                        'By checking this box, you agree to our Terms of Service and Privacy Policy',
                                },
                            ]}
                            selectedValues={formData.termsAccepted}
                            onChange={handleTermsChange}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    style={{
                        padding: '8px 16px',
                        backgroundColor: '#0066cc',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                    disabled={formData.termsAccepted.length === 0}
                >
                    Submit
                </button>
            </form>
        );
    },
};

// Controlled vs Uncontrolled
export const ControlledExample: Story = {
    render: function ControlledExample() {
        // Controlled component with state management
        const [selectedValues, setSelectedValues] = useState<string[]>(['option1']);

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
                <div>
                    <h3>Controlled Selection Group</h3>
                    <SelectionGroup
                        type="checkbox"
                        options={checkboxOptions.slice(0, 3)}
                        selectedValues={selectedValues}
                        onChange={values => {
                            console.log('Selection changed:', values);
                            setSelectedValues(values);
                        }}
                    />
                    <div style={{ marginTop: '8px' }}>
                        <strong>Selected values:</strong> {selectedValues.join(', ') || 'none'}
                    </div>
                    <div style={{ marginTop: '8px' }}>
                        <button
                            onClick={() => setSelectedValues([])}
                            style={{ marginRight: '8px', padding: '4px 8px' }}
                        >
                            Clear All
                        </button>
                        <button
                            onClick={() => setSelectedValues(['option1', 'option2', 'option3'])}
                            style={{ padding: '4px 8px' }}
                        >
                            Select All
                        </button>
                    </div>
                </div>
            </div>
        );
    },
};

// Custom Styling
export const CustomStyling: Story = {
    render: function CustomStyling() {
        const [selected, setSelected] = useState<string[]>(['custom1']);

        return (
            <div style={{ width: '400px' }}>
                <SelectionGroup
                    type="checkbox"
                    options={[
                        { id: 'custom1', value: 'custom1', label: 'Custom Option 1' },
                        { id: 'custom2', value: 'custom2', label: 'Custom Option 2' },
                        { id: 'custom3', value: 'custom3', label: 'Custom Option 3' },
                    ]}
                    selectedValues={selected}
                    onChange={setSelected}
                    className="custom-selection-group"
                />
                <style>
                    {`
            .custom-selection-group .tsl-selection-container {
              background-color: #f5f5f5;
              padding: 12px;
              border-radius: 8px;
              margin-bottom: 8px;
              transition: background-color 0.2s;
            }
            
            .custom-selection-group .tsl-selection-container:hover {
              background-color: #e9e9e9;
            }
            
            .custom-selection-group .tsl-selection-text {
              font-weight: 600;
            }
            
            .custom-selection-group .tsl-checkbox-control {
              border-radius: 4px;
            }
          `}
                </style>
            </div>
        );
    },
};
