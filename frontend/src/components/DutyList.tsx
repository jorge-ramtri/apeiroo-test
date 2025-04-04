import React from 'react';
import { List, Button, Checkbox, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Duty } from '../types/duty';
import { Typography } from 'antd';
const { Text } = Typography;

interface DutyListProps {
  duties: Duty[];
  onEdit: (dutyId: string) => void;
  onDelete?: (dutyId: string) => void;
  onToggleComplete: (duty: Duty) => void;
}

const DutyList: React.FC<DutyListProps> = ({ duties, onEdit, onDelete, onToggleComplete }) => {
  return (
    <List
      dataSource={duties}
      renderItem={(duty) => (
        <List.Item
          actions={[
            <Button type="link" icon={<EditOutlined />} onClick={() => onEdit(duty.id)} />,
            onDelete && (
              <Button
                type="link"
                icon={<DeleteOutlined />}
                danger
                onClick={() => onDelete(duty.id)}
              />
            ),
          ]}
        >
          <Space align="start">
            <Checkbox checked={duty.completed} onChange={() => onToggleComplete(duty)} />
            <Text delete={duty.completed} type={duty.completed ? 'secondary' : undefined}>
              {duty.name}
            </Text>
          </Space>
        </List.Item>
      )}
    />
  );
};

export default DutyList;
