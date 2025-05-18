import React, { useState, useRef } from 'react';
import { Sidebar } from '@/components/Layout/Sidebar';
import { Navbar } from '@/components/Layout/Navbar';
import './layout.css';

import { ReactNode, useMemo } from 'react';

interface LayoutProps {
    children: ReactNode;
    title?: string;
    pageHeading?: string;
    path?: string;
}

const Layout = React.forwardRef<HTMLButtonElement, LayoutProps>(
    ({ children, title, pageHeading, path }: LayoutProps) => {
        const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
        const toggleButtonRef = useRef<HTMLButtonElement>(null);

        const toggleSidebar = () => {
            setSidebarCollapsed(prev => !prev);
        };

        // Generate breadcrumbs based on the current path
        const breadcrumbs = useMemo(() => {
            if (!path) return [];

            // Skip empty segments and the first segment (which is represented by Home icon)
            const segments = path.split('/').filter(segment => segment);

            // Build breadcrumb items with cumulative paths
            return segments.map((segment, index) => {
                const currentPath = '/' + segments.slice(0, index + 1).join('/');
                // Convert path segments to readable labels (capitalize, replace hyphens with spaces)
                const label = segment
                    .replace(/-/g, ' ')
                    .replace(/\b\w/g, char => char.toUpperCase());

                return {
                    label,
                    path: currentPath,
                };
            });
        }, [path]);

        return (
            <div className={`tsl-dashboard-layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
                <Sidebar
                    collapsed={sidebarCollapsed}
                    onToggleCollapse={toggleSidebar}
                    ref={toggleButtonRef}
                />
                <div className="tsl-dashboard-content">
                    <Navbar title={title} pageHeading={pageHeading} breadcrumbs={breadcrumbs} />
                    <main className="tsl-main-content">{children}</main>
                </div>
            </div>
        );
    }
);

Layout.displayName = 'Layout';
export { Layout };
