import React from 'react';
import { Form, Input } from 'antd';
import { useEffect } from 'react';
import Modal from '../../../components/modal';

const AssuntoDiscussionModal = ({
  open,
  onClose,
  title,
  onFinish,
  formValue,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      titulo: formValue?.titulo || formValue?.nome,
      descricao: formValue?.descricao,
    });
  }, [form, formValue]);

  return (
    <Modal
      visible={open}
      onCancel={onClose}
      onOk={() => {
        form.submit();
      }}
      title={title}
      initialValue={{
        titulo: formValue?.nome,
        descricao: formValue?.descricao,
        visibilidade: formValue?.visibilidade || 1,
      }}
    >
      <Form
        name="basic"
        form={form}
        onFinish={onFinish}
        onFinishFailed={(e) => {}}
        autoComplete="off"
      >
        <Form.Item
          label="Titulo"
          name="titulo"
          rules={[
            {
              required: true,
              message: 'O titulo é obrigatório!',
            },
          ]}
        >
          <Input style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Descrição"
          name="descricao"
          style={{ margin: '2rem 0' }}
        >
          <Input.TextArea rows={4} autoSize={true} style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AssuntoDiscussionModal;
