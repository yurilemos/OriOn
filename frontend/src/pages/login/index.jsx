import React from 'react';
import { Input, Form, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../utils/auth';
import { useContext } from 'react';

export const Login = () => {
  let navigate = useNavigate();
  const context = useContext(AuthContext);

  const onFinish = async (values) => {
    message.loading('Analizando os dados');
    await context.login({ login: values.login, senha: values.senha });
    navigate('/home');
    message.destroy();
  };
  const onFinishFailed = (error) => {
    message.destroy();
    message.error(error.response.data);
  };

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
        <h1>Tela de Login</h1>
        <div className="form-login-register">
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="ant-login-form"
          >
            <Form.Item
              label="Login"
              name="login"
              rules={[
                {
                  required: true,
                  message: 'Por favor digite o login!',
                },
              ]}
            >
              <Input style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              label="Senha"
              name="senha"
              rules={[
                {
                  required: true,
                  message: 'Por favor digita a senha!',
                },
              ]}
              style={{ margin: '2rem 0' }}
            >
              <Input.Password
                visibilityToggle={false}
                style={{ width: '100%' }}
              />
            </Form.Item>

            <span>
              Não possui uma conta? <Link to="/registro">Registrar-se</Link>
            </span>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
