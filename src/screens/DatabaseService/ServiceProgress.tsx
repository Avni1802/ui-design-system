/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { MultiStepProgress } from '@/components/Progress/MultiStepProgress';
import { Button } from '@/components/Button';
import { PlusOutlined } from '@ant-design/icons';
interface ServiceProgressProps {
    currentStep: number;
    steps: {
        title: string;
        description: string;
    }[];
}

export const ServiceProgress: React.FC<ServiceProgressProps> = ({ currentStep, steps }) => {
    return (
        <div className="progress-container">
            <MultiStepProgress
                steps={steps}
                currentStep={currentStep}
                variant="primary"
                size="sm"
            />
            <div>
                <div></div>
                <Button
                    isFullWidth
                    label="Create service"
                    showLeading
                    iconLeading={<PlusOutlined />}
                />
            </div>
        </div>
    );
};
