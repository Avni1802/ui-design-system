import React, { ReactNode } from 'react';
import './sidebar.css';
import { MenuItem } from './MenuItem';
import {
    AppstoreOutlined,
    BarsOutlined,
    CheckCircleOutlined,
    CloudServerOutlined,
    CodeOutlined,
    DashboardOutlined,
    DatabaseOutlined,
    PlaySquareOutlined,
    PlusSquareOutlined,
    ProfileOutlined,
    PushpinFilled,
    QuestionCircleOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Input } from '@/components/Input/Input';
import logo from '/logo.svg';

interface SidebarProps {
    children?: ReactNode;
    collapsed?: boolean;
    onToggleCollapse?: () => void;
}

const Sidebar = React.forwardRef<HTMLButtonElement, SidebarProps>(
    ({ collapsed = false, onToggleCollapse }, ref) => {
        return (
            <div className={`tsl-sidebar ${collapsed ? 'tsl-sidebar-collapsed' : ''}`}>
                <nav className="tsl-sidebar-top">
                    <MenuItem
                        label="Tessell"
                        showTrailing
                        iconTrailing={<BarsOutlined />}
                        showLeading
                        iconLeading={<img src={logo} alt="logo" />}
                    />
                    <MenuItem label="Apps" showLeading iconLeading={<AppstoreOutlined />} />
                    <Input
                        variant="select"
                        options={[{ value: 'DB Services', label: 'DB Services' }]}
                    />
                    <MenuItem
                        label="My Services"
                        active
                        showLeading
                        iconLeading={<DatabaseOutlined />}
                    />
                    <MenuItem label="Provisioning" showLeading iconLeading={<ProfileOutlined />} />
                    <MenuItem
                        label="Availability Machines"
                        showLeading
                        iconLeading={<CheckCircleOutlined />}
                    />
                    <MenuItem label="Dataflix" showLeading iconLeading={<PlaySquareOutlined />} />
                    <MenuItem label="ScriptLibrary" showLeading iconLeading={<CodeOutlined />} />
                    <MenuItem label="Benchmarks" showLeading iconLeading={<DashboardOutlined />} />
                    <MenuItem label="Servers" showLeading iconLeading={<CloudServerOutlined />} />
                </nav>
                <nav className="sidebar-footer w-full">
                    <MenuItem
                        label="Invite People"
                        size="sm"
                        showLeading
                        iconLeading={<PlusSquareOutlined />}
                        showTrailing
                        iconTrailing={<PushpinFilled />}
                    />
                    <MenuItem
                        label="Help & Support"
                        size="sm"
                        showLeading
                        iconLeading={<QuestionCircleOutlined />}
                        showTrailing
                        iconTrailing={<PushpinFilled />}
                    />
                </nav>
            </div>
        );
    }
);
Sidebar.displayName = 'Sidebar';
export { Sidebar };
