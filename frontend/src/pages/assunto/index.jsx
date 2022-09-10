import { Form, Input, message } from 'antd';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/button';
import Chat from '../../components/chat';
import Modal from '../../components/modal';
import Search from '../../components/search';
import { API_URL } from '../../utils/api';

export const Assunto = () => {
  const { assuntoId } = useParams();
  const [addModal, setAddModal] = useState(false);
  const [form] = Form.useForm();
  const [topic, setTopic] = useState([]);

  useEffect(() => {
    const handleGetDiscussionEffect = async () => {
      message.loading('Analizando os dados');

      try {
        const res = await axios.get(`${API_URL}/assunto?id=${assuntoId}`);

        setTopic(res.data);
        message.destroy();
      } catch (e) {
        console.log(e);
        message.destroy();
        message.error(e.response.data);
      }
    };
    handleGetDiscussionEffect();
  }, [assuntoId]);

  return (
    <>
      <h1 style={{ fontSize: '20px' }}>{topic.titulo}</h1>
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
