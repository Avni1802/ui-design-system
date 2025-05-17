import { Card } from '@/components/Card';
import AdditionalDetails from './AdditionalDetails';
import ServiceDetails from './ServiceDetails';
import { ServiceProgress } from './ServiceProgress';
import './services.css';
import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const steps = [
    {
        title: 'Service Details',
        description: 'Oracle_serivce | oracle_para_profile',
    },
    {
        title: 'Additional Setting',
        description: 'No Preference | Enabled minor version update | 7-day PITR 1:00 snapshot time',
    },
];

// Define the combined schema for both steps
const serviceDetailsSchema = z.object({
    serviceName: z.string().min(1, 'Service name is required'),
    description: z.string().optional(),
    tags: z.string().optional(),
    softwareRelease: z.string().min(1, 'Software release is required'),
    version: z.string().min(1, 'Version is required'),
    isContainerDatabase: z.boolean(),
});

const additionalDetailsSchema = z.object({
    windowPreference: z.enum(['1', '2']),
    startDay: z.string().optional(),
    startTime: z.string().optional(),
    duration: z.string().optional(),
    enableAutoMinorVersionUpdate: z.boolean(),
    sla: z.string().optional(),
    snapshotTime: z.string().optional(),
});

// Combine both schemas
const databaseServiceSchema = z.object({
    serviceDetails: serviceDetailsSchema,
    additionalDetails: additionalDetailsSchema,
});

export type DatabaseServiceFormData = z.infer<typeof databaseServiceSchema>;

const DatabaseService = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const methods = useForm<DatabaseServiceFormData>({
        resolver: zodResolver(databaseServiceSchema),
        defaultValues: {
            serviceDetails: {
                serviceName: 'oracle_09_2023',
                description: '',
                tags: '',
                softwareRelease: '',
                version: '',
                isContainerDatabase: false,
            },
            additionalDetails: {
                windowPreference: '1',
                startDay: '',
                startTime: '',
                duration: '',
                enableAutoMinorVersionUpdate: true,
                sla: '',
                snapshotTime: '',
            },
        },
        mode: 'onBlur',
    });
    // const { watch, trigger } = methods;
    // useEffect(() => {
    //     const { unsubscribe } = watch(() => {
    //         nextStep();
    //     });
    //     return () => unsubscribe();
    // }, [watch, trigger]);

    // const handleSubmitStep = async () => {
    //     if (currentStep < totalSteps) {
    //         await nextStep();
    //     } else {
    //         await methods.handleSubmit(onSubmit)();
    //     }
    // };

    return (
        <FormProvider {...methods}>
            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    flex: '1 1 0%',
                    gap: '10px',
                }}
            >
                <div style={{ display: 'block', width: '380px' }}>
                    <Card>
                        <ServiceProgress currentStep={currentStep} steps={steps} />
                    </Card>
                </div>
                <div
                    style={{
                        display: 'flex',
                        paddingBottom: 'var(--tsl-spacing-large)',
                        width: '100%',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: '20px',
                    }}
                >
                    <ServiceDetailsStep />

                    <AdditionalDetailsStep />
                </div>
            </div>
        </FormProvider>
    );
};
// Wrapper component for ServiceDetails to use nested form fields
const ServiceDetailsStep = () => {
    return <ServiceDetails />;
};

// Wrapper component for AdditionalDetails to use nested form fields
const AdditionalDetailsStep = () => {
    return <AdditionalDetails />;
};

export default DatabaseService;
