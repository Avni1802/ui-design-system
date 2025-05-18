/**
 * A toggle switch component for boolean settings.
 *
 * @example
 * <Switch
 *   label="Enable notifications"
 *   helpText="Receive updates about your account"
 * />
 */

import * as React from 'react';
import { clsx } from 'clsx';
import './Switch.css';

export interface SwitchProps {
    /**
     * Unique identifier for the switch
     */
    id?: string;

    /**
     * Whether the switch is checked
     */
    isChecked?: boolean;

    /**
     * Whether the switch is disabled
     */
    isDisabled?: boolean;

    /**
     * The size of the switch
     */
    size?: 'regular' | 'small' | 'large';

    /**
     * Label text for the switch
     */
    label?: string;

    /**
     * Help text displayed below the label
     */
    helpText?: string;

    /**
     * Whether to show only the switch without label
     */
    iconOnly?: boolean;

    /**
     * Callback when the switch state changes
     */
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

    /**
     * Additional CSS class for the switch
     */
    className?: string;

    /**
     * Name attribute for the input element
     */
    name?: string;

    /**
     * Value attribute for the input element
     */
    value?: string;
}

export const Switch: React.FC<SwitchProps> = ({
    id,
    isChecked = false,
    isDisabled = false,
    size = 'regular',
    label,
    helpText,
    iconOnly = false,
    onChange,
    className,
    name,
    value,
}) => {
    const generatedId = React.useId();
    const switchId = id || generatedId;

    return (
        <div className={clsx('tsl-switch-container', className)}>
            <label htmlFor={switchId} className={clsx({ 'tsl-switch-input-wrapper': true })}>
                <input
                    id={switchId}
                    type="checkbox"
                    className="tsl-switch-input"
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={onChange}
                    name={name}
                    value={value}
                />
                <span
                    className={clsx('tsl-switch-track', size, {
                        disabled: isDisabled,
                    })}
                >
                    <span className="tsl-switch-knob"></span>
                </span>
            </label>

            {!iconOnly && (label || helpText) && (
                <div className="tsl-switch-label">
                    {label && (
                        <span className="tsl-switch-text tsl-text-body-primary">{label}</span>
                    )}
                    {helpText && (
                        <span className="tsl-switch-help-text tsl-text-body-secondary">
                            {helpText}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};
Switch.displayName = 'Switch';
