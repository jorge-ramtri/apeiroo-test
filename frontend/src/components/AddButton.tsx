import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Grid } from 'antd';

interface AddButtonProps {
  onClick: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
  const screens = Grid.useBreakpoint();

  if (screens.lg) return null;

  return (
    <Button
      type="primary"
      shape="circle"
      icon={<PlusOutlined />}
      size="large"
      onClick={onClick}
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 1000,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      }}
    />
  );
};

export default AddButton;
