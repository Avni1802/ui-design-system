import React, { ReactNode } from 'react';
import { HomeOutlined, RightOutlined } from '@ant-design/icons';
import { Link } from '@/components/Link';
import './Navbar.css';

interface BreadcrumbItem {
    label: string;
    path: string;
}

interface NavbarProps {
    title?: string;
    pageHeading?: string;
    breadcrumbs?: BreadcrumbItem[];
    children?: ReactNode;
}

const Navbar = React.forwardRef<HTMLButtonElement, NavbarProps>(
    ({ title = 'Dashboard', pageHeading, breadcrumbs = [], children }) => {
        return (
            <header className="navbar-container">
                {/* Top row with breadcrumbs and actions */}
                <div className="navbar">
                    <div className="navbar-left">
                        {breadcrumbs.length > 0 ? (
                            <div className="breadcrumb">
                                <Link
                                    href="/"
                                    iconLeading={<HomeOutlined />}
                                    showLeading
                                    label="Home"
                                    className="breadcrumb-item"
                                />

                                {breadcrumbs.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <RightOutlined className="breadcrumb-separator" />
                                        <Link
                                            href={item.path}
                                            label={item.label}
                                            className={`breadcrumb-item ${index === breadcrumbs.length - 1 ? 'active' : ''}`}
                                        />
                                    </React.Fragment>
                                ))}
                            </div>
                        ) : (
                            <h1 className="navbar-title">{title}</h1>
                        )}
                    </div>
                    <div className="navbar-right">
                        {children || (
                            <>
                                <span className="navbar-item">Notifications</span>
                                <span className="navbar-item">Profile</span>
                                <span className="navbar-item">Logout</span>
                            </>
                        )}
                    </div>
                </div>

                {/* Bottom row with page heading */}
                {pageHeading && (
                    <div className="navbar-heading">
                        <h1 className="tsl-text-heading-md">{pageHeading}</h1>
                    </div>
                )}
            </header>
        );
    }
);

Navbar.displayName = 'Navbar';
export { Navbar };
