import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Modal, message, Grid, Layout } from 'antd';

import AppHeader from '../components/AppHeader';
import DutyList from '../components/DutyList';
import DutyForm from '../components/DutyForm';
import { Duty } from '../types/duty';
import { createDuty, deleteDuty, fetchDuties, updateDuty } from '../services/dutyService';

const TodoListPage = () => {
  const [duties, setDuties] = useState<Duty[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const screens = Grid.useBreakpoint();

  useEffect(() => {
    loadDuties();
  }, []);

  const loadDuties = async () => {
    setLoading(true);
    try {
      const data = await fetchDuties();
      setDuties(data);
    } catch (err) {
      message.error('Error loading duties');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (dutyId: string) => {
    navigate(`/edit/${dutyId}`);
  };

  const handleDelete = async (dutyId: string) => {
    try {
      await deleteDuty(dutyId);
      message.success('Duty deleted');
      loadDuties();
    } catch (err) {
      message.error('Failed to delete duty');
    }
  };

  const handleSave = async (name: string) => {
    try {
      if (id) {
        await updateDuty(id, name);
        message.success('Duty updated');
      } else {
        await createDuty(name);
        message.success('Duty created');
      }
      navigate('/');
      loadDuties();
    } catch (err) {
      message.error('Failed to save duty');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  const isWide = screens.lg ?? false; // TODO this can be more tunned in.
  const dutyToEdit = duties.find((d) => d.id === id);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppHeader />
      <Layout.Content style={{ padding: 24 }}>
        <Row gutter={16}>
          <Col xs={24} lg={12}>
            <DutyList
              duties={duties}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Col>

          {isWide && (
            <Col lg={12}>
              <DutyForm
                duty={dutyToEdit}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            </Col>
          )}
        </Row>

        {!isWide && id && (
          <Modal open={!!id} footer={null} onCancel={handleCancel} destroyOnClose>
            <DutyForm
              duty={dutyToEdit}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </Modal>
        )}
      </Layout.Content>
    </Layout>
  );
};

export default TodoListPage;