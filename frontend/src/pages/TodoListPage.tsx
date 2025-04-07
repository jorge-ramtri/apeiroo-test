import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Modal, message, Grid, Layout, Empty } from 'antd';

import AppHeader from '../components/AppHeader';
import DutyList from '../components/DutyList';
import DutyForm from '../components/DutyForm';
import { Duty } from '../types/duty';
import { createDuty, deleteDuty, fetchDuties, updateDuty } from '../services/dutyService';
import AddButton from '../components/AddButton';

const TodoListPage = () => {
  const [duties, setDuties] = useState<Duty[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id: selectedId } = useParams();
  const location = useLocation();
  const isCreating = location.pathname === '/create';
  const isEditing = location.pathname === '/edit';
  const screens = Grid.useBreakpoint();

  useEffect(() => {
    loadDuties();
  }, []);

  const loadDuties = async () => {
    setLoading(true);
    try {
      const data = await fetchDuties();
      setDuties(data.map((d) => ({ ...d, completed: d.completed ?? false })));
    } catch (err) {
      message.error('Error loading tasks');
    } finally {
      setLoading(false);
    }
  };

  const isWide = screens.lg ?? false;
  const dutyToEdit: Duty = duties.find((d) => d.id === selectedId)!;

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
      if (isCreating) {
        await createDuty(name);
        message.success('Created!');
      } else {
        await updateDuty({ id: dutyToEdit.id, name, completed: false });
        message.success('Updated!');
      }
      navigate('/');
      loadDuties();
    } catch (err) {
      message.error('Failed to save task');
    }
  };

  const handleToggleComplete = async (duty: Duty) => {
    const updated = { ...duty, completed: !duty.completed };
    await updateDuty(updated);
    const updatedList = duties.map((d) => (d.id === duty.id ? updated : d));
    setDuties(updatedList);
  };

  const handleCancel = () => {
    navigate('/');
  };

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
              onToggleComplete={handleToggleComplete}
            />
          </Col>

          {isWide && (
            <Col lg={12}>
              <DutyForm duty={dutyToEdit} onSave={handleSave} onCancel={handleCancel} />
            </Col>
          )}
        </Row>

        {!isWide && (selectedId || isCreating) && (
          <Modal
            open={!!selectedId || isCreating}
            footer={null}
            onCancel={handleCancel}
            destroyOnClose
          >
            <DutyForm duty={dutyToEdit} onSave={handleSave} onCancel={handleCancel} />
          </Modal>
        )}
      </Layout.Content>
      <AddButton onClick={() => navigate('/create')} />
    </Layout>
  );
};

export default TodoListPage;
