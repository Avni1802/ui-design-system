import '../../styles/main.css';

import { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';
import { ClockCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';

const meta: Meta<typeof Tag> = {
    title: 'Components/Tag',
    component: Tag,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['regular', 'large'],
            description: 'The size of the tag',
        },
        iconOnly: {
            control: 'boolean',
            description: 'Whether the tag only displays an icon',
        },
        isDisabled: {
            control: 'boolean',
            description: 'Whether the tag is disabled',
        },
        label: {
            control: 'text',
            description: 'Text to display on the tag',
        },
        showLeadingIcon: {
            control: 'boolean',
            description: 'Whether to show the leading icon',
        },
        showCloseIcon: {
            control: 'boolean',
            description: 'Whether to show the close icon',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Tag>;

// Default Tag
export const Default: Story = {
    args: {
        label: 'Tag',
        size: 'regular',
    },
};

// Tag Sizes
export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Tag size="regular" label="Regular" />
            <Tag size="large" label="Large" />
        </div>
    ),
};

export const WithLeadingIcons: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Tag
                label="Information"
                showLeadingIcon={true}
                leadingIcon={<InfoCircleOutlined style={{ height: '12px', width: '12px' }} />}
            />
        </div>
    ),
};

// Tags with Close Icons
export const WithCloseIcons: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Tag
                label="Removable"
                showCloseIcon={true}
                onClose={() => console.log('Default tag closed')}
            />
        </div>
    ),
};

// Tags with Both Icons
export const WithBothIcons: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Tag
                label="Information"
                showLeadingIcon={true}
                leadingIcon={<InfoCircleOutlined style={{ height: '12px', width: '12px' }} />}
                showCloseIcon={true}
                onClose={() => console.log('Info tag closed')}
            />
        </div>
    ),
};

// Icon Only Tags
export const IconOnly: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '16px' }}>
            <Tag
                iconOnly={true}
                leadingIcon={<InfoCircleOutlined style={{ height: '12px', width: '12px' }} />}
                aria-label="Information"
            />
        </div>
    ),
};

// Disabled Tags
export const Disabled: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Tag label="Disabled" isDisabled={true} />
        </div>
    ),
};

// Interactive Example
export const Interactive: Story = {
    render: function InteractiveTagsExample() {
        const [tags, setTags] = useState([
            { id: 1, label: 'React', variant: 'primary' },
            { id: 2, label: 'TypeScript', variant: 'success' },
            { id: 3, label: 'CSS', variant: 'default' },
            { id: 4, label: 'Storybook', variant: 'warning' },
        ]);

        const removeTag = (id: number) => {
            setTags(tags.filter(tag => tag.id !== id));
        };

        return (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', maxWidth: '400px' }}>
                {tags.map(tag => (
                    <Tag
                        key={tag.id}
                        label={tag.label}
                        showCloseIcon={true}
                        onClose={() => removeTag(tag.id)}
                    />
                ))}
                {tags.length === 0 && <div>All tags have been removed. Refresh to reset.</div>}
            </div>
        );
    },
};

// Tag Group Example
export const TagGroup: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
                <h3 style={{ marginBottom: '8px' }}>Categories</h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <Tag label="Design" />
                    <Tag label="Development" />
                    <Tag label="Marketing" />
                    <Tag label="Product" />
                </div>
            </div>

            <div>
                <h3 style={{ marginBottom: '8px' }}>Status</h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <Tag
                        label="In Progress"
                        showLeadingIcon={true}
                        leadingIcon={
                            <ClockCircleOutlined style={{ height: '12px', width: '12px' }} />
                        }
                    />
                </div>
            </div>
        </div>
    ),
};
