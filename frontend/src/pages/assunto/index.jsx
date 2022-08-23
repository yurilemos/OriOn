import { Form, Input } from 'antd';
import React from 'react';
import { useState } from 'react';
import Button from '../../components/button';
import Chat from '../../components/chat';
import Modal from '../../components/modal';
import Search from '../../components/search';

export const Assunto = () => {
  const [addModal, setAddModal] = useState(false);
  const [form] = Form.useForm();

  return (
    <>
      <div
        style={{
          display: 'flex',
          gap: '3rem',
          marginBottom: '1rem',
          alignItems: 'center',
        }}
      >
        <Button
          onClick={() => {
            setAddModal(true);
          }}
        >
          Adicionar um novo assunto
        </Button>
        <Search
          onSearch={(e) => {
            console.log(e);
          }}
        />
      </div>
      <Chat />
      <Modal
        visible={addModal}
        onCancel={() => {
          setAddModal(false);
        }}
        onOk={() => {
          setAddModal(false);
          console.log(form.getFieldValue('titulo'));
          console.log(form.getFieldValue('descricao'));
        }}
        title="Criar um novo assunto"
      >
        <Form
          name="basic"
          form={form}
          initialValues={{
            remember: true,
          }}
          onFinish={(e) => {
            console.log(e);
          }}
          onFinishFailed={(e) => {
            console.log(e);
          }}
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
            <Input.TextArea
              rows={4}
              autoSize={true}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
