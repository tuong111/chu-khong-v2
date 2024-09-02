import React from 'react';
import { Layout } from 'antd';

const { Content, Footer } = Layout;

const NotFound: React.FC = () => {
    return (
        <Layout className="layout">
            <Content style={{ padding: '0 50px', marginTop: '20px' }}>
                <div className="site-layout-content">
                    <h1>404 - Page Not Found</h1>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Hán Ngữ Translator ©2024 Created by Tuong</Footer>
        </Layout>
    );
};

export default NotFound;
