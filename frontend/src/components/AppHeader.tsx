import React from 'react';
import { Layout, Typography } from 'antd';

const { Header } = Layout;
const { Title } = Typography;

const AppHeader: React.FC = () => {
  return (
    <Header
      style={{ background: '#fff', padding: '0 24px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
    >
      <Title level={3} style={{ margin: 0, lineHeight: '64px' }}>
        TO-DO List
      </Title>
    </Header>
  );
};

export default AppHeader;
