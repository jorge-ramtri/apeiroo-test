import React from 'react';
import { List, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Duty } from '../types/Duty';

interface DutyListProps {
  duties: Duty[];
  onEdit: (dutyId: string) => void;
  onDelete?: (dutyId: string) => void; // opcional, por si no queremos permitir borrado aún
}

const DutyList: React.FC<DutyListProps> = ({ duties, onEdit, onDelete }) => {
  return (
    <List
      bordered
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
          {duty.name}
        </List.Item>
      )}
    />
  );
};

export default DutyList;
