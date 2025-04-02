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
  const { id: selectedId } = useParams();
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
      message.error('Error loading tasks');
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
      message.success('Task deleted');
      loadDuties();
    } catch (err) {
      message.error('Failed to delete task');
    }
  };

  const handleSave = async (name: string) => {
    try {
      if (selectedId) {
        await updateDuty(selectedId, name);
        message.success('Updated!');
      } else {
        await createDuty(name);
        message.success('Created!');
      }
      navigate('/');
      loadDuties();
    } catch (err) {
      message.error('Failed to save task');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  const isWide = screens.lg ?? false; 
  const dutyToEdit = duties.find((d) => d.id === selectedId);

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

        {!isWide && selectedId && (
          <Modal open={!!selectedId} footer={null} onCancel={handleCancel} destroyOnClose>
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