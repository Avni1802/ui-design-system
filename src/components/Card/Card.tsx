import * as React from 'react';
import './Card.css';

export interface CardProps {
    title?: string;
    description?: string;
    children?: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ children, title, description, ...props }) => {
        // Determine the actual state based on disabled and isLoading props
        // const buttonState = isLoading ? 'loader' : state;

        return (
            <div className="tsl-card" {...props}>
                {(title || description) && (
                    <div className="tsl-header">
                        {title && <h1 className="tsl-text-heading-md">{title}</h1>}
                        {description && <p className="tsl-text-body-primary">{description}</p>}
                    </div>
                )}
                <div className="tsl-card-content w-full">{children}</div>
            </div>
        );
    }
);

Card.displayName = 'Card';

export { Card };
