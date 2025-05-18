/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { MultiStepProgress } from '@/components/Progress/MultiStepProgress';
import { Button } from '@/components/Button';
import { ArrowRightOutlined, PlusOutlined } from '@ant-design/icons';
import { useFormContext } from 'react-hook-form';
import { DatabaseServiceFormData } from '.';
interface ServiceProgressProps {
    currentStep: number;
    isSubmitting: boolean;
    steps: {
        title: string;
        description: string;
    }[];
    onSubmit: (data: DatabaseServiceFormData) => void;
    nextStep: () => void;
}

export const ServiceProgress: React.FC<ServiceProgressProps> = ({
    currentStep,
    steps,
    onSubmit,
    isSubmitting,
    nextStep,
}) => {
    const { handleSubmit } = useFormContext<DatabaseServiceFormData>();
    const totalSteps = steps.length;

    return (
        <div className="progress-container">
            <MultiStepProgress
                steps={steps}
                currentStep={currentStep}
                variant="primary"
                size="sm"
            />
            <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                        <h2 className="tsl-text-heading-md tsl-text-color-subtler">
                            Estimated Monthly price*
                        </h2>
                        <span className="tsl-text-body-secondary tsl-text-color-brand">
                            View details
                        </span>
                    </div>
                    <h2 className="tsl-text-heading-lg">$99.99</h2>
                </div>
                <div>
                    {currentStep < totalSteps - 1 ? (
                        <Button
                            iconTrailing={<ArrowRightOutlined />}
                            showTrailing
                            variant="primary"
                            label="Additional Details"
                            onClick={nextStep}
                            isFullWidth
                        />
                    ) : (
                        <Button
                            variant="primary"
                            label="Create Database Service"
                            onClick={handleSubmit(onSubmit)}
                            isLoading={isSubmitting}
                            iconLeading={<PlusOutlined />}
                            showLeading
                            isFullWidth
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
