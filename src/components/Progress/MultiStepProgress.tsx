import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import './MultiStepProgress.css';
import { clsx } from 'clsx';

const progressVariants = cva('tsl-progress', {
    variants: {
        variant: {
            primary: ['tsl-progress-primary'],
            secondary: ['tsl-progress-secondary'],
        },
        size: {
            sm: ['tsl-progress-sm'],
            md: ['tsl-progress-md'],
            lg: ['tsl-progress-lg'],
        },
    },
    defaultVariants: {
        variant: 'primary',
        size: 'sm',
    },
});

export interface ProgressStepProps {
    title: string;
    description?: string;
    completed?: boolean;
    current?: boolean;
}

export interface MultiStepProgressProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof progressVariants> {
    steps: ProgressStepProps[];
    currentStep?: number;
}

const MultiStepProgress = React.forwardRef<HTMLDivElement, MultiStepProgressProps>(
    ({ className, variant, size, steps, currentStep = 0, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={clsx(
                    progressVariants({
                        variant,
                        size,
                    }),
                    className
                )}
                {...props}
            >
                <div className="tsl-progress-steps">
                    {steps.map((step, index) => {
                        const isCompleted = index < currentStep;
                        const isCurrent = index === currentStep;
                        const isLast = index === steps.length - 1;
                        console.log(isLast, index, steps.length);

                        return (
                            <div
                                key={index}
                                className={clsx('tsl-progress-step', {
                                    'tsl-progress-step-completed': isCompleted,
                                    'tsl-progress-step-current': isCurrent,
                                })}
                            >
                                {!isLast && (
                                    <div
                                        className={clsx('tsl-progress-connector', {
                                            'tsl-progress-connector-completed': index < currentStep,
                                        })}
                                    ></div>
                                )}
                                <div className="tsl-progress-indicator">
                                    <div className="tsl-progress-dot"></div>
                                </div>
                                <div className="tsl-progress-content">
                                    <div className="tsl-text-body-primary">{step.title}</div>
                                    {step.description && (
                                        <div className="tsl-text-body-secondary">
                                            {step.description}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
);

MultiStepProgress.displayName = 'MultiStepProgress';

export { MultiStepProgress, progressVariants };
