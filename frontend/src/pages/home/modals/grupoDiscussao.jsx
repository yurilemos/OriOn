import React from 'react';
import Modal from '../../../components/modal';
import { Checkbox, Form, Input, Select } from 'antd';
import { useEffect } from 'react';

const GrupoDiscussaoModal = ({ open, onClose, title, onFinish, formValue }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      titulo: formValue?.nome,
      descricao: formValue?.descricao,
      visibilidade: formValue?.visibilidade || 1,
      arquivar: formValue?.status === 2 ? true : false,
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
        <Form.Item
          label="Visibilidade"
          name="visibilidade"
          style={{ margin: '2rem 0' }}
        >
          <Select
            style={{
              width: 120,
            }}
          >
            <Select.Option value={1}>Público</Select.Option>
            <Select.Option value={2}>Privado</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Arquivar" name="arquivar" valuePropName="checked">
          <Checkbox />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default GrupoDiscussaoModal;
