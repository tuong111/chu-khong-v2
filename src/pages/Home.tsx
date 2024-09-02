import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Header, Content, Footer } = Layout;

const Home: React.FC = () => {
    return (
        <Layout className="layout">
            <Content style={{ padding: '0 50px', marginTop: '20px' }}>
                <div className="site-layout-content">
                    <h1>Welcome to Home Page</h1>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Hán Ngữ Translator ©2024 Created by Tuong</Footer>
        </Layout>
    );
};

export default Home;
