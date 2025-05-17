import React, { ReactNode } from 'react';

interface NavbarProps {
    // Define the expected props for the Sidebar component here
    // Example: title?: string;
    children?: ReactNode;
}
const Navbar = React.forwardRef<HTMLButtonElement, NavbarProps>(() => {
    return (
        <header className="navbar">
            <div className="navbar-left">
                <h1>Dashboard Title</h1>
            </div>
            <div className="navbar-right">
                <span>Notifications</span>
                <span>Profile</span>
                <span>Logout</span>
            </div>
        </header>
    );
});

Navbar.displayName = 'Navbar';
export { Navbar };
