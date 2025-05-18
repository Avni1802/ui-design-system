import { Card } from '@/components/Card';
import { Input } from '@/components/Input/Input';
import { Selection } from '@/components/Selection';
import { Tag } from '@/components/Tag/Tag';
import { useFormContext, Controller } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import { DatabaseServiceFormData } from '.';

const ServiceDetails = () => {
    const [tagsList, setTagsList] = useState<string[]>(['key_input: value_input', 'key2: value2']);
    const [tagInput, setTagInput] = useState('');

    const {
        control,
        setValue,
        formState: { errors },
    } = useFormContext<DatabaseServiceFormData>();
    const serviceDetailsErrors = errors.serviceDetails || {};

    // Update form value when tags change
    useEffect(() => {
        setValue('serviceDetails.tags', tagsList.join(','), { shouldValidate: true });
    }, [tagsList, setValue]);

    const handleAddTag = () => {
        if (tagInput.trim()) {
            setTagsList([...tagsList, tagInput]);
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTagsList(tagsList.filter(tag => tag !== tagToRemove));
    };

    const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTag();
        }
    };

    return (
        <Card
            title="Service Details"
            description="Service Name, Service Description, Software Release"
        >
            <Controller
                name="serviceDetails.serviceName"
                control={control}
                render={({ field }) => (
                    <Input
                        label="Service Name"
                        {...field}
                        errorMessage={(serviceDetailsErrors as any)?.serviceName?.message}
                    />
                )}
            />

            <Controller
                name="serviceDetails.description"
                control={control}
                render={({ field }) => (
                    <Input
                        label="Description (optional)"
                        placeholder="Add a description"
                        variant="description"
                        {...field}
                        errorMessage={serviceDetailsErrors.description?.message}
                    />
                )}
            />

            <div>
                <Controller
                    name="serviceDetails.tags"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="Tags"
                            placeholder="Add a tag (format: key: value)"
                            value={tagInput}
                            onChange={e => setTagInput(e.target.value)}
                            onKeyDown={handleTagInputKeyDown}
                            onBlur={() => {
                                handleAddTag();
                                field.onBlur();
                            }}
                            errorMessage={serviceDetailsErrors.tags?.message}
                        />
                    )}
                />
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '8px' }}>
                    {tagsList.map((tag, index) => (
                        <Tag
                            key={index}
                            label={tag}
                            showCloseIcon
                            onClose={() => handleRemoveTag(tag)}
                        />
                    ))}
                </div>
            </div>

            <div>
                <h1 className="tsl-text-heading-md">Engine configuration</h1>
                <p className="tsl-text-body-primary tsl-text-color-subtler">
                    Adjustable parameters, performance optimization, fine-tuning options
                </p>
            </div>

            <div className="flex w-full gap-3">
                <Controller
                    name="serviceDetails.softwareRelease"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="Software Release"
                            variant="select"
                            placeholder="select"
                            options={[
                                { value: '', label: 'Select release' },
                                { value: 'Oracle 21c', label: 'Oracle 21c' },
                            ]}
                            {...field}
                            errorMessage={serviceDetailsErrors?.softwareRelease?.message}
                        />
                    )}
                />

                <Controller
                    name="serviceDetails.version"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="Version"
                            variant="select"
                            options={[
                                { value: '', label: 'Select Version' },
                                { value: '21.0.0.0.0', label: '21.0.0.0.0' },
                            ]}
                            {...field}
                            errorMessage={serviceDetailsErrors.version?.message}
                        />
                    )}
                />
            </div>

            <Controller
                name="serviceDetails.isContainerDatabase"
                control={control}
                render={({ field: { value, onChange } }) => (
                    <Selection
                        type="checkbox"
                        label="Create as a container database"
                        checked={value}
                        onChange={e => onChange(e.target.checked)}
                    />
                )}
            />
        </Card>
    );
};

export default ServiceDetails;
