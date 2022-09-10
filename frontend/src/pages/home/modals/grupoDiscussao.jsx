import React from 'react';
import Modal from '../../../components/modal';
import { Form, Input, Select } from 'antd';

const GrupoDiscussaoModal = (props) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={props.open}
      onCancel={props.onClose}
      onOk={() => {
        form.submit();
      }}
      title="Criar um novo grupo de discussão"
    >
      <Form
        name="basic"
        form={form}
        initialValues={{
          remember: true,
        }}
        onFinish={props.onFinish}
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
          initialValue={1}
        >
          <Select
            style={{
              width: 120,
            }}
            onChange={(e) => {
              console.log(e);
            }}
          >
            <Select.Option value={1}>Público</Select.Option>
            <Select.Option value={2}>Privado</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default GrupoDiscussaoModal;
