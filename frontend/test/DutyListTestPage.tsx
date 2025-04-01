import React from 'react';
import DutyList from '../src/components/DutyList';
import { Duty } from '../src/types/Duty';
import { message } from 'antd';

const mockDuties: Duty[] = [
  { id: '1', name: 'Buy milk' },
  { id: '2', name: 'Finish project' },
  { id: '3', name: 'Call grandma' },
];

const DutyListTestPage = () => {
  const handleEdit = (id: string) => {
    message.info(`Edit duty with id: ${id}`);
  };

  const handleDelete = (id: string) => {
    message.warning(`Delete duty with id: ${id}`);
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Duty List Test</h2>
      <DutyList duties={mockDuties} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default DutyListTestPage;
