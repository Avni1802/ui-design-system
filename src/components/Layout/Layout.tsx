import React from 'react';
import { Sidebar } from '@/components/Layout/Sidebar';
import { Navbar } from '@/components/Layout/Navbar';
import './layout.css';

import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const Layout = React.forwardRef<HTMLButtonElement, LayoutProps>(({ children }: LayoutProps) => {
    return (
        <div className="tsl-dashboard-layout">
            <Sidebar>hisd</Sidebar>
            <div className="tsl-dashboard-content">
                <Navbar />
                <main className="tsl-main-content">{children}</main>
            </div>
        </div>
    );
});

Layout.displayName = 'Layout';
export { Layout };
