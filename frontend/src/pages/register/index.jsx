import React from 'react';
import { Input, Form, Button, message } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export const Registro = () => {
  const [form] = Form.useForm();
  let navigate = useNavigate();

  const onFinish = async (values) => {
    message.loading('Analizando os dados');
    try {
      await axios.post(`${API_URL}/register`, {
        login: values.login,
        senha: values.senha,
        nome: values.nome,
      });

      message.destroy();
      navigate('/home');
    } catch (error) {
      message.destroy();

      message.error(error.message.data);
    }
  };

  const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050';

  return (
    <div style={{ padding: '8rem 0' }}>
      <div
        style={{
          backgroundColor: 'white',
          margin: 'auto',
          height: '600px',
          borderRadius: '32px',
          padding: '2rem',
          minWidth: '300px',
          width: '70%',
        }}
      >
        <h1>Tela de Registro</h1>
        <div>
          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
            labelCol={{
              flex: '110px',
            }}
            wrapperCol={{
              flex: 1,
            }}
            labelAlign="left"
            labelWrap
            colon={false}
          >
            <Form.Item
              name="login"
              label="E-mail"
              rules={[
                {
                  type: 'email',
                  message: 'Inserir um e-mail válido!',
                },
                {
                  required: true,
                  message: 'Inserir um e-mail!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="senha"
              label="Senha"
              rules={[
                {
                  required: true,
                  message: 'Senha é obrigatória!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirmação de senha"
              dependencies={['senha']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Preencher o campo igual ao campo de senha',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('senha') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('As 2 senhas preenchidas são diferentes')
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="nome"
              label="Nome"
              tooltip="Nome que será exibido no seu perfil"
              rules={[
                {
                  required: true,
                  message: 'Nome obrigatório',
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <span>
              Já possui uma conta? <Link to="/login">Entrar aqui</Link>
            </span>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Registrar
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
