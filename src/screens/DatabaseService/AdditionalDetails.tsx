import { Card } from '@/components/Card';
import { Input } from '@/components/Input/Input';
import { Selection, SelectionGroup } from '@/components/Selection';
import { useFormContext, Controller } from 'react-hook-form';
import { DatabaseServiceFormData } from '.';
import { Link } from '@/components/Link';
import { Table } from '@/components/Table/Table';
import { CopyOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';

const sampleData = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

function RenderCompleteExample() {
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
    );
}

const AdditionalDetails = () => {
    const {
        control,
        watch,
        setValue,
        formState: { errors },
    } = useFormContext<DatabaseServiceFormData>();
    const additionalDetailsErrors = errors.additionalDetails || {};

    const windowPreference = watch('additionalDetails.windowPreference');

    // Set default SLA value if not already set
    useEffect(() => {
        if (!watch('additionalDetails.sla')) {
            setValue('additionalDetails.sla', 'standard', { shouldValidate: false });
        }
    }, [setValue, watch]);

    return (
        <Card title="Additional Details" description="Maintenance Window, Availability machine">
            <div>
                <h1 className="tsl-text-heading-sm">Maintenance Window</h1>
                <p className="tsl-text-body-primary tsl-text-color-subtler">
                    Describing what Maintenance window is
                </p>
            </div>

            <Controller
                name="additionalDetails.windowPreference"
                control={control}
                render={({ field: { value, onChange } }) => (
                    <SelectionGroup
                        selectedValues={[value]}
                        onChange={values => onChange(values[0])}
                        type="radio"
                        direction="horizontal"
                        label="Window Preference"
                        options={[
                            { id: '1', value: '1', label: 'No Preferences' },
                            { id: '2', value: '2', label: 'Select Window' },
                        ]}
                    />
                )}
            />

            {windowPreference === '2' && (
                <div className="flex w-full gap-3">
                    <Controller
                        name="additionalDetails.startDay"
                        control={control}
                        render={({ field }) => (
                            <Input
                                label="Start Day"
                                type="date"
                                {...field}
                                errorMessage={additionalDetailsErrors.startDay?.message}
                            />
                        )}
                    />

                    <Controller
                        name="additionalDetails.startTime"
                        control={control}
                        render={({ field }) => (
                            <Input
                                label="Start Time"
                                type="time"
                                {...field}
                                errorMessage={additionalDetailsErrors.startTime?.message}
                            />
                        )}
                    />

                    <Controller
                        name="additionalDetails.duration"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="select"
                                label="Duration"
                                options={[
                                    { value: '30', label: '30 minutes' },
                                    { value: '60', label: '1 hour' },
                                    { value: '120', label: '2 hours' },
                                ]}
                                {...field}
                                errorMessage={additionalDetailsErrors.duration?.message}
                            />
                        )}
                    />
                </div>
            )}

            <Controller
                name="additionalDetails.enableAutoMinorVersionUpdate"
                control={control}
                render={({ field: { value, onChange } }) => (
                    <Selection
                        checked={value}
                        onChange={e => onChange(e.target.checked)}
                        label="Enable auto minor version update"
                    />
                )}
            />

            <div>
                <h2 className="tsl-text-heading-sm">Available machine preferences</h2>
                <p className="tsl-text-body-primary tsl-text-color-subtler">
                    Here you can define your data protection SLA and schedule. Once the database has
                    been created, you can further define the data availability and access policies
                    from the Availability Machine app.
                </p>
            </div>

            <div className="flex w-full gap-3">
                <Controller
                    name="additionalDetails.sla"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="SLA"
                            type="select"
                            options={[
                                { value: 'standard', label: 'Standard' },
                                { value: 'premium', label: 'Premium' },
                                { value: 'enterprise', label: 'Enterprise' },
                            ]}
                            {...field}
                            errorMessage={additionalDetailsErrors.sla?.message}
                        />
                    )}
                />

                <Controller
                    name="additionalDetails.snapshotTime"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="time"
                            label="Snapshot time"
                            {...field}
                            errorMessage={additionalDetailsErrors.snapshotTime?.message}
                        />
                    )}
                />
            </div>
            <RenderCompleteExample />
        </Card>
    );
};

export default AdditionalDetails;
