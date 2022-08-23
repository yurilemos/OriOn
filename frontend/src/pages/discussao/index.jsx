import { Form, Input } from 'antd';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button';
import CardContent from '../../components/cardContent';
import Modal from '../../components/modal';
import Search from '../../components/search';

const mockAssunto = [
  {
    id: '1',
    titulo: 'Assunto 1',
    descricao: 'Esse é o assunto da discussão 1',
    data_criacao_descricao: '12/08/2022',
    data_ult_atualizacao: '21/08/2022',
    discussao_id: '1',
    usuario_id: '2',
  },
  {
    id: '3',
    titulo: 'Assunto 1',
    descricao: 'Esse é o assunto da discussão 2',
    data_criacao_descricao: '12/08/2022',
    data_ult_atualizacao: '21/08/2022',
    discussao_id: '1',
    usuario_id: '2',
  },
  {
    id: '4',
    titulo: 'Assunto 3',
    descricao: 'Esse é o assunto da discussão 3',
    data_criacao_descricao: '12/08/2022',
    data_ult_atualizacao: '21/08/2022',
    discussao_id: '1',
    usuario_id: '2',
  },
  {
    id: '5',
    titulo: 'Assunto 4',
    descricao: 'Esse é o assunto da discussão 4',
    data_criacao_descricao: '12/08/2022',
    data_ult_atualizacao: '21/08/2022',
    discussao_id: '1',
    usuario_id: '2',
  },
  {
    id: '6',
    titulo: 'Assunto 5',
    descricao: 'Esse é o assunto da discussão 5',
    data_criacao_descricao: '12/08/2022',
    data_ult_atualizacao: '21/08/2022',
    discussao_id: '1',
    usuario_id: '2',
  },
];

export const Discussao = () => {
  const navigate = useNavigate();
  const handleDiscussaoClick = () => {
    navigate('/assunto');
  };
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
          Adicionar uma nova discussão
        </Button>
        <Search
          onSearch={(e) => {
            console.log(e);
          }}
        />
      </div>
      <div style={{ gap: '2rem', display: 'flex', flexWrap: 'wrap' }}>
        {mockAssunto.map((assunto) => (
          <div
            style={{ minWidth: '300px', width: '100%', maxWidth: '550px' }}
            key={assunto.id}
          >
            <CardContent
              title={assunto.titulo}
              description={assunto.descricao}
              creation={assunto.data_criacao_descricao}
              onClick={() => handleDiscussaoClick()}
            />
          </div>
        ))}
      </div>
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
        title="Criar uma nova discussão"
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
