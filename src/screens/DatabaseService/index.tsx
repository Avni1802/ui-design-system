import { Card } from '@/components/Card';
import AdditionalDetails from './AdditionalDetails';
import ServiceDetails from './ServiceDetails';
import { ServiceProgress } from './ServiceProgress';
import './services.css';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Layout } from '@/components/Layout/Layout';

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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const totalSteps = steps.length;

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
        mode: 'onTouched',
    });

    const { trigger } = methods;

    const nextStep = async () => {
        // Validate current step before proceeding
        let isValid = false;

        if (currentStep === 0) {
            isValid = await trigger('serviceDetails', { shouldFocus: true });
        } else if (currentStep === 1) {
            isValid = await trigger('additionalDetails', { shouldFocus: true });
        }

        if (isValid && currentStep < totalSteps - 1) {
            setCurrentStep(prev => prev + 1);
        }
    };

    // const prevStep = () => {
    //     if (currentStep > 0) {
    //         setCurrentStep(prev => prev - 1);
    //     }
    // };

    const onSubmit = (data: DatabaseServiceFormData) => {
        setIsSubmitting(true);
        // Simulate API call
        console.log('Form submitted with data:', data);
        setTimeout(() => {
            setIsSubmitting(false);
            alert('Database service created successfully!');
        }, 1500);
    };

    return (
        <Layout
            title="Database Services"
            pageHeading="Create New Database Service"
            path="/services/database/create"
        >
            <FormProvider {...methods}>
                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        flex: '1 1 0%',
                        gap: '10px',
                    }}
                    className="tsl-service-wrapper"
                >
                    <div style={{ display: 'block', minWidth: '300px' }}>
                        <Card>
                            <ServiceProgress
                                currentStep={currentStep}
                                steps={steps}
                                onSubmit={onSubmit}
                                isSubmitting={isSubmitting}
                                nextStep={nextStep}
                            />
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
                        {currentStep == 1 && <AdditionalDetailsStep />}
                    </div>
                </div>
            </FormProvider>
        </Layout>
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
