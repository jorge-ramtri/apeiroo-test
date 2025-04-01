import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Modal, message, Grid, Layout } from 'antd';

import AppHeader from '../components/AppHeader';
import DutyList from '../components/DutyList';
import DutyForm from '../components/DutyForm';
import { Duty } from '../types/Duty';

const mockDuties: Duty[] = [
  { id: '1', name: 'Buy milk' },
  { id: '2', name: 'Finish project' },
  { id: '3', name: 'Call grandma' },
];

const TodoListPage = () => {
  const [duties, setDuties] = useState<Duty[]>([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const screens = Grid.useBreakpoint();

  useEffect(() => {
    setDuties(mockDuties); // esto se reemplazará por API real luego
  }, []);

  const handleEdit = (dutyId: string) => {
    navigate(`/edit/${dutyId}`);
  };

  const handleDelete = (dutyId: string) => {
    setDuties((prev) => prev.filter((d) => d.id !== dutyId));
    message.success('Duty deleted');
  };

  const handleSave = (name: string) => {
    if (id) {
      // actualizar
      setDuties((prev) =>
        prev.map((d) => (d.id === id ? { ...d, name } : d))
      );
      message.success('Duty updated');
    } else {
      // crear
      const newDuty: Duty = { id: crypto.randomUUID(), name };
      setDuties((prev) => [...prev, newDuty]);
      message.success('Duty created');
    }
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  const isWide = screens.lg ?? false;
  const dutyToEdit = duties.find((d) => d.id === id);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppHeader />
      <Layout.Content style={{ padding: 24 }}>
        <Row gutter={16}>
          <Col xs={24} lg={12}>
            <DutyList duties={duties} onEdit={handleEdit} onDelete={handleDelete} />
          </Col>

          {isWide && (
            <Col lg={12}>
              <DutyForm duty={dutyToEdit} onSave={handleSave} onCancel={handleCancel} />
            </Col>
          )}
        </Row>

        {!isWide && id && (
          <Modal open={!!id} footer={null} onCancel={handleCancel} destroyOnClose>
            <DutyForm duty={dutyToEdit} onSave={handleSave} onCancel={handleCancel} />
          </Modal>
        )}
      </Layout.Content>
    </Layout>
  );
};

export default TodoListPage;