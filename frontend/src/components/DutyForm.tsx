import React from 'react';
import { Form, Input, Button, Space } from 'antd';
import { useEffect } from 'react';
import { Duty } from '../types/duty';

interface DutyFormProps {
  duty?: Duty; // si existe, es edición; si no, es creación
  onSave: (name: string) => void;
  onCancel?: () => void;
}

const DutyForm: React.FC<DutyFormProps> = ({ duty, onSave, onCancel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (duty) {
      form.setFieldsValue({ name: duty.name });
    } else {
      form.resetFields();
    }
  }, [duty, form]);

  const handleFinish = (values: { name: string }) => {
    onSave(values.name.trim());
    form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={{ name: duty?.name || '' }}
    >
      <Form.Item
        label="Duty Name"
        name="name"
        rules={[
          { required: true, message: 'Please enter the duty name' },
          { min: 2, message: 'Name must be at least 2 characters' },
        ]}
      >
        <Input placeholder="e.g. Walk the dog" />
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            {duty ? 'Update' : 'Create'}
          </Button>
          {onCancel && (
            <Button htmlType="button" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </Space>
      </Form.Item>
    </Form>
  );
};

export default DutyForm;
