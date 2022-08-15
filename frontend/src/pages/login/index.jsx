import React from 'react';
import { Input, Form, Button } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import useToken from '../../utils/useToken';

export const Login = () => {
  const { setToken } = useToken();
  const onFinish = async (values) => {
    console.log(values);
    try {
      const res = await axios.post(`${API_URL}/login`, {
        login: values.login,
        senha: values.senha,
      });
      setToken(res.data.access_token);
      console.log(res);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
        toast.error(error.response);
      }
    }
  };
  const onFinishFailed = (error) => {
    console.log(error);
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
