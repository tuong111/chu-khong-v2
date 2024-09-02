import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

const HeaderMenu: React.FC = () => {
    // Định nghĩa các mục của menu
    const menuItems = [
        {
            key: '1',
            label: <Link to="/">Home</Link>
        },
        {
            key: '2',
            label: <Link to="/dictionary">Dictionary</Link>
        },
        {
            key: '3',
            label: <Link to="/documentEditor">Editor</Link>
        }
    ];

    return (
        <Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" items={menuItems} />
        </Header>
    );
};

export default HeaderMenu;
