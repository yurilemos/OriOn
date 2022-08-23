import React from 'react';
import CardContent from '../../components/cardContent';
import { useNavigate } from 'react-router-dom';
import Search from '../../components/search';
import Button from '../../components/button';
import { useState } from 'react';
import Modal from '../../components/modal';
import { Form, Input, Select } from 'antd';

const mockGrupoDiscussão = [
  {
    id: '1',
    nome_grupo: 'Grupo de Discussão 1',
    descricao_grupo: 'esse é um grupo de discussão 1',
    data_criacao_grupo: '21/08/2022',
    visibilidade_grupo: 0,
    status_grupo: 1,
    usuario_id: '2',
    discussoes: [
      {
        id: '4',
        titulo: 'Discussao 1',
        descricao: 'essa é a discussão 1',
        data_criacao_descricao: '22/08/2022',
        grupo_id: '1',
        usuario_id: '2',
      },
      {
        id: '5',
        titulo: 'Discussao 2',
        descricao: 'essa é a discussão 2',
        data_criacao_descricao: '22/08/2022',
        grupo_id: '1',
        usuario_id: '2',
      },
    ],
  },
  {
    id: '3',
    nome_grupo: 'Grupo de Discussão 2',
    descricao_grupo: 'esse é um grupo de discussão 2',
    data_criacao_grupo: '21/08/2022',
    visibilidade_grupo: 0,
    status_grupo: 1,
    usuario_id: '2',
    discussoes: [
      {
        id: '6',
        titulo: 'Discussao 3',
        descricao: 'essa é a discussão 3',
        data_criacao_descricao: '22/08/2022',
        grupo_id: '3',
        usuario_id: '2',
      },
    ],
  },
  {
    id: '7',
    nome_grupo: 'Grupo de Discussão 3',
    descricao_grupo: 'esse é um grupo de discussão 1',
    data_criacao_grupo: '21/08/2022',
    visibilidade_grupo: 0,
    status_grupo: 1,
    usuario_id: '2',
    discussoes: [
      {
        id: '8',
        titulo: 'Discussao 1',
        descricao: 'essa é a discussão 1',
        data_criacao_descricao: '22/08/2022',
        grupo_id: '7',
        usuario_id: '2',
      },
      {
        id: '9',
        titulo: 'Discussao 2',
        descricao: 'essa é a discussão 2',
        data_criacao_descricao: '22/08/2022',
        grupo_id: '7',
        usuario_id: '2',
      },
      {
        id: '10',
        titulo: 'Discussao 3',
        descricao: 'essa é a discussão 3',
        data_criacao_descricao: '22/08/2022',
        grupo_id: '7',
        usuario_id: '2',
      },
      {
        id: '11',
        titulo: 'Discussao 4',
        descricao: 'essa é a discussão 4',
        data_criacao_descricao: '22/08/2022',
        grupo_id: '7',
        usuario_id: '2',
      },
    ],
  },
  {
    id: '12',
    nome_grupo: 'Grupo de Discussão 4',
    descricao_grupo: 'esse é um grupo de discussão 2',
    data_criacao_grupo: '21/08/2022',
    visibilidade_grupo: 0,
    status_grupo: 1,
    usuario_id: '2',
    discussoes: [],
  },
];

export const Home = () => {
  const navigate = useNavigate();
  const handleDiscussaoClick = () => {
    navigate('/discussao');
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
          Adicionar um novo grupo
        </Button>
        <Search
          onSearch={(e) => {
            console.log(e);
          }}
        />
      </div>
      <div style={{ gap: '2rem', display: 'flex', flexWrap: 'wrap' }}>
        {mockGrupoDiscussão.map((grupo) => (
          <div
            style={{ minWidth: '300px', width: '100%', maxWidth: '550px' }}
            key={grupo.id}
          >
            <CardContent
              title={grupo.nome_grupo}
              description={grupo.descricao_grupo}
              visibility={grupo.visibilidade_grupo}
              creation={grupo.data_criacao_grupo}
            >
              <div
                style={{
                  gap: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {grupo.discussoes.map((discussao) => (
                  <CardContent
                    title={discussao.titulo}
                    description={discussao.descricao}
                    creation={discussao.data_criacao_descricao}
                    key={discussao.id}
                    onClick={() => handleDiscussaoClick()}
                  />
                ))}
              </div>
            </CardContent>
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
          console.log(form.getFieldValue('visibilidade'));
        }}
        title="Criar um novo grupo de discussão"
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
    </>
  );
};
